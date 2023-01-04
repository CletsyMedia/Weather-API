// get lat and long
window.addEventListener('load', ()=>{
    let long;
    let lat;
    let tempDegree = document.querySelector(".temp-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let tempDescription = document.querySelector(".temp-description");
    let tempSection = document.querySelector(".temp");
    let tempSpan = document.querySelector(".temp span")
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy ="https://cors-anywhere.herokuapp.com/";
            const api =`${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            // Fetching the API
            fetch(api).then(response => response.json())
            .then(json => {
                console.log(json)
                const{temperature, summary, icon} =json.currently
                // Getting the DOM element from the API
                tempDegree.textContent = temperature;
                tempDescription.textContent = summary;
                locationTimezone.textContent = json.timezone;
                // conversion to  degree C or degree F
                let celsius =(temperature - 32) * (5 / 9);
                // invoke the skycon
                setIcon(icon, document.querySelector(".icon"));
                // change temp to celsius
                tempSection.onclick=()=>{
                    if(tempSpan.textContent === "F"){
                         tempSpan.textContent = "C"
                         tempDegree.textContent = Math.floor(celsius);
                    }else{
                        tempSpan.textContent = "F";
                        tempDegree.textContent = temperature;
                    }
                }
            });
        }); 
    }else{
       h1.textContent ="Enable your location" 
    }
    // Skycon
    function setIcon(icon, iconID){
        const skycons = new Skycons({color:'white'});
        const currentIcon = icon.replace(/~/g, "_") .toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});