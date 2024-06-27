import React, { useState, useEffect } from 'react';
import axios from "axios";

const AstronomyStuff2 = () => {
    const [neoData, setNeoData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=glafqPFy8XfLNXtqQHi1YbhNYP9d0H3HKTgfJ4cH";
    const maxRetries = 3;

    useEffect(() => {
        const getResult = async () => {
            try {
                const result = await axios.get(url);
                console.log(result.data); // Logging the data to ensure it's being fetched
                setNeoData(result.data.near_earth_objects);
            } catch (error) {
                if (error.response && error.response.status === 429 && retryCount < maxRetries) {
                    console.error("Too many requests, retrying...");
                    setRetryCount(retryCount + 1);
                    setTimeout(getResult, 2000); // Retry after 2 seconds
                } else {
                    console.error("Error fetching the NEO data", error);
                    setError("Error fetching the NEO data");
                }
            } finally {
                setLoading(false);
            }
        };
        getResult();
    }, [retryCount]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Near Earth Objects Data</h1>
            {Object.keys(neoData).length === 0 ? (
                <p>No data available for the specified date range.</p>
            ) : (
                Object.keys(neoData).map(date => (
                    <div key={date}>
                        <h2>{date}</h2>
                        {neoData[date].map(neo => (
                            <div key={neo.id}>
                                <h3>{neo.name}</h3>
                                <p>NASA JPL URL: <a href={neo.nasa_jpl_url} target="_blank" rel="noopener noreferrer">{neo.nasa_jpl_url}</a></p>
                                <p>Absolute Magnitude: {neo.absolute_magnitude_h}</p>
                                <p>Estimated Diameter (meters): {neo.estimated_diameter.meters.estimated_diameter_min} - {neo.estimated_diameter.meters.estimated_diameter_max}</p>
                                <p>Is Potentially Hazardous: {neo.is_potentially_hazardous_asteroid ? "Yes" : "No"}</p>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default AstronomyStuff2;
