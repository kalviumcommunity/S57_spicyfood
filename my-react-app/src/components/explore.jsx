import React, { useEffect, useState } from 'react';
import './explore.css';
import axios from 'axios';
import UpdatePopup from './UpdatePopup';
import UserDropdown from './dropdown';

function Explore() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // State for managing selected user and dishes
  const [selectedUserId, setSelectedUserId] = useState('');
  const [userId, setUserId] = useState('');
  // const [dishes, setDishes] = useState([]);
  const [formData, setFormData] = useState({
    Image: '',
    Dish_Name: '',
    type: '',
    Ingridents: '',
    Origin: '',
    created_by:''
  });


  useEffect(() => {
    const fetchSpicyFoods = async () => {
      try {
        const response = await axios.get('http://localhost:3002/');
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSpicyFoods();
  }, []);

  // Fetch dishes when a user is selected
  useEffect(() => {
    if (selectedUserId) {
      axios.get(`http://localhost:3002/user/${selectedUserId}`)
        .then(response => {
          console.log(response)
          setData(response.data)
        })
        .catch(error => console.error('Error fetching dishes:', error));
    } else {
      // setDishes([]); // Clear dishes if no user is selected
    }
  }, [selectedUserId]);

  const handleChange = (e) => {
    setUserId(localStorage.getItem('userId'));
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      created_by: userId
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserId(localStorage.getItem('userId'))
    setFormData({
      ...formData,
      created_by: userId
    });

    try {
      const response = await axios.post('http://localhost:3002/add-food', formData);
      setData([...data, response.data]); // Update the list with the new dish
      setShowForm(false); // Hide the form after successful submission


      console.log(userId)
      setFormData({ // Reset the form fields
        Image: '',
        Dish_Name: '',
        type: '',
        Ingridents: '',
        Origin: '',
        created_by: ''
      });
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  const handleUpdate = (id) => {
    setSelectedId(id);
    setShowUpdatePopup(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/delete-food/${id}`);
      setData(data.filter(dish => dish._id !== id));
    } catch (error) {
      console.error('There was an error deleting the dish!', error);
    }
  };

  const handleUpdateSubmit = (id, updatedData) => {
    setData(data.map(dish => (dish._id === id ? updatedData : dish)));
  };

  return (
    <div className="container">
      <button onClick={() => setShowForm(!showForm)} className="create-button">
        {showForm ? "Close Form" : "Create"}
      </button>

      <div className="App">
        <h1>Spicy Food Database</h1>
        <UserDropdown 
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
        />
      </div>

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
          <div className="dish-card-header">
            <button onClick={() => handleUpdate(dish._id)} className="update-button">Update</button>
            <button onClick={() => handleDelete(dish._id)} className="delete-button">Delete</button>
          </div>
          <img src={dish.Image} alt="No image" className="images" />
          <h2>{dish.Dish_Name}</h2>
          <p><strong>Type:</strong> {dish.type}</p>
          <p><strong>Ingredients:</strong> {dish.Ingridents}</p>
          {dish.Origin && <p><strong>Origin:</strong> {dish.Origin}</p>}
        </div>
      ))}

      {showUpdatePopup && (
        <UpdatePopup
          id={selectedId}
          onClose={() => setShowUpdatePopup(false)}
          onUpdate={handleUpdateSubmit}
        />
      )}

      {/* {selectedUserId && (
        <div>
          <h3>Dishes Created by Selected User</h3>
          <ul>
            {dishes.map(dish => (
              <li key={dish._id}>{dish.Dish_Name}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}

export default Explore;
