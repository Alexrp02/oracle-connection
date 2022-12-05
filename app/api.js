const express = require('express');
const app = express();
const morgan=require('morgan');
const oracledb = require('oracledb');
const cors = require('cors') ;

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors({
    origin: '*'
})) ;

app.get('/', (req, res) => {    
    res.json(
        {
            "Title": "Hola"
        }
    );
})

app.get('/oracle', async (req, res) => {    
    res.json(await getTodo()) ;
})

app.post('/add', (req, res) => {

    const tasks = req.body ;
    console.log(tasks) ;
    postData(tasks) ;
    res.send(JSON.stringify("Information added correctly!")) ;
})

//Iniciando el servidor, escuchando...
app.listen(app.get('port'),()=>{
    console.log(`Servidor escuchando en puerto ${app.get('port')}`);
});



async function getTodo() {
    let connection ;
    try{
        connection = await oracledb.getConnection({ user: "x4540120", password: "x4540120", connectionString: "oracle0.ugr.es:1521/practbd.oracle0.ugr.es" });
        console.log("Successfully connected to Oracle Database");
        let result = await connection.execute(
            `select DNI, NOMBRE from CLIENTE`,
            [],
            { resultSet: false, outFormat: oracledb.OUT_FORMAT_OBJECT });
    
        // console.log(result.rows) ;
        // const rs = result.resultSet;
        // const resultSet = rs ;
        // console.log(resultSet) ;
        // let row;
    
        // while ((row = await rs.getRow())) {
        //     if (row.DONE)
        //     console.log(row.DESCRIPTION, "is done");
        //     else
        //     console.log(row.DESCRIPTION, "is NOT done");
        // }
    
        // await rs.close();
        return result.rows ;
    }catch(err){
        console.log(err) ;
    }finally{
        if(connection) {
            try {
                await connection.close();
                console.log("Connection with database closed!") ;
              } catch (err) {
                console.error(err);
              }
        }
    }
}

async function postData(json) {
    let connection ;
    try{
        connection = await oracledb.getConnection({ user: "x4540120", password: "x4540120", connectionString: "oracle0.ugr.es:1521/practbd.oracle0.ugr.es" });
        console.log("Successfully connected to Oracle Database");
        const sql = `insert into CLIENTE (DNI, NOMBRE, APELLIDOS, TELEFONO, EDAD, DIRECCION, CORREO) values(:1, :2, 'Q', 'Q', 'Q', 'Q', 'Q')`;
        // const data = JSON.parse(json) ;

        let result = await connection.executeMany(sql, json);

        console.log(result.rowsAffected, "Rows Inserted");

        connection.commit(); //commit
    }catch(err){
        console.log(err) ;
    }finally{
        if(connection) {
            try {
                await connection.close();
                console.log("Succesfully posted a new task;") ;
              } catch (err) {
                console.error(err);
              }
        }
    }
}
