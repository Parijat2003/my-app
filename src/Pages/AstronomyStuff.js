import React, { useState } from 'react';
import axios from 'axios';

const AstronomyStuff = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('apollo 11');

  const getResult = async (searchQuery) => {
    setIsLoading(true);
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(searchQuery)}&media_type=image,video`;
    try {
      const result = await axios.get(url);
      setData(result.data.collection.items);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getResult(query);
  };

  React.useEffect(() => {
    getResult(query); // Initial fetch with default query
  }, []);

  return (
    <div>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for images or videos..." 
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>Search</button>
      </form>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {data && data.length > 0 && data.map(item => (
          <div key={item.data[0].nasa_id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', background: '#f9f9f9' }}>
            <h1 style={{ fontSize: '18px' }}>{item.data[0].title}</h1>
            <h2 style={{ fontSize: '14px', color: '#666' }}>{item.data[0].date_created}</h2>
            <p style={{ fontSize: '14px', color: '#333' }}>{item.data[0].description}</p>
            {item.data[0].media_type === 'image' ? (
              <img 
                src={`https://images-assets.nasa.gov/image/${item.data[0].nasa_id}/${item.data[0].nasa_id}~orig.jpg`} 
                 
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            ) : (
              <video controls style={{ width: '100%', borderRadius: '8px' }}>
                <source src={`https://images-assets.nasa.gov/video/${item.data[0].nasa_id}/${item.data[0].nasa_id}~orig.mp4`} type="video/mp4" />
              </video>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AstronomyStuff;

