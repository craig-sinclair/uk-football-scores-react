import axios from 'axios';
console.log(process.env)
const apiKey = process.env.REACT_APP_SCORES_API_KEY;

const options = {
    method: 'GET',
    url: 'https://sportscore1.p.rapidapi.com/sports/1/events/date/2024-08-17',
    params: {page: '1'},
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'sportscore1.p.rapidapi.com'
    }
  };

export const fetchFootballData = async () => {
    try {
        const response = await axios.request(options);
        console.log("successfully sent football data?")
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}