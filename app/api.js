const express = require('express');
const app = express();
const morgan=require('morgan');
const oracledb = require('oracledb');
const cors = require('cors') ;
let connection ;

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

async function initDatabaseConnection () {
    try {
        connection = await oracledb.getConnection({ user: "x4540120", password: "x4540120", connectionString: "oracle0.ugr.es:1521/practbd.oracle0.ugr.es" });
        console.log("Conexión a Oracle Database correcta!");
    } catch (error) {
        console.log(error) ;
    }
}

initDatabaseConnection() ;

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

app.post('/add', async (req, res) => {

    const tasks = req.body ;
    // console.log(tasks) ;
    res.send(await postData(tasks)) ;
})

//Iniciando el servidor, escuchando...
app.listen(app.get('port'),()=>{
    console.log(`Servidor escuchando en puerto ${app.get('port')}`);
});



async function getTodo() {
    try{
        let result = await connection.execute(
            `select DNI, NOMBRE from CLIENTE order by DNI`,
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
    }
}

async function postData(json) {
    try{
        const sql = `insert into ${json.table} (DNI, NOMBRE, APELLIDOS, TELEFONO, EDAD, DIRECCION, CORREO) values(:1, :2, 'Q', 'Q', 'Q', 'Q', 'Q')`;
        // const data = JSON.parse(json) ;

        console.log(json.values) ;
        let result = await connection.executeMany(sql, json.values);

        console.log(result.rowsAffected, "Columnas insertadas");

        connection.commit(); //commit
        return JSON.stringify("Información añadida correctamente!") ;
    }catch(err){
        console.log(err) ;
        return err ;
    }
}
