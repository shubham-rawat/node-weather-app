const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msgOne')
const msgTwo = document.querySelector('#msgTwo')


// Form Submit
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value

    msgOne.textContent = 'Getting the weather!'
    msgTwo.textContent = ''

    // Fetching the DATA
    fetch('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msgTwo.textContent = data.error
            return msgOne.textContent = ''
        }
        msgOne.textContent = data.location
        msgTwo.textContent = data.forecast
    })
})
})