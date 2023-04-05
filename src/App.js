import './App.css';
import React, { useState, useEffect } from "react";
import { wait } from '@testing-library/user-event/dist/utils';
import WeatherForecast from './Forcast';
function App() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
  let time   = new Date();
   let minutes = time.getMinutes();
   let hour = time.getHours();
  let  day = days[time.getDay()];
  let date = time.getDate()
  let  month = months[time.getMonth()]
   let ampm = hour <= 12 ? 'AM' : 'PM';
  let hoursIn12HourFormat = hour >= 13 ? hour % 12 : hour;
 
  return (
    <div className="background">
        <div className="overlay">
         
        <WeatherForecast
          time= {time}
          minutes={minutes}
          hour={hour}
          day={day}
          date ={date}
          month={month}
          ampm={ampm}
          hoursIn12HourFormat ={hoursIn12HourFormat}
          days={days}
          months={months}
        />
        </div>
    </div>
  );
}

export default App;



// navigator.geolocation.getCurrentPosition(success => {
      //   let {longitude, latitude} = success.coords;
      //   let data = fetch(`api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=4${api_key}`).
      //   then(res => res.json()).then(data =>{
      //   });
      //   console.log(data);
      // }); 
      // '';





  {/* <div className='flex'>
                <span className='day'>Monday</span>
                <span><img src="" alt='weather icon'></img></span>
                <span>20 °C</span>
              </div>
              <div className='flex'>
                <span className='day'>Monday</span>
                <span><img src="" alt='weather icon'></img></span>
                <span>20 °C</span>
              </div>
              <div className='flex'>
                <span className='day'>Monday</span>
                <span><img src="" alt='weather icon'></img></span>
                <span>20 °C</span>
              </div>
              <div className='flex'>
                <span className='day'>Monday</span>
                <span><img src="" alt='weather icon'></img></span>
                <span>20 °C</span>
              </div>
              <div className='flex'>
                <span className='day'>Monday</span>
                <span><img src="" alt='weather icon'></img></span>
                <span>20 °C</span>
              </div> */}