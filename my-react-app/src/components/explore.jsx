import React, { useEffect, useState } from 'react';
import "./explore.css";
import phalImage from './assets/phal.webp';

import axios from "axios";

function Explore() {
const [data,setData]=useState([]);
  useEffect(() => {
    const fetchSpicyFoods = async () => {
        try {
            const response = await axios.get('http://localhost:3002/');
            console.log(response.data)
            setData(response.data)
        } catch (err) {
            console.log(err)
        }
    }; 
  
    fetchSpicyFoods();
  }, []);
  
  return (
      <div className="container">
        {data.map(dish => (
          <div key={dish._id} className="dish-card">
            <img src={dish.image} alt="No image" className='images' />
            <h2>{dish.Dish_Name}</h2>
            <p><strong>Type:</strong> {dish.type}</p>
            <p><strong>Ingredients:</strong> {dish.Ingriedents}</p>
            {dish.Origin && <p><strong>Origin:</strong> {dish.Origin}</p>}
          </div>
        ))}
      </div>
    );
  };
 
  

export default Explore;