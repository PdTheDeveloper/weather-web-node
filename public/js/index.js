const searchForm = document.querySelector("form")
const messageParaghraph = document.querySelector('#locOrError')
const weatherParagraph = document.querySelector("#weatherMessage")

searchForm.addEventListener('submit' , (e) =>{
    e.preventDefault()
    messageParaghraph.textContent = 'Loading...'
    weatherParagraph.textContent = ''
    fetch('/weather?address=' + searchForm.children[0].value).then((response) =>{
        response.json().then((data) =>{
            if(data.error) {
                messageParaghraph.textContent = 'Error: ' + data.error
            }
            else {
                messageParaghraph.textContent = data.location
                weatherParagraph.textContent = 'Weather: ' + data.weatherData
            }
        })
    })
})



