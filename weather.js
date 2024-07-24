const key="9a3b33c050565a2904188c6c4fdfc914";

async function search(){
    const phrase=document.querySelector('input[type="text"]').value;
    const responce=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${phrase}&limit=${5}&appid=${key}`);
    const data=await responce.json();
    const ul=document.querySelector('form ul');
    ul.innerHTML="";
        for(let i=0;i<data.length;i++){
            const {name,lat,lon,country}=data[i];
            ul.innerHTML+=`<li data-lat=${lat} data-lon=${lon} data-name=${name}>${name} <span>${country}</span></li>`
        }
    }
    
    

const debounceSearch=_.debounce(()=>{
    search();
},600)

document.querySelector('input[type="text"]').addEventListener("keyup",debounceSearch);

async function showWeather(lat,lon,name){
    const responce=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
    const data=await responce.json();
    console.log(data);
    const temp=Math.round(data.main.temp);
    const feelsLike=Math.round(data.main.feels_like);
    const humidity=data.main.humidity;
    const windSpeed=Math.round(data.wind.speed);
    const icon=data.weather[0].icon;
    console.log({temp,feelsLike,humidity,windSpeed});
    document.getElementById("city").innerHTML=name;
    document.getElementById("wind_speed").innerHTML=windSpeed+'<span>km/h</span>';
    document.getElementById("feels_temp").innerHTML=feelsLike+'<span>&deg;C</span>';
    document.getElementById("humidity_value").innerHTML=humidity+'<span>%</span>';
    document.getElementById("degree").innerHTML=temp+'&deg;C';
    document.getElementById("weather_img").src=`https://openweathermap.org/img/wn/${icon}@4x.png`;
    document.querySelector('form').style.display='none';
    document.querySelector(".weather").style.display='block'
}

document.querySelector('button').addEventListener('click',()=>{
    document.querySelector(".weather").style.display='none';
    document.querySelector('form').style.display='block';
    
})

document.body.addEventListener('click',(ev)=>{
    const li=ev.target;
    console.log(ev);
    const {lat,lon,name}=li.dataset;
    localStorage.setItem('lat',lat);
    localStorage.setItem('lon',lon);
    localStorage.setItem('name',name);
    if(!lat){
        return;
    }
    console.log({lat,lon});
    showWeather(lat,lon,name);
});

document.body.onload=()=>{
    console.log('ji');
    if(localStorage.getItem('lat')){
        const lat=localStorage.getItem('lat');
        const lon=localStorage.getItem('lon');
        const name=localStorage.getItem('name');
        console.log(lat);
        showWeather(lat,lon,name);
    }
}