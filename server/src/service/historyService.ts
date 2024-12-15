import fs from 'fs';
import path from 'path';

// Define a City class with name and id properties
class City {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

// Complete the HistoryService class
class HistoryService {
  private historyFilePath: string;

  constructor() {
    // Path to the JSON file where search history will be stored
    this.historyFilePath = path.join(__dirname, 'searchHistory.json');
  }

  // Read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.promises.readFile(this.historyFilePath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error) {
      console.error('Error reading search history:', error);
      return []; // Return an empty array if the file doesn't exist or there's an error
    }
  }

  // Write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.promises.writeFile(this.historyFilePath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error writing to search history:', error);
    }
  }

  // Get cities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return this.read();
  }

  // Add city method that adds a city to the searchHistory.json file
  async addCity(name: string): Promise<void> {
    const cities = await this.read();
    const id = cities.length > 0 ? cities[cities.length - 1].id + 1 : 1; // Assign a new unique ID for the city
    const newCity = new City(name, id);
    cities.push(newCity);
    await this.write(cities);
  }

  // BONUS: Remove city method that removes a city from the searchHistory.json file
  async removeCity(id: number): Promise<void> {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id); // Remove the city with the given ID
    await this.write(cities);
  }
}

export default new HistoryService();
