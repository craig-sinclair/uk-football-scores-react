import React, { useState, useEffect } from 'react';
import { fetchFootballData } from '../api/sportsScore';
import './home.css';

const ScottishPrem = ({ selectedDate }) => {
    const [scottishData, setScottishData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchFootballData(selectedDate);
                if (data && Array.isArray(data.data)) {
                    const filteredData = data.data.filter(match => match.league_id === 688);
                    setScottishData(filteredData);
                } else {
                    setScottishData([]); 
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedDate]);

    if (loading) return <p>Loading Scottish Premier League data...</p>;
    if (error) return <p>An error occurred while loading sports data: {error.message}</p>;

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th className="text-left" colSpan="5">Scottish Premier League</th>
                    </tr>
                </thead>
                <tbody>
                    {scottishData.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center">No matches found for the selected date.</td>
                        </tr>
                    ) : (
                        scottishData.map(match => {
                            const homeScore = match.home_score && match.home_score.display !== null ? match.home_score.display : '';
                            const awayScore = match.away_score && match.away_score.display !== null ? match.away_score.display : '';

                            return (
                                <tr key={match.id} className="border-b" style={{ borderBottomColor: '#3f3f3f'}}>
                                    <td className="px-2 py-2 text-right">{match.home_team.name}</td>
                                    <td className="px-2 py-2 flex justify-center items-center">
                                        <img src={match.home_team.logo} alt="Home Team Badge" className="h-[40px] w-auto" />
                                    </td>
                                    <td className="px-2 py-2 score-cell text-center">{homeScore} - {awayScore}</td>
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
    );
};

export default ScottishPrem;
