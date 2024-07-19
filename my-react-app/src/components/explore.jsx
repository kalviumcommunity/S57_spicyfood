import React, { useEffect, useState } from 'react';
import "./explore.css";
import phalImage from './assets/phal.webp';
import axios from "axios";

function Explore() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    Image: '',
    Dish_Name: '',
    type: '',
    Ingridents: '',
    Origin: ''
  });

  useEffect(() => {
    const fetchSpicyFoods = async () => {
      try {
        const response = await axios.get('http://localhost:3002/');
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSpicyFoods();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/add-food', formData);
      console.log(response.data);
      setData([...data, response.data]); // Update the list with the new dish
      setShowForm(false); // Hide the form after successful submission
      setFormData({ // Reset the form fields
        Image: '',
        Dish_Name: '',
        type: '',
        Ingridents: '',
        Origin: ''
      });
      console.log(formData)
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <div className="container">
      <button onClick={() => setShowForm(!showForm)} className="create-button">
        {showForm ? "Close Form" : "Create"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="add-food-form">
          <div>
            <label>Image URL:</label>
            <input type="text" name="Image" value={formData.Image} onChange={handleChange} required />
          </div>
          <div>
            <label>Dish Name:</label>
            <input type="text" name="Dish_Name" value={formData.Dish_Name} onChange={handleChange} required />
          </div>
          <div>
            <label>Type:</label>
            <input type="text" name="type" value={formData.type} onChange={handleChange} required />
          </div>
          <div>
            <label>Ingredients:</label>
            <input type="text" name="Ingridents" value={formData.Ingridents} onChange={handleChange} required />
          </div>
          <div>
            <label>Origin:</label>
            <input type="text" name="Origin" value={formData.Origin} onChange={handleChange} required />
          </div>
          <button type="submit">Add Food</button>
        </form>
      )}

      {data.map(dish => (
        <div key={dish._id} className="dish-card">
          <img src={dish.Image} alt="No image" className='images' />
          <h2>{dish.Dish_Name}</h2>
          <p><strong>Type:</strong> {dish.type}</p>
          <p><strong>Ingredients:</strong> {dish.Ingridents}</p>
          {dish.Origin && <p><strong>Origin:</strong> {dish.Origin}</p>}
        </div>
      ))}
    </div>
  );
}

export default Explore;
