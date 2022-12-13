console.log("hey") ;

const desc = document.getElementById('desc') ;
const done = document.getElementById('done') ;
const button = document.getElementById('button') ;
const oracle = document.getElementById('oracle') ;
const contentDiv = document.getElementById('div') ;

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
