const searchForm = document.querySelector("form")
const weatherParagraph = document.querySelector("#weatherMessage")

searchForm.addEventListener('submit' , (e) =>{
    e.preventDefault()
    fetch('http://localhost:3000/weather?address=' + document.querySelector('#locInput').value).then((response) =>{
        response.json().then((data) =>{
            if(data.error) {
                weatherParagraph.textContent = 'Error: ' + data.error
            }
            else{
                weatherParagraph.textContent = 'Weather: ' + data.weatherData
            }
        })
    })
})



