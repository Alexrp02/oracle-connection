console.log("hey") ;

const desc = document.getElementById('desc') ;
const done = document.getElementById('done') ;
const button = document.getElementById('button') ;
const button2 = document.getElementById('button2') ;
const oracle = document.getElementById('oracle') ;
const contentDiv = document.getElementById('div') ;
const paquetes = document.getElementById('paquetes') ;

const div = document.createElement('p') ;
    div.classList.add("empleado") ;

let tasks ;

button.addEventListener( 'click' , event => {
    event.preventDefault(); 
    if (desc.value.length<9){
        alert("El DNI tiene que tener mínimo 9 dígitos.")
        return ;
    }

    if(done.value == "") {
        alert("El nombre no puede estar vacío.") ;
        return ;
    }

    const task = {
        'DNI' : desc.value ,
        'NOMBRE' : done.value,
    }
    // [[desc.value, done.value] ] ;
    

    console.log(task) ;
    postData(task)
    .then(response => response.json())
    .then(res => {
        console.log(res) ;
        if(res.errorNum == 1) alert("Ese cliente ya existe en la base de datos.") ;
        if(res.errorNum == 1400) alert ("No se permiten valores nulos") ;
    });
    
}) ;

button2.addEventListener( 'click' , event => {
    event.preventDefault(); 


    const paquetesDatos = {
        'NUM_SEGUIMIENTO': paquetes.elements['num'].value,
        'PESO': paquetes.elements['peso'].value, 
        'VOLUMEN': paquetes.elements['volumen'].value,
        'DESTINO': paquetes.elements['destino'].value,
        'REMITENTE': paquetes.elements['remitente'].value, 
        'ORIGEN': paquetes.elements['origen'].value, 
        'DNI': paquetes.elements['dni'].value, 
        'ESTADO': paquetes.elements['estado'].value,
        'COD_ALMACEN': paquetes.elements['almacen'].value,
    }
    // [[desc.value, done.value] ] ;
    

    console.log(paquetesDatos) ;
    postPaquete(paquetesDatos) ;
    // postData(task)
    // .then(response => response.json())
    // .then(res => {
    //     console.log(res) ;
    //     if(res.errorNum == 1) alert("Ese cliente ya existe en la base de datos.") ;
    //     if(res.errorNum == 1400) alert ("No se permiten valores nulos") ;
    // });
    // console.log(paquetes.elements['num'].value) ;
    
}) ;

document.getElementById('button3').addEventListener('click', (event) => {
    event.preventDefault() ;
    addMovimiento(document.getElementById('movimientos')) ;
})

function addMovimiento (movimientos) {
    // console.log(movimientos.elements.CODIGO.value) ;
    const movimientoDatos = {
        CODIGO: movimientos.elements.CODIGO.value , 
        VALOR: movimientos.elements.VALOR.value ,
        CONCEPTO: movimientos.elements.CONCEPTO.value ,
        FECHA: movimientos.elements.FECHA.value ,
        TIPO: movimientos.elements.TIPO.value ,
    }
    postMovimiento(movimientoDatos) ;
}

oracle.addEventListener('click', async e => {
    tasks = await fetchTasks() ;
    contentDiv.innerHTML = "" ;
    tasks.forEach(element => {
        // console.log(element) ;
        let content = div.cloneNode(true);
        content.innerHTML = `${element.DNI}, ${element.NOMBRE}` ;
        contentDiv.appendChild(content) ;
    });
})


    


async function fetchData() {
    const response = await fetch("http://127.0.0.1:3000").then((res) => res.json()).then((hello => console.log(hello))) ;
    // const data = response.json() ;
    // console.log(data) ;
}

async function fetchTasks() {
    const response = await fetch("http://127.0.0.1:3000/getClientes").then((res) => res.json()).then((hello => {return hello})) ;
    return response ;
    // const data = response.json() ;
    // console.log(data) ;
}

async function getEmpleados() {
    const response = await fetch("http://127.0.0.1:3000/getEmpleados").then((res) => res.json()).then((hello => {return hello})) ;
    return response ;
    // const data = response.json() ;
    // console.log(data) ;
}

async function getPaquetes() {
    const response = await fetch("http://127.0.0.1:3000/getPaquetes").then((res) => res.json()).then((hello => {return hello})) ;
    return response ;
    // const data = response.json() ;
    // console.log(data) ;
}



async function postData(json) {

    const requestOptions = {
        method: 'POST' ,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json)
    }

    return fetch('http://127.0.0.1:3000/addCliente', requestOptions)
    // .then(response => response.json())
    // .then(res => {
    //     console.log(res) ;
    //     return res ;
    // });
}

async function postPaquete(json) {

    const requestOptions = {
        method: 'POST' ,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json)
    }

    return fetch('http://127.0.0.1:3000/addPaquete', requestOptions)
    // .then(response => response.json())
    // .then(res => {
    //     console.log(res) ;
    //     return res ;
    // });
}

async function postMovimiento(json) {

    const requestOptions = {
        method: 'POST' ,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json)
    }

    return fetch('http://127.0.0.1:3000/addMovimiento', requestOptions)
    // .then(response => response.json())
    // .then(res => {
    //     console.log(res) ;
    //     return res ;
    // });
}


async function showEmpleados () {
    empleados = await getEmpleados() ;
    contentDiv.innerHTML = "" ;
    empleados.forEach(element => {
        // console.log(element) ;
        let content = div.cloneNode(true);
        content.innerHTML = `${element.NIF}, ${element.NOMBRE}` ;
        contentDiv.appendChild(content) ;
    });
}

async function showPaquetes () {
    paquetes = await getPaquetes() ;
    contentDiv.innerHTML = "" ;
    paquetes.forEach(element => {
        // console.log(element) ;
        let content = div.cloneNode(true);
        content.innerHTML = `${element.REMITENTE}, ${element.NUM_SEGUIMIENTO}, ${element.ESTADO}` ;
        contentDiv.appendChild(content) ;
    });
}