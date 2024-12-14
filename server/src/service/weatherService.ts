//Should get the current weather
//should get weather over next 5 days
//


import dotenv from 'dotenv';
dotenv.config();


// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  long: number;
}

// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  isPrecipitation: boolean;
  typePrecipitation: string;
  humidity: number;

  constructor(temperature: number, isPrecipitation: boolean, typePrecipitation: string, humidity: number) {
    this.temperature: temperature;
    this.isPrecipitation: isPrecipitation;
    this.typePrecipitation: typePrecipitation;
    this.humidity: humidity
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL:  string;
  apiKey: string;
  cityName: string;
  
  constructor(baseURL: string, apiKey: string, cityName: string) {
    this.baseURL =  process.env.BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = cityName;
  }
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {
  
  // TODO: Create fetchAndDestructureLocationData method
  // Pass fetchLocationData in here, then destructure
  // private async fetchAndDestructureLocationData() {}

  // TODO: Create destructureLocationData method
  // pass fetchAndDestructureLocationData into here
  // the above will return lat and long in the url
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
