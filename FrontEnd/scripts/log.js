const username = document.getElementById('username')
const password = document.getElementById('password')
const button = document.getElementById('button') 

button.addEventListener('click', (e) => {
    e.preventDefault()
    const data = {
        username: username.value,
        password: password.value
    }

    if(data.username == "Empleado" && data.password == "1234"){
        window.localStorage.setItem("acc", "empleado") ;
        window.location = "index.html"
    }else if(data.username == "usuario" && data.password == "usuario"){
        window.localStorage.setItem("acc", "usuario") ;
        window.location = "index.html"
    }
    


})

