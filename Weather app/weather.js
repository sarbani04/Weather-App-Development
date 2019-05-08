let appId='dd0d5ca4ece516d3f6852c283f681e2c';
let units='metric';
let searchMethod;


//for seacrhing all cities

function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm){
        searchMethod='zip';
     }else{
         searchMethod='q';
     }    
    }


function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result =>{
        return result.json();
    }).then(result =>{
        init(result);
    })
}

  function init(result){
      switch (result.weather[0].main){
          case 'Clear':
                    document.body.style.backgroundImage='url("sunny.jpg")';    
              break;
              case 'Mist':
              case 'Rain':
              case 'Drizzle':
              document.body.style.backgroundImage='url("rain.jpeg")'; 
              break;   
              case 'Snow':
              document.body.style.backgroundImage='url("snow.jpeg")'; 
              break;
              case 'Thunderstrom':
              document.body.style.backgroundImage='url("thunder.jpeg")'; 

              case 'Haze':
              document.body.style.backgroundImage='url("haze.jpeg")'; 
                break;
              case 'Cloud':
              document.body.style.backgroundImage='url("cloudy.jpeg")'; 
                    break;
          default:
              break;
    
      }
    //   let weatherDesciptionHeader= document.getElementById('weatherDesciptionHeader');
      let city=document.getElementById('city');
      let temp=document.getElementById('temp');
      let windspeed =document.getElementById('windspeed');
      let humidity=document.getElementById('humidity');
    let ImgdocumentIcon =document.getElementById('ImgdocumentIcon');

ImgdocumentIcon.src='http://openweathermap.org/img/w/'+result.weather[0].icon+'.png';

document.getElementById('wheader').innerText=result.weather[0].description;
temp.innerHTML=Math.floor(result.main.temp)+ '&#176';
city.innerHTML=result.name;
humidity.innerHTML='Humidity levels at ' +result.main.humidity +' %';
windspeed.innerHTML='Winds at '+Math.floor(result.wind.speed)+'m/s';
      console.log(result);
      setPosition();
    }

  function setPosition(){
      let weatherContainer =document.getElementById('weatherContainer');
      let containerHeight=weatherContainer.clientHeight;
      let containerWidth=weatherContainer.clientWidth;

      weatherContainer.style.left= `calc(50% - ${containerWidth/2}px)`;
      weatherContainer.style.top=`calc(50% - ${containerHeight/1.3}px)`;
        weatherContainer.style.visibility='visible';

  }  

  document.getElementById('searchbar').addEventListener('click',() =>{
      let searchTerm=document.getElementById('searchInput').value;
      if(searchTerm){
          searchWeather(searchTerm);
      }

  })
  