import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdatePopup.css';

function UpdatePopup({ id, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    Image: '',
    Dish_Name: '',
    type: '',
    Ingridents: '',
    Origin: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/${id}`);
        setFormData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

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
      const response = await axios.put(`http://localhost:3002/${id}`, formData);
      onUpdate(id, response.data);
      onClose();
    } catch (error) {
      console.error('There was an error updating the form!', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit} className="update-food-form">
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
          <button type="submit">Update Food</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePopup;
