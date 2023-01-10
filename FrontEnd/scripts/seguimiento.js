console.log("hey") ;
let num = window.localStorage.getItem("num") ;
const json = {
    "ID": num ,
}
// console.log(getPaquete(json)) ;
getPaquete(json) ;

document.getElementById("numero").innerHTML = `Código: ${num}` ;


async function getPaquete(json) {

    const requestOptions = {
        method: 'POST' ,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json)
    }

    const res = await fetch('http://127.0.0.1:3000/getPaquete', requestOptions).then((response)=>response.json()).then(json => json) ;
    console.log(res[0]) ;
}