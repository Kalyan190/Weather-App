import React, { useState } from 'react';
import clear from '../Image/clear.png';
import clouds from '../Image/clouds.png';
import drizzle from '../Image/drizzle.png';
import mist from '../Image/mist.png';
import rain from '../Image/rain.png';
import humidity from '../Image/humidity.png';
import wind from '../Image/wind.png';
import Haze from '../Image/fog.png'
import ThunderStone from '../Image/ThunderStone.png'
import Search from '../Image/search.png'


const Weather = () => {
    const [query, setQuery] = useState('');
    const [weatherData, setWeather] = useState({});
    const [cloudImage, setCloudImage] = useState('');

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}weather?q=${query}&units=metric&appid=${import.meta.env.VITE_API_KEY}`);
                const result = await response.json();
                
                if (result.cod === 200) {
                    setWeather(result);
                   console.log(result)
                    if (result.weather && result.weather[0]) {
                        switch (result.weather[0].main) {
                            case 'Clouds':
                                setCloudImage(clouds);
                                break;
                            case 'Clear':
                                setCloudImage(clear);
                                break;
                            case 'Rain':
                                setCloudImage(rain);
                                break;
                            case 'Drizzle':
                                setCloudImage(drizzle);
                                break;
                            case 'Mist':
                                setCloudImage(mist);
                                break;
                            case 'Haze':
                               setCloudImage(Haze);
                                break;
                            case 'Thunderstorm':
                                setCloudImage(ThunderStone);
                                break;
                            default:
                                setCloudImage('');
                                break;
                        }
                    }
                } else {
                    alert('Invalid City Name');
                }
                setQuery('');
            } catch (error) {
                console.error('Error fetching the weather data: ', error);
                alert('Failed to fetch weather data. Please try again.');
            }
        }
    };

    const SearchWeather = async()=>{
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}weather?q=${query}&units=metric&appid=${import.meta.env.VITE_API_KEY}`);
            const result = await response.json();
            
            if (result.cod === 200) {
                setWeather(result);
               console.log(result)
                if (result.weather && result.weather[0]) {
                    switch (result.weather[0].main) {
                        case 'Clouds':
                            setCloudImage(clouds);
                            break;
                        case 'Clear':
                            setCloudImage(clear);
                            break;
                        case 'Rain':
                            setCloudImage(rain);
                            break;
                        case 'Drizzle':
                            setCloudImage(drizzle);
                            break;
                        case 'Mist':
                            setCloudImage(mist);
                            break;
                        case 'Haze':
                           setCloudImage(Haze);
                            break;
                        case 'Thunderstorm':
                            setCloudImage(ThunderStone);
                            break;
                        default:
                            setCloudImage('');
                            break;
                    }
                }
            } else {
                alert('Invalid City Name');
            }
            setQuery('');
        } catch (error) {
            console.error('Error fetching the weather data: ', error);
            alert('Failed to fetch weather data. Please try again.');
        }
    }

    const dateBuilder = (d) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const days = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ];

        const day = days[d.getDay()];
        const date = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    };

    return (
        <div className='w-full h-screen relative flex p-2 place-content-center bg-gray-900 font-lato font-bold'>
            <main className='mt-16'>
                <div className='w-full flex items-center justify-center gap-3 '>
                    <input
                        type='text'
                        placeholder='Search...'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyPress={handleSearch}
                        className='w-56 md:w-96 p-2 rounded-md  shadow-xl shadow-black bg-slate-200 outline-none '
                    />
                    <button className='bg-white w-10 md:hidden sm:hidden h-10 p-2 flex items-center justify-center rounded-full' onClick={SearchWeather}><img src={Search}className='w-5'></img></button>
                </div>
                {typeof weatherData.main !== 'undefined' ? (
                    <div className='mt-8 w-full flex flex-col items-center p-3 justify-center'>
                        <div className='mb-8 flex flex-col items-center'>
                            <div className='location text-white'>
                                {weatherData.name}, {weatherData.sys.country}
                            </div>
                            <div className='date text-white'>
                                {dateBuilder(new Date())}
                            </div>
                        </div>
                       <div>
                        <div className='bg-gradient-to-br from-fuchsia-500 via-violet-600 to-indigo-700 sm:w-80 md:w-96 flex flex-col items-center justify-center rounded-md shadow-sm shadow-blue-900 p-3 hover:bg-gradient-to-tr hover:from-violet-900 hover:to-violet-200 '>
                            <img src={cloudImage} alt='error' className='w-20' />
                            <div className='temp'>
                                {Math.round(weatherData.main.temp)} °C
                            </div>
                            <div className='weather'>
                                {weatherData.weather[0].main}
                            </div>
                            <div>
                                feels like {Math.round(weatherData.main.feels_like)} °C
                            </div>
                            <div className='wind-info flex mt-8 items-center justify-center gap-2 md:gap-8 '>
                                <div className='flex items-center justify-center gap-2 md:gap-4'>
                                    <img src={humidity} className='w-8 h-6 md:h-8' />
                                    <p className='flex flex-col'>
                                        {weatherData.main.humidity}%
                                        <span>Humidity</span>
                                    </p>
                                </div>
                                <div className='flex items-center justify-center gap-2 md:gap-4'>
                                    <img src={wind} className='w-8 h-6 md:h-8' />
                                    <p className='flex flex-col'>
                                        {weatherData.wind.speed} km/h
                                        <span>Wind Speed</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                       </div>
                    </div>
                ) : (
                    ''
                )}
            </main>
        </div>
    );
};

export default Weather;
