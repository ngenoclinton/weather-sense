

import React, { useState, useEffect } from 'react';

// {time,minutes, hour, day, date, month, ampm,
//   hoursIn12HourFormat,days, months}
function WeatherForecast() {

    const [weatherData, setData] = useState([]);  
    const [cityName, setCityName] = useState('');
    const [weatherToday, setWeatherToday] = useState([]);
    const [search, setSearch] = useState("Nairobi");
    const [input, setInput] = useState('');
    let componentMounted = true;


    useEffect(() => {
      const API_KEY = "285aa4673ddd1088f59cfe790c947057";
      // const API_URL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}`

      async function fetchData() {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${API_KEY}&units=metric`
          );
          const data = await response.json();
          // console.log(data.list[0]);
          const nextFiveDays = data.list.filter(
            (weather) => weather.dt_txt.includes("18:00:00")
          );

          if ("main" in data.list[0]) {
            let weatherToday = [];
              weatherToday.push(data.list[0]);
            setWeatherToday(weatherToday);
          } 

          setData(nextFiveDays);
          setCityName(data.city.name);
        }    
        fetchData();
    }, [search]);
    // time, date  and month
    // const timestamp = weatherData?.dt;
    const d = new Date();
    const date = d.getDate();
    const day = d.toLocaleDateString('en-US', { weekday: 'long' });
    // const time = date.toLocaleTimeString('en-US', { timeStyle: 'short' });
    const month = d.toLocaleDateString('en-US', { month: 'long' });

    let time = d.toLocaleTimeString([], {
        hour: '2-digit',
        minute : '2-digit',
        // second: '2-digit'
    });

    // submit function to handle search
    const  handleSubmit = (e) =>{
       e.preventDefault();
       setSearch(input);
    }
    console.log(time);
    console.log(weatherData);
  // console.log(weatherToday);

  return (
    <div className="weather-forecast">
    <form onSubmit={handleSubmit} className='input-search'>
    <div class="input-group  w-75 mx-auto">      
        <input type="search" 
        class="form-control" 
        id="floatingInputGroup1" 
        placeholder="Search City"
         aria-label='Search City'
         aria-describedby='basic-addon2' 
         value={input}
         name='search'
         onChange={(e)=>setInput(e.target.value)}
         required
        />
        <button type='submit' className='input-group-text' id='basic-addon-2'>
          <i className='fas fa-search'>search</i>
        </button>
    </div>
    </form>
    <div className='container'>
           {weatherToday.map((item, i) =>{
            const icon = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
             return(
            <div key={i}>
            <div className='location'>
              <span className=''>{cityName}</span>
            </div>
          <div className='date-container'>
             <div className='time'>
              {/* {hour}:{minutes}
              <span className='am-pm'>{ampm} </span> */}
              {time}
            </div>
              <div className='day'>
                <span className='day'>{day}, {date} {month}</span>
              </div>                            
          </div>
          <div className='current-weather'>
            <div className='conditions'>
                <div><img src={icon} alt='weather icon'></img></div>
                <span className='condition'>{item.weather[0].description}</span>
            </div>
            <div className='conditions'>
                  <span>{("temp" in item.main) ? (
                  <p>{item.main.temp}°C</p>
                    ) : (
                    <p>Loading weather data...</p>
                  )}</span>
                  <p>{item.main.temp_min} | {item.main.temp_max}</p>
              </div>
              <div className='coditions'>
                 <div className='condition-item '>
                    <div>pressure:</div>
                    <div> {("pressure" in item.main) ? (
                    <span>{item.main.pressure} mb</span>) 
                    :(<p>Loading weather data...</p>)} </div>
                 </div>
                <div className='condition-item'> 
                  <div>wind:</div>
                  <div>{item.wind.speed} kmph:</div>
                </div>
                 <div className='condition-item '>
                   <div> humidity:</div>
                   <div>{item.main.humidity} %</div>
                 </div>
                 <div className='condition-item '>
                   <div>precipitation:</div>
                   <div>1 mm</div>
                 </div>
                 <div className='condition-item '>
                   <div>cloudiness</div>
                   <div>55%</div>
                 </div>                 
              </div>
          </div>  
            </div>)
           })}      
         </div>
      <div>
      {weatherData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className='grid'>
            {weatherData.map((item, index) => {
              // Extract relevant data from item object
              const date = new Date(item.dt * 1000).toDateString();
              const temp = item.main.temp;
              const icon = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;

              return (
                  <div key={index}  className="flex">
                        <span className='day'>{date}</span>                        
                        <img src={icon} alt="Weather icon" />
                        <p>{temp} °C</p>
                        <span>{item.weather[0].description}</span>
                  </div>
                );
          })}
        </div>
      )}     
    </div>
  </div>
  );  
}

export default WeatherForecast;