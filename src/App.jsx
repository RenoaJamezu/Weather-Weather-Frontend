import { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import Navbar from './components/Navbar';
import './App.css'

function App() {

  const [place, setPlace] = useState("");
  const [weatherResponse, setWeatherResponse] = useState([]);

  const getWeather = async () => {
    console.log(place)
    try {
      const response = await fetch(`https://weather-weather-backend.vercel.app/api/weather/${place}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })

      const data = await response.json();

      if (response.ok) {
        console.log("response is ok");
        setWeatherResponse(data)
      } else {
        console.log("Internal server error")
      }

      console.log(data)

    } catch (error) {
      console.log(error);
    }
  }

  const getCurrentDateTime = () => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    const formattedTime = now.toLocaleTimeString('en-US');
    return { formattedDate, formattedTime };
  };

  const pressure = weatherResponse.weather?.main.pressure;

  const weatherStatus = {
    day: '/static/images/day.png',
    fewcloudsday: '/static/images/fewcloudsday.png',
    fogyday: '/static/images/fogyday.png',
    rainyday: '/static/images/rainyday.png',
    snowyday: '/static/images/snowyday.png',
    stormyday: '/static/images/stormyday.png',
    night: '/static/images/night.png',
    fewcloudsnight: '/static/images/fewcloudsnight.png',
    fogynight: '/static/images/fogynight.png',
    rainynight: '/static/images/rainynight.png',
    snowynight: '/static/images/snowynight.png',
    stormynight: '/static/images/stormynight.png',
  }

  const getWeatherStatus = () => {
    const condition = weatherResponse.weather?.weather[0].icon;
    switch (condition) {
      case '01d':
        return weatherStatus.day;
      case '02d':
        return weatherStatus.fewcloudsday;
      case '03d':
        return weatherStatus.fewcloudsday;
      case '04d':
        return weatherStatus.fewcloudsday;
      case '09d':
        return weatherStatus.rainyday;
      case '10d':
        return weatherStatus.rainyday;
      case '11d':
        return weatherStatus.stormyday;
      case '13d':
        return weatherStatus.snowyday;
      case '50d':
        return weatherStatus.fogyday;
      case '01n':
        return weatherStatus.night;
      case '02n':
        return weatherStatus.fewcloudsnight;
      case '03n':
        return weatherStatus.fewcloudsnight;
      case '04n':
        return weatherStatus.fewcloudsnight;
      case '09n':
        return weatherStatus.rainynight;
      case '10n':
        return weatherStatus.rainynight;
      case '11n':
        return weatherStatus.stormynight;
      case '13n':
        return weatherStatus.snowynight;
      case '50n':
        return weatherStatus.fogynight
      default:
        return weatherStatus.day;
    }
  }

  return (
    <>
      <Navbar />
      <div className="vh-safe flex flex-col md:flex-row justify-center items-start md:items-start min-h-screen bg-secondary p-4 md:p-8">
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6">

          {/* Left panel */}
          <div className="bg-white w-full md:w-2/3 p-6 md:p-8 rounded-lg shadow-sm flex flex-col">

            {/* search bar */}
            <div className="flex gap-3 mb-6 items-center w-full min-w-0">
              <input
                placeholder="Search Place"
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    getWeather();
                  }
                }}
                className="flex-1 min-w-0 w-full bg-tertiary rounded-full px-4 py-3 outline-none text-base shadow-sm"
              />
              <button
                onClick={getWeather}
                className="bg-primary hover:brightness-95 text-white px-4 py-2 rounded-full flex items-center gap-2 flex-none">
                <CiSearch size={20} />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>

            {/* Weather */}
            {weatherResponse.weather ? (
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <img
                  src={getWeatherStatus()}
                  className="w-44 sm:w-52 lg:w-64 p-4 bg-white rounded-md max-w-full h-auto"
                  alt="weather"
                />
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-6">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">{Math.ceil(weatherResponse.weather?.main.temp - 273.15)}°C</h1>
                    <div>
                      <p className="text-lg md:text-xl capitalize">{weatherResponse.weather?.weather[0].description}</p>
                      <h2 className="text-lg md:text-2xl font-semibold mt-2">{weatherResponse.weather?.name}</h2>
                      <p className="text-sm text-gray-500 mt-1">{getCurrentDateTime().formattedDate} — {getCurrentDateTime().formattedTime}</p>
                    </div>
                  </div>

                  <hr className="my-6 border-tertiary" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-600">Sunrise / Sunset</p>
                      <p className="mt-2 text-base text-gray-800">—</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-600">Visibility</p>
                      <p className="mt-2 text-base text-gray-800">{weatherResponse.weather?.visibility ?? '—'}</p>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src="/static/images/day.png"
                  alt="weather"
                  className="w-48 sm:w-56 md:w-64 mx-auto max-w-full h-auto"
                />
                <h1 className="text-3xl sm:text-4xl text-center mt-6">Welcome</h1>
                <p className="text-center text-gray-600">to Weather Weather App</p>
              </div>
            )}
          </div>

          {/* Right panel */}
          <aside className="bg-tertiary w-full md:w-1/3 p-4 md:p-6 rounded-lg shadow-sm md:sticky md:top-6 self-start">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Today</h1>
                  <span className="text-sm text-gray-600 hidden sm:inline">Summary</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="rounded-lg bg-primary p-4 flex flex-col gap-1 text-white">
                    <p className="text-sm">Wind Speed</p>
                    <h1 className="text-2xl sm:text-3xl font-bold">{weatherResponse.weather ? `${weatherResponse.weather.wind.speed} km/h` : 'No Data'}</h1>
                  </div>
                  <div className="rounded-lg bg-primary p-4 flex flex-col gap-1 text-white">
                    <p className="text-sm">Humidity</p>
                    <h1 className="text-2xl sm:text-3xl font-bold">{weatherResponse.weather ? `${weatherResponse.weather?.main.humidity}%` : 'No Data'}</h1>
                  </div>
                  <div className="rounded-lg bg-primary p-4 flex flex-col gap-1 text-white">
                    <p className="text-sm">Feels Like</p>
                    <h1 className="text-2xl sm:text-3xl font-bold">{weatherResponse.weather ? `${Math.ceil(weatherResponse.weather?.main.feels_like - 273.15)} °C` : 'No Data'}</h1>
                  </div>
                  <div className="rounded-lg bg-primary p-4 flex flex-col gap-1 text-white">
                    <p className="text-sm">Pressure</p>
                    {weatherResponse.weather ? (
                      pressure >= 1013 ? (
                        <h1 className="text-2xl sm:text-3xl font-bold">High Pressure</h1>
                      ) : pressure <= 1009 ? (
                        <h1 className="text-2xl sm:text-3xl font-bold">Low Pressure</h1>
                      ) : (
                        <h1 className="text-2xl sm:text-3xl font-bold">Normal Pressure</h1>
                      )
                    ) : (
                      <h1 className="text-2xl sm:text-3xl font-bold">No Data</h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </>
  )
}

export default App
