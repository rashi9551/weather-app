import  { useEffect, useRef, useState } from 'react'
import './Weather.css'
import { toast } from 'sonner'
function Weather() {
    const[weatherData,setWeatherData]=useState(false)
    const inputRef=useRef()
    const allicons={
        "01d":'/images/suni.png',
         "01n":'/images/suni.png',
          "02d":'/images/cloudi.png',
           "02n":'/images/cloudi.png',
            "03d":'/images/cloudi.png',
           "03n":'/images/cloudi.png',
           "04d":'/images/fogi.png',
           "04n":'/images/fogi.png',
           "09d":'/images/rainyi.png',
           "09n":'/images/rainyi.png',
           "10d":'/images/rainyi.png',
           "10n":'/images/rainyi.png',
           "13d":'/images/snowi.png',
           "13n":'/images/snowi.png',
    }
    const search=async(city)=>{
        if(city==''){
            alert("Enter City Name")
            return;
        }
        try {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response=await fetch(url)
            const data=await response.json()
            if(!response.ok){
                toast.error(data.message);
                return
            }
            console.log(data);
            const icon=allicons[data.weather[0].icon] || '/images/suni.png'
            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon,

            })
        } catch (error) {
            console.log(error);
            setWeatherData(false)
            
        }
    }
    useEffect(()=>{
        search("Bengaluru")
    },[])
  return (
    <div className='weather'>
     <div className='search-bar'>
        <input type="text" placeholder='Search...' ref={inputRef} />
        <img src="/images/search.png" alt="" className=''onClick={()=>search(inputRef.current.value)} />
     </div>
     {weatherData?<> <img src={weatherData.icon}alt="" className='weather-icon'/>
     <p className='temperature'>{weatherData.temperature}%c</p>
     <p className='location'>{weatherData.location}</p>
<div className='weather-data'>
    <div className='col'>
        <img src="/images/humidityi.png" alt="" />
        <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
        </div>
    </div>
    <div className='col'>
        <img src="/images/windi.png" alt="" />
        <div>
            <p>{weatherData.windSpeed} km/m</p>
            <span>WInd Speed</span>
        </div>
    </div>
</div></>:<></>}
    
    </div>
  )
}

export default Weather