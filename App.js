window.addEventListener("load",()=>{
let long;
let lat;
let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimezone=document.querySelector('.location-timezone');
let temperatureSection=document.querySelector('.temperature');
const temperatureSpan=document.querySelector('.temperature span');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        lat=position.coords.latitude;
        long=position.coords.longitude;

        const proxy="https://cors-anywhere.herokuapp.com/";
        const api=`${proxy}https://api.darksky.net/forecast/2d52f73b3bcd3ef68d03505df33c9500/${lat},${long}`;

        fetch(api)
        .then(response =>{
            return response.json();
    
         })

        .then(data =>{
            console.log(data);
            const{temperature,summary,icon}=data.currently;
            temperatureDegree.textContent=temperature;
            temperatureDescription.textContent=summary;
            locationTimezone.textContent=data.timezone;

            setIcons(icon,document.querySelector('.icon'));
        });
    });

    
    }

    function setIcons(icon,iconID){
        const skycons=new Skycons({color:"white"});
        const currentIcon=icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }
});