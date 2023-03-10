import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './weather.css'

interface WeatherData {
  name: string;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
    temp_max : number;
    temp_min : number;
    pressure : number;
    feels_like : number;
    windDirection : number;
    sea_level : number;

  };
  sys: {
    country: string;
    sunrise : number;
    sunset : number;
  };
  
  wind: {
    speed : number;
    deg : number;
  };
}

const WeatherApp: React.FC = () => {
  
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');

  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=453d062ebb7570f831248c72c07e97f0`
      );
      console.log(response);
      
      setWeather(response.data);
      setError('');
      setCity('');
      setCountry('');
    } catch (error) {
      setWeather(null);
      setError('Weather data not found');
    }
  };

  return (
    <>
    <Container>
    <h1>Weather App</h1>
      <Title> Enter Details </Title>
      <Form onSubmit={search}>
        <Input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {weather && (
       <WeatherContainer>
       <table>
        <h2> Weather Details </h2>
         <tbody>
           <tr>
             <th>City</th>
             <td>{weather.name}, {weather.sys.country}</td>
           </tr>
           <tr>
             <th>Icon</th>
             <td><img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} /></td>
           </tr>
           <tr>
             <th>Temperature</th>
             <td>{Math.round(weather.main.temp)}°C</td>
           </tr>
           <tr>
             <th>Humidity</th>
             <td> {weather.main.humidity}%</td>
           </tr>
           <tr>
             <th>Description</th>
             <td>{weather.weather[0].description}</td>
           </tr>
           <tr>
             <th>Temp min</th>
             <td>{weather.main.temp_min} °C</td>
           </tr>
           <tr>
             <th>Feels_Like</th>
             <td>{weather.main.feels_like} °C</td>
           </tr>
           <tr>
             <th>Pressure</th>
             <td>{weather.main.pressure}</td>
           </tr>
           <tr>
             <th>Sea Level</th>
             <td>{weather.main.sea_level}</td>
           </tr>
           <tr>
             <th>Sunrise</th>
             <td>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</td>
           </tr>
           <tr>
             <th>Sunset</th>
             <td>{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</td>
           </tr>
           <tr>
             <th>Wind</th>
             <td>{weather.wind.speed} Km/hr</td>
           </tr>
           <tr>
             <th>Degree</th>
             <td>{weather.wind.deg} °Deg</td>
           </tr>
         </tbody>
       </table>
     </WeatherContainer>
     
      )}
    </Container>
            </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 22px;
`;

const Title = styled.h1`
  // font-size: 22px;
  // margin-bottom: 22px;
`;



const Form = styled.form`
  display: flex;
  flex-direction: column ;
  align-items: center;
  margin-bottom: 12px;
`;

const Input = styled.input`
  padding: 8px;
  margin-left : 10px;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid gray;
`;

const Button = styled.button`
  padding: 8px;
  margin-top : 12px;
  border-radius: 14px;
  border: none;
  background-color: blue;
  color: white;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  font-weight : bold;
  color: red;
  margin-bottom: 16px;
`;

export default WeatherApp;
 
