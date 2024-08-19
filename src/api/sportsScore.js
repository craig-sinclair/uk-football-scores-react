import axios from 'axios';
const apiKey = process.env.REACT_APP_SCORES_API_KEY;

export const fetchFootballData = async (date = new Date().toISOString().split('T')[0]) => {
    const options = {
        method: 'GET',
        url: `https://sportscore1.p.rapidapi.com/sports/1/events/date/${date}`,
        params: { page: '1' },
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'sportscore1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log("successfully sent football data?");
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};