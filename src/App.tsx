
import { memo } from 'react';
import './App.css';
import WeatherData from './components/WeatherData';
function App( ) {
  return (
    <div className='container'> 
    <h2>Weather App</h2>
        <WeatherData />
    </div>
  );
}
export default memo (App);
