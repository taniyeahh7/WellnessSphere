// // TextRecipe.js
// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation } from 'react-router-dom';

// const TextRecipe = () => {
// //   const { index } = useParams();
// //   const [recipe, setRecipe] = useState(null);

// //   useEffect(() => {
// //     // Replace this with your actual data fetching logic for a single recipe
// //     fetch(`/filterrecipe/${index}`)
// //       .then((response) => response.json())
// //       .then((data) => setRecipe(data))
// //       .catch((error) => console.error('Error fetching recipe:', error));
// //   }, [index]); // Re-fetch when the index changes

// //   if (!recipe) {
// //     // Handle the case where the recipe with the given index is not found or not yet loaded
// //     return <div>Loading...</div>;
// //   }

// //   const { name, ingredients, instructions, time } = recipe;

//     const TextRecipe = () => {
//     const { state } = useLocation();
  
//     if (!state || !state.recipe) {
//       // Handle the case where the state or recipe is not available
//       return <div>No recipe data available</div>;
//     }
  
//     const { name, ingredients, instructions, time } = state.recipe;

//   return (
//     <div>
//       <h1>{name}</h1>
//       <p>Ingredients: {ingredients}</p>
//       <p>Instructions: {instructions}</p>
//       <p>Time: {time} minutes</p>
//       {/* Add more details as needed */}
//     </div>
//   );
// };

// export default TextRecipe;


// TextRecipe.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const TextRecipe = () => {
  const { state } = useLocation();
  console.log(state);

  if (!state || !state.recipe) {
    // Handle the case where the state or recipe is not available
    return <div>No recipe data available</div>;
  }

  const totalRecipe = state.recipe;
  console.log(totalRecipe.name);

  return (
    <div className="text-recipe">
      <h1>{totalRecipe.title}</h1>
      
      <h4>Ingredients:</h4>
      <p> {totalRecipe.ingred}</p>
      <h4>Time:</h4>
      <p>{totalRecipe.time} minutes</p>
      <h4>Instructions:</h4>
      <p> {totalRecipe.instruct}</p>
      
      {/* Add more details as needed */}
    </div>
  );
};

export default TextRecipe;
