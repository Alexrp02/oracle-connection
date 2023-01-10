const table = document.getElementById("table") ;

let tr = document.createElement('tr') ;
let td = document.createElement("td");
td.innerHTML="Hola" ;
tr.appendChild(td) ;

showEmpleados() ;

async function showEmpleados(){
    const empleados = await getEmpleados() ;
    empleados.forEach(element => {
        let tr = document.createElement("tr") ;
        let name = document.createElement("td") ;
        name.innerHTML = element.NOMBRE ;
        let tel = document.createElement("td") ;
        tel.innerHTML = element.TELEFONO
        tr.appendChild(name) ; tr.appendChild(tel)
        table.appendChild(tr) ;
    })
}

async function getEmpleados() {
    const response = await fetch("http://127.0.0.1:3000/getEmpleados").then((res) => res.json()).then((hello => {return hello})) ;
    return response ;
}