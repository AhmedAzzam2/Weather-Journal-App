

// get button generate and make 
document.querySelector("#generate").addEventListener('click',getAPI)
 
const mydata = {};

async function getAPI() { 
    // get input in html with id zip
    params =document.querySelector("#zip").value;
// that uses fetch() to make a GET request to the OpenWeatherMap API.
await fetch( `http://api.openweathermap.org/data/2.5/forecast?zip=${params}&appid=bb062611c1b330e3d80967d29caa1e90&units=imperial`)
.then(response => response.json())
.then(mydata => { 

    if ( mydata.cod == 200 ) {
        
    mydata.feelings = document.querySelector("#feelings").value;
    mydata.date = new Date();
    // get id #app and puted html response data
    document.getElementById('app2').innerHTML += `
    <div class="card">
        <h2 class=" ">${mydata.city.name}</h2>
        <p class=" med-font">${mydata.list[0].weather[0].description}</p>
        <h1 class=" ">Temp Is: ${mydata.list[0].main.temp}&#176;</h1>
        <p class=" ">Date Is: ${mydata.date} <span class="sm-font"> </span></p>
        <p class=" ">My Feelings Is: ${mydata.feelings} <span class="sm-font"> </span></p>
    </div>
    `;  

    }else{
        document.getElementById('alert').innerHTML = `<div class="alert alert-danger " role="alert" id="alert">${mydata.message} </div>`;
    }

})
.catch((error) => { console.error('Error:', error); });// catch error and see in console

}


