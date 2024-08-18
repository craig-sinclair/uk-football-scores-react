import React, {useEffect, useState} from 'react';
import { fetchFootballData } from '../api/pinnacle';

import './home.css';

const HomeScreen = () => {
    const [sportsData, setSportsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async() => {
            setLoading(true);
            try{
                const data = await fetchFootballData();
                if(data && Array.isArray(data.data)){
                    const filteredData = data.data.filter(match => match.league_id === 317);
                    setSportsData(filteredData);
                }
                else{
                    console.log("No data found");
                }
            }
            catch(err){
                setError(err);
            }
            finally{
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>An error occurred while loading sports data: {error.message}</p>;

    return(
        <div>
            <table className="w-2/5 mx-auto">
                <thead>
                    <tr>
                        <th className="text-left" colSpan="5">English Premier League</th>
                    </tr>
                </thead>
                <tbody>
                    {sportsData.map(match => {
                        const homeScore = match.home_score && match.home_score.display !== null ? match.home_score.display : 'N/A';
                        const awayScore = match.away_score && match.away_score.display !== null ? match.away_score.display : 'N/A';

                        return (
                            <tr key={match.id} className="border-b" style={{ borderBottomColor: '#3f3f3f'}}>

                                <td className="px-2 py-2 text-right">{match.home_team.name}</td>
                                <td className="px-2 py-2">
                                    <img src={match.home_team.logo} alt="Home Team Badge" className="h-[40px] w-auto mx-auto" />
                                </td>
                                <td className="px-2 py-2 text-center">{homeScore} - {awayScore}</td>
                                <td className="px-2 py-2">
                                    <img src={match.away_team.logo} alt="Away Team Badge" className="h-[40px] w-auto mx-auto" />
                                </td>
                                <td className="px-2 py-2 text-left">{match.away_team.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
};

export default HomeScreen;