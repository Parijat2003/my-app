import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AstronomyStuff1 = () => {
    const [date, setDate] = useState(null);
    const [explanation, setExplanation] = useState('');
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    const url = "https://api.nasa.gov/planetary/apod?api_key=glafqPFy8XfLNXtqQHi1YbhNYP9d0H3HKTgfJ4cH";

    useEffect(() => {
        const getResult = async () => {
            try {
                const result = await axios.get(url);
                setDate(result.data.date);
                setExplanation(result.data.explanation);
                setTitle(result.data.title);
                setImage(result.data.url);
            } catch (error) {
                console.error("Error fetching the APOD data", error);
            }
        };
        getResult();
    }, []);

    return (
        <div>
            <h1>{date}</h1>
            <h2>{explanation}</h2>
            <h1>{title}</h1>
            <img src={image} alt={title} />
        </div>
    );
};

export default AstronomyStuff1;
