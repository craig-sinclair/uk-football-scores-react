import React, { useEffect, useState } from 'react';
import { fetchFootballData } from '../api/sportsScore';
import DateSelector from '../dateSelector';
import ScottishPrem from './scottishPrem';
import './home.css';

const HomeScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [sportsData, setSportsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDateChange = async (date) => {
        setSelectedDate(date); 
        setLoading(true);
        try {
            const data = await fetchFootballData(date);
            if (data && Array.isArray(data.data)) {
                const filteredData = data.data.filter(match => match.league_id === 317);
                setSportsData(filteredData);
            } else {
                setSportsData([]); 
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleDateChange(new Date().toISOString().split('T')[0]);
    }, []);

    return (
        <div>
            <DateSelector onDateChange={handleDateChange} />
            {error && <p>An error occurred while loading sports data: {error.message}</p>}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th className="text-left" colSpan="5">English Premier League</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center">Loading...</td>
                            </tr>
                        ) : (
                            sportsData.map(match => {

                                const adjustTime = (startAt) => {
                                    if (!startAt) return '';
                                    const [date, time] = startAt.split(' ');
                                    const [hours, minutes] = time.split(':');
                                    const matchDate = new Date(`${date}T${hours}:${minutes}:00Z`);
                                    matchDate.setHours(matchDate.getHours()); 
                                    const adjustedHours = String(matchDate.getHours()).padStart(2, '0');
                                    const adjustedMinutes = String(matchDate.getMinutes()).padStart(2, '0');
                                    return `${adjustedHours}:${adjustedMinutes}`;
                                };
                                const matchStart = adjustTime(match.start_at);

                                const homeScoreAvailable = match.home_score && match.home_score.display !== null && match.home_score.display !== undefined;
                                const awayScoreAvailable = match.away_score && match.away_score.display !== null && match.away_score.display !== undefined;
                                const homeScore = homeScoreAvailable ? match.home_score.display : '';
                                const awayScore = awayScoreAvailable ? match.away_score.display : '';

                                const scoreDisplay = homeScoreAvailable && awayScoreAvailable ? `${homeScore} - ${awayScore}` : matchStart;
                                
                                return (
                                    <tr key={match.id} className="border-b" style={{ borderBottomColor: '#3f3f3f'}}>
                                        <td className="px-2 py-2 text-right">{match.home_team.name}</td>
                                        <td className="px-2 py-2 flex justify-center items-center">
                                            <img src={match.home_team.logo} alt="Home Team Badge" className="h-[40px] w-auto" />
                                        </td>
                                        <td className="px-2 py-2 score-cell text-center">{scoreDisplay}</td>
                                        <td className="px-2 py-2 flex justify-center items-center">
                                            <img src={match.away_team.logo} alt="Away Team Badge" className="h-[40px] w-auto" />
                                        </td>
                                        <td className="px-2 py-2 text-left">{match.away_team.name}</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            <ScottishPrem selectedDate={selectedDate} />
        </div>
    );
};

export default HomeScreen;
