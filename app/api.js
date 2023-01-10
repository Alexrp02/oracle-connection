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

//Endpoint para obtener todos los clientes que hay.
app.get('/getClientes', async (req, res) => {    
    res.json(await getClientes()) ;
})

app.get('/getEmpleados', async (req, res) => {    
    res.json(await getEmpleados()) ;
})

app.get('/getMovimientos', async (req, res) => {    
    res.json(await getMovimientos()) ;
})

app.get('/getPaquetes', async (req, res) => {    
    res.json(await getPaquetes()) ;
})

app.post('/getPaquete', async (req, res) => {    
    res.json(await getPaquete(req.body)) ;
})

app.get('/getProveedores', async (req, res) => {    
    res.json(await getProveedores()) ;
})

//Endpoint para añadir cliente.
app.post('/addCliente', async (req, res) => {

    const body = req.body ;
    // console.log(body) ;
    res.send(await addCliente(body)) ;
})

app.post('/addPaquete', async (req, res) => {

    const body = req.body ;
    // console.log(body) ;
    res.send(await addPaquete(body)) ;
})

app.post('/addMovimiento', async (req, res) => {

    const body = req.body ;
    // console.log(body) ;
    res.send(await addMovimiento(body)) ;
})

//Iniciando el servidor, escuchando...
app.listen(app.get('port'),()=>{
    console.log(`Servidor escuchando en puerto ${app.get('port')}`);
});



async function getClientes() {
    try{
        let result = await connection.execute(
            `select DNI, NOMBRE from CLIENTE order by DNI`,
            [],
            { resultSet: false, outFormat: oracledb.OUT_FORMAT_OBJECT });
        
        return result.rows ;
    }catch(err){
        console.log(err) ;
    }
}

async function getEmpleados() {
    try{
        let result = await connection.execute(
            `select NOMBRE, TELEFONO from EMPLEADO order by NIF`,
            [],
            { resultSet: false, outFormat: oracledb.OUT_FORMAT_OBJECT });
        
        return result.rows ;
    }catch(err){
        console.log(err) ;
    }
}

async function getMovimientos() {
    try{
        let result = await connection.execute(
            `select CODIGO, VALOR from MOVIMIENTO order by CODIGO`,
            [],
            { resultSet: false, outFormat: oracledb.OUT_FORMAT_OBJECT });
        
        return result.rows ;
    }catch(err){
        console.log(err) ;
    }
}

async function getPaquetes() {
    try{
        let result = await connection.execute(
            `select REMITENTE, NUM_SEGUIMIENTO, ESTADO from PAQUETE order by NUM_SEGUIMIENTO`,
            [],
            { resultSet: false, outFormat: oracledb.OUT_FORMAT_OBJECT });
        
        return result.rows ;
    }catch(err){
        console.log(err) ;
    }
}

async function getPaquete(json) {
    try{
        console.log(json) ;
        let result = await connection.execute(
            `select * from PAQUETE where NUM_SEGUIMIENTO=(:ID)`,
            json,
            { resultSet: false, outFormat: oracledb.OUT_FORMAT_OBJECT });
        
        return result.rows ;
    }catch(err){
        console.log(err) ;
    }
}

async function getProveedores() {
    try{
        let result = await connection.execute(
            `select CIF, NOMBRE from CLIENTE order by CIF`,
            [],
            { resultSet: false, outFormat: oracledb.OUT_FORMAT_OBJECT });
        
        return result.rows ;
    }catch(err){
        console.log(err) ;
    }
}

//Insertar valores en Cliente
async function addCliente(json) {
    try{
        let sql ;
        sql = `insert into CLIENTE (DNI, NOMBRE, APELLIDOS, TELEFONO, EDAD, DIRECCION, CORREO) values(:DNI, :NOMBRE, 'Q', 'Q', 'Q', 'Q', 'Q')`;
        // const data = JSON.parse(json) ;

        console.log(json) ;
        let result = await connection.execute(sql, json);

        console.log(result.rowsAffected, "Columnas insertadas");

        connection.commit(); //commit
        return JSON.stringify("Información añadida correctamente!") ;
    }catch(err){
        console.log(err) ;
        return err ;
    }
}

async function addPaquete(json) {
    try{
        let sql ;
        sql = `insert into PAQUETE values(:NUM_SEGUIMIENTO, :PESO, :VOLUMEN , :DESTINO, :REMITENTE, :ORIGEN, :DNI, :ESTADO, :COD_ALMACEN)`;
        // const data = JSON.parse(json) ;

        console.log(json) ;
        let result = await connection.execute(sql, json);

        console.log(result.rowsAffected, "Columnas insertadas");

        connection.commit(); //commit
        return JSON.stringify("Información añadida correctamente!") ;
    }catch(err){
        console.log(err) ;
        return err ;
    }
}

async function addMovimiento(json) {
    try{
        let sql ;
        sql = `insert into MOVIMIENTO values(:CODIGO, :VALOR, :CONCEPTO , :FECHA, :TIPO)`;
        // const data = JSON.parse(json) ;

        console.log(json) ;
        let result = await connection.execute(sql, json);

        console.log(result.rowsAffected, "Columnas insertadas");

        connection.commit(); //commit
        return JSON.stringify("Información añadida correctamente!") ;
    }catch(err){
        console.log(err) ;
        return err ;
    }
}


