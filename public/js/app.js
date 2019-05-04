console.log('Client side js is loaded')


fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})


// fetch('http://localhost:3000/weather?address=Mangalore').then((response)=>{
//     response.json().then((response)=>{
//     if(response.error){
//        return console.log(response.error)
//     }
//         console.log(response.location)
//         console.log(response.forecast)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#paraOne')
const messageTwo = document.querySelector('#paraTwo')


weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location = search.value
  messageOne.textContent="loading..."
  messageTwo.textContent=""
  fetch('/weather?address='+location).then((response)=>{
    response.json().then((response)=>{
    if(response.error){
       //return console.log(response.error)
       messageOne.textContent=response.error
    }
        console.log(response.location)
        console.log(response.forecast)
        messageOne.textContent=response.location
        messageTwo.textContent=response.forecast+'Current temperature is '+response.currentTemp+', chances of rainfall are '+response.rainfallProbability;
    })
})

    console.log(location    )
})