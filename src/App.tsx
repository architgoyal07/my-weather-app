import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const Api_key="ac9b279084249132732a71521e67af03";

class App extends React.Component{

  state = {
    temperature : undefined,
    city : undefined,
    country :undefined,
    humidity : undefined,
    description : undefined,
    error : undefined
    }

  getWeather = async (e: { preventDefault: () => void; target: { elements: { city: { value: any; }; country: { value: any; }; }; }; })=>{
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call =await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_key}&units=metric`);
    const data = await api_call.json();  

    if(city && country){

      console.log(data);//no use of it
    this.setState({
      temperature : data.main.temp,
      country  : data.sys.country,
      city : data.name,
      humidity:data.main.humidity,
      description:data.weather[0].description,
      error:""
    })    
  }
  else {
    this.setState({
      temperature : undefined,
      country  : undefined,
      city : undefined,
      humidity:undefined,
      description:undefined,
      error:"Please Enter values"
    })    
  }
}
  render(){
    return(
      <div>
      <Titles />
      <Form getWeather={this.getWeather} /> 
      <Weather 
      temperature={this.state.temperature}
      country={this.state.country}
      city={this.state.city}
      humidity={this.state.humidity}
      description={this.state.description}
      error={this.state.error}
      
      
      />
      </div>
    );
  }

}

export default App;
