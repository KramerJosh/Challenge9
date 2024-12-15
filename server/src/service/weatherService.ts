//Should get the current weather
//should get weather over next 5 days
//


import dotenv from 'dotenv';
dotenv.config();

const api_key = `${process.env.API_KEY}`;
const base_url = `${process.env.API_BASE_URL}`;
const example_city = 'brooklyn';

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  targetDate: Date;
  temperature: number;
  wind: number;
  humidity: number;

  constructor(targetDate: Date, temperature: number, wind: number, humidity: number) {
    this.targetDate = targetDate;
    this.temperature = temperature;
    this.wind = wind;
    this.humidity = humidity
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL:  string;
  apiKey: string;
  cityName: string;
  
  constructor(baseURL: string, apiKey: string, cityName: string) {
    this.baseURL =  baseURL || process.env.BASE_URL || '';  //for this line and the line below I'm using || to ungrey-out baseURL and apiKey in the constructor.
    this.apiKey = apiKey|| process.env.API_KEY || '';
    this.cityName = cityName;
  }

  // TODO: Create buildGeocodeQuery method
  //I'll need to make an API call to openweather, where I include the city
  // https://openweathermap.org/api/geocoding-api uses: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
  // we can clean up the above and just use:
  // https://api.openweathermap.org/geo/1.0/direct?q={cityname}&appid={API key}
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&appid=${this.apiKey}`;
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(): Promise<Coordinates> {
    const geocodeQuery = this.buildGeocodeQuery();
    const response = await fetch(geocodeQuery);
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    const data = await response.json();
    return {
      name: data[0].name,
      lat: data[0].lat,
      lon: data[0].lon,
    };
  }

  // Method to fetch weather data for the given coordinates
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }

  // Fetch the current weather data
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(weatherQuery);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return response.json();
  }

  // Parse the current weather data
  private parseCurrentWeather(response: any): Weather {
    const targetDate = new Date();
    const temperature = response.main.temp;
    const wind = response.wind.speed;
    const humidity = response.main.humidity;
    return new Weather(targetDate, temperature, wind, humidity);
  }

  // Build the forecast data (next 5 days)
  private buildForecastQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }

  // Fetch 5-day weather forecast data
  private async fetchForecastData(coordinates: Coordinates): Promise<any[]> {
    const forecastQuery = this.buildForecastQuery(coordinates);
    const response = await fetch(forecastQuery);
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    const data = await response.json();
    return data.list; // the forecast data is contained in the "list" field
  }

  // Build an array of Weather objects for the forecast data
  private buildForecastArray(forecastData: any[]): Weather[] {
    return forecastData.map((forecast) => {
      const targetDate = new Date(forecast.dt * 1000); // Convert Unix timestamp to Date
      const temperature = forecast.main.temp;
      const wind = forecast.wind.speed;
      const humidity = forecast.main.humidity;
      return new Weather(targetDate, temperature, wind, humidity);
    });
  }

  // Get weather for the city (current + 5-day forecast)
  async getWeatherForCity(cityName: any): Promise<{ current: Weather; forecast: Weather[] }> {
    try {
      const locationData = await this.fetchLocationData();
      const currentWeatherResponse = await this.fetchWeatherData(locationData);
      const currentWeather = this.parseCurrentWeather(currentWeatherResponse);
      const forecastData = await this.fetchForecastData(locationData);
      const forecastArray = this.buildForecastArray(forecastData);
      return { current: currentWeather, forecast: forecastArray };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to get weather data');
    }
  }
}

export default new WeatherService(base_url, api_key, example_city);
