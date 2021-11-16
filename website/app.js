const key = '&appid=bb062611c1b330e3d80967d29caa1e90&units=imperial';
document.getElementById('generate').addEventListener('click', (e) => {

    e.preventDefault();

    console.log(new FormData(formElem))
    getApi(document.getElementById('zip').value).then(tem => {
        sendMyData(cat = {
            temp: tem,
            zipCode: document.getElementById('zip').value,
            feelings: document.getElementById('feelings').value
        })

    })
});



const getApi = async (zip) => {

    const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip}${key}`)
    try {
        const data = await res.json();
        console.log(data);
        if (data.cod == 200) {
            return data;
        } else {
            document.getElementById('alert').innerHTML = `<div class="alert alert-danger " role="alert" id="alert">${data.message} </div>`;
        }

    } catch (error) {
        console.log("error", error);
    }
}

let sendMyData = async mydata => {
    let res = await fetch(`http://localhost:1000/postmydata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mydata),
    });

    res.json().then(mydata => { UL(); })


}

let UL = async () => {
    let res = await fetch(`http://localhost:1000/getAll`);
    try {
        res.json().then(mydata => {
            console.log(mydata)
            document.getElementById('app2').innerHTML = `
            <div id = "entryHolder" class="card">
                <h2 >${mydata.temp.city.name}</h2>
                <div  class=" med-font">${mydata.temp.list[0].weather[0].description}</div>
                <div  class=" ">Temp Is: ${mydata.temp.list[0].main.temp}&#176;</div>
                <div  class=" ">Date Is: ${mydata.date} <span class="sm-font"> </span></div>
                <div  id = "content">My Feelings Is: ${mydata.feelings} <span class="sm-font"> </span></div >
            </div>
            `;
        })
    } catch (error) {
        catchErr(error);
    }
}
