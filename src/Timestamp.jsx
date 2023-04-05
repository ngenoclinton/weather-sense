const [weather, setWeather] = useState(null);

const getWeatherData = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  setWeather(data);
};

useEffect(() => {
  getWeatherData();
}, []);

const timestamp = weather?.dt;
const date = new Date(timestamp * 1000);
const day = date.toLocaleDateString('en-US', { weekday: 'long' });
const time = date.toLocaleTimeString('en-US', { timeStyle: 'short' });
const month = date.toLocaleDateString('en-US', { month: 'long' });

return (
  <div>
    <p>Day: {day}</p>
    <p>Time: {time}</p>
    <p>Month: {month}</p>
  </div>
);