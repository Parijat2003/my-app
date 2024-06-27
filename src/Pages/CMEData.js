import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CMEData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCMEData = async () => {
    setIsLoading(true);
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0];
    const url = `https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/CME?startDate=${startDate}&endDate=${endDate}`;
    try {
      const result = await axios.get(url);
      setData(result.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCMEData();
  }, []);

  return (
    <div>
      <h1>Coronal Mass Ejection Data</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {data && data.length > 0 && data.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', background: '#f9f9f9' }}>
            <h2>Activity ID: {item.activityID}</h2>
            <p>Start Time: {item.startTime}</p>
            <p>Source Location: {item.sourceLocation}</p>
            <p>Note: {item.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CMEData;
