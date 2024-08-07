import  { useEffect, useRef, useState } from 'react'
import './weather.css'
import searchIcon from '../assets/search-icon.jpg'
import weather from '../assets/weather1.webp'
import Humidity from '../assets/humidity.jpg'
import windSpeed from '../assets/windSpeed.jpg'
import snowIcon from '../assets/snow-icon.jpg'
import rainIcon from '../assets/rain-icon.jpg'
import { toast } from "sonner";

const Weather = () => {

    const apiKey = import.meta.env.VITE_APP_ID;
    console.log(apiKey,"sdfs");
    const allIcon = {
        "01d": weather,
        "01n": weather,
        "02d": rainIcon,
        "02n": rainIcon,
        "03d": rainIcon,
        "03n": rainIcon,
        "04d": rainIcon,
        "04n": rainIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon
    }

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false)

    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name")
            return
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            const response = await fetch(url)
            const data = await response.json()

            if (!response.ok) {
                toast.error(data.message)
            }
            console.log(data);
            const icon = allIcon[data.weather[0].icon] || weather;
            setWeatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                locations: data.name,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false)
            console.log(error);
        }
    }

    useEffect(() => {
        search("Kerala")
    }, [])


    return (
        <div className='weather'>
            <div className='search-bar'>
                <input type='text' ref={inputRef} placeholder='Search' />
                <img src={searchIcon} alt='search' className='img' onClick={() => search(inputRef.current.value)} />
            </div>

            {weatherData ? <>
                <img src={weatherData.icon} alt='weather' className='weather-icon' />
                <p className='temperature'>{weatherData.temperature}°C</p>
                <p className='location'>{weatherData.locations}</p>

                <div className="weather-data">
                    <div className="col">
                        <img src={Humidity} alt='Humidity' className='img-humidity' />
                        <div>
                            <p>{weatherData.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={windSpeed} alt='windSpeed ' className='windSpeed' />
                        <div>
                            <p>{weatherData.windspeed} Km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </> : <>

            </>}


        </div>
    )
}

export default Weather