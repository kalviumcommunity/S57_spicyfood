import React from 'react';
import { Link } from 'react-router-dom';
import "./explore.css";
import phalImage from './assets/phal.webp';



function Explore() {
  return (
    <div className="explore-container">
      <h1 className="explore-heading">Explore</h1>
      { <img src={phalImage} alt="Explore Background" className="explore-image" /> }
      <div className="ingredients">
        <h2>Pal curry</h2>

        <ol className='ingredientsList'>
         <li> 2 cups chopped spinach</li>
         <li>1 onion, finely chopped</li>
          <li>2 tomatoes, finely chopped</li>
          <li>2 green chilies, chopped </li>
          <li>2 cloves garlic, minced</li>
          <li>1-inch piece of ginger, grated</li>
          <li>1 teaspoon cumin seeds</li>
          <li >1teaspoon turmeric powder</li>
          <li>1 teaspoon coriander powder</li>
          <li>1/2 teaspoon red chili powder</li>
          <li>1/2 teaspoon garam masala</li>
          <li>Salt to taste</li>
          <li>2 tablespoons oil or ghee for cooking</li>
          <li>Water as needed</li>
          <li>Fresh cilantro leaves for garnish</li>
          </ol>
      <div className="recipe">
        <h2>Recipe</h2>
        <p>Heat oil or ghee in a pan over medium heat. Add cumin seeds and let them splutter.
Add chopped onions and sauté until they turn translucent.
Add minced garlic and grated ginger. Sauté for a minute until the raw smell disappears.
Add chopped tomatoes and green chilies. Cook until tomatoes turn soft and mushy.
Add turmeric powder, coriander powder, red chili powder, and salt. Mix well and cook for a couple of minutes.
Add chopped spinach (palak) to the pan. Stir well and cook until spinach wilts down.
Add a little water if needed to adjust the consistency of the curry.
Cover the pan and let the curry simmer for 5-7 minutes on low heat.
Once the spinach is cooked and the flavors are well combined, sprinkle garam masala on top and mix gently.
Garnish with fresh cilantro leaves if desired.
Serve hot with rice or Indian bread like roti or naan.</p>

<Link to="/explore/new">Go to New Explore Page</Link>
    </div>    
    
</div>
</div>


);
};

export default Explore;