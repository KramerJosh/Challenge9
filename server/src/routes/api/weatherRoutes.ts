import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const { cityName } = req.body; // Assuming the city name is passed in the request body

    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }

    // Get weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(cityName); // Assuming a method to get weather data by city name

    if (!weatherData) {
      return res.status(404).json({ error: 'Weather data not found' });
    }

    // Save city to search history
    await HistoryService.addCity(cityName);

    // Return weather data as the response
    return res.status(200).json({ weatherData, message: 'City weather retrieved and saved to history' });
  } catch (error) {
    console.error('Error in POST request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    return res.status(200).json({ cities });
  } catch (error) {
    console.error('Error in GET /history:', error);
    return res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// BONUS: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate that ID is provided
    if (!id) {
      return res.status(400).json({ error: 'City ID is required' });
    }

    // Remove city from search history
    await HistoryService.removeCity(Number(id)); // Assuming the ID is a number

    return res.status(200).json({ message: `City with ID ${id} removed from history` });
  } catch (error) {
    console.error('Error in DELETE /history/:id:', error);
    return res.status(500).json({ error: 'Failed to remove city from history' });
  }
});

export default router;
