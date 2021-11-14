
/* Global Variables */
const apiKey = "&appid=bb062611c1b330e3d80967d29caa1e90&units=imperial";
const apiUrl = "http://localhost:1000/";
  

// 
const catchErr = (error) => console.error('Some ErrorHas Been => ', error);


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',()=> { /** Post mydata To API */
  
    let mydata = {
        zipCode: document.getElementById('zip').value,
        content: document.getElementById('feelings').value,
        date: new Date()
    };

    //Post mydata To Api For Get Zip Code Information
    getZipCodeInfo(mydata.zipCode).then(zipInfo => {
        //Return And Show Alert If City Is Not Found
        if (zipInfo.cod != 200)
        document.getElementById('alert').classList.remove("d-none");
        document.getElementById('alert').innerHTML = zipInfo.message;

        //Now Post mydata To Server For Saving And Display In Holder Section 
        mydata.temp = zipInfo;
        postDateToServer(mydata);
    }).catch(catchErr);
}

);


/** Get Zip Code info From Api */
let getZipCodeInfo = async (zipCode) => {
    return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`)).json()
}


/** Post mydata To Server For Saving  */
async function postDateToServer(mydata) {
    let response = await fetch(`${apiUrl}postmydata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mydata),
    });
    try {
        if (!response.ok) {
            document.getElementById('alert').classList.remove("d-none");
            document.getElementById('alert').innerHTML = 'Process Not Successfuly';
            return;
        }

        response.json().then(mydata => {
            if (response.ok)
                getLinkUI();//getLink UI Now
            else
            document.getElementById('alert').classList.remove("d-none");
            document.getElementById('alert').innerHTML = 'Process Not Successfuly';
        }).catch(catchErr);

    } catch (error) {
        catchErr(error);
    }
}

/** getLink UI */
async function getLinkUI() {
    let response = await fetch(`${apiUrl}getAll`);
    try {
        response.json().then(mydata => {
            document.getElementById('app2').innerHTML += `
            <div class="card">
                <h2 class=" ">${mydata.temp.city.name}</h2>
                <p class=" med-font">${mydata.temp.list[0].weather[0].description}</p>
                <h1 class=" ">Temp Is: ${mydata.temp.list[0].main.temp}&#176;</h1>
                <p class=" ">Date Is: ${mydata.date} <span class="sm-font"> </span></p>
                <p class=" ">My Feelings Is: ${mydata.content} <span class="sm-font"> </span></p>
            </div>
            `;  
        }).catch(catchErr);
    } catch (error) {
        catchErr(error);
    }
}

 