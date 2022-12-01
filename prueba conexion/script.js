console.log("hey") ;

const desc = document.getElementById('desc') ;
const done = document.getElementById('done') ;
const button = document.getElementById('button') ;
const oracle = document.getElementById('oracle') ;
const contentDiv = document.getElementById('div') ;

const div = document.createElement('p') ;

let tasks ;

button.addEventListener( 'click' , event => {
    event.preventDefault(); 
    const task = [
        [desc.value, done.value] 
    ] ;
    console.log(task) ;
    postData(task) ;
}) ;

oracle.addEventListener('click', async e => {
    tasks = await fetchTasks() ;
    contentDiv.innerHTML = "" ;
    tasks.forEach(element => {
        // console.log(element) ;
        let content = div.cloneNode(true);
        content.innerHTML = `${element.DESCRIPTION}, ${element.DONE}` ;
        contentDiv.appendChild(content) ;
    });
})


    


async function fetchData() {
    const response = await fetch("http://127.0.0.1:3000").then((res) => res.json()).then((hello => console.log(hello))) ;
    // const data = response.json() ;
    // console.log(data) ;
}

async function fetchTasks() {
    const response = await fetch("http://127.0.0.1:3000/oracle").then((res) => res.json()).then((hello => {return hello})) ;
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

    fetch('http://127.0.0.1:3000/add', requestOptions)
    .then(response => response.json())
    .then(res => console.log(res));
}

// fetchData() ;
// postData(task) ;