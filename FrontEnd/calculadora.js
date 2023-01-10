var peso = document.getElementById('peso')
var largo = document.getElementById('largo')
var alto = document.getElementById('altura')
var ancho = document.getElementById('ancho')
var resultado = document.getElementById('resultado') 
let valor = 0

button.addEventListener('click', (e) => {
    e.preventDefault()
    const data = {
        peso: peso.value,
        largo: largo.value,
        altura: altura.value,
        ancho: ancho.value,
    }

    valor = parseFloat(data.peso) + parseFloat(data.altura) + parseFloat(data.ancho) + parseFloat(data.largo)
    console.log(valor)

    resultado.innerHTML = `${valor}€`
    console.log(resultado.innerHTML)
})

