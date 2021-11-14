
document.querySelector("#feelings").value

document.querySelector("#generate").addEventListener('click',getAPI)
 
const mydata = { username: 'example' };

function getAPI() {
    params =document.querySelector("#zip").value;

fetch( `http://api.openweathermap.org/data/2.5/forecast?zip=${params}&appid=bb062611c1b330e3d80967d29caa1e90&units=imperial`)
.then(response => response.json())
.then(mydata => { 
    console.log('Success:', mydata); 
    
    document.getElementById('app2').innerHTML += `
    <div class="card">
        <h2 class=" ">${mydata.city.name}</h2>
        <p class=" med-font">${mydata.list[0].weather[0].description}</p>
        <h1 class=" ">Temp Is: ${mydata.list[0].main.temp}&#176;</h1>
        <p class=" ">Date Is: ${mydata.date} <span class="sm-font"> </span></p>
        <p class=" ">My Feelings Is: ${mydata.username} <span class="sm-font"> </span></p>
    </div>
    `;  


})
.catch((error) => { console.error('Error:', error); });

}


