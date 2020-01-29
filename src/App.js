import React, { useEffect, useState, Component } from 'react';
import Recipe from './components/Recipe';
import './css/app.css';

const App = () => {

  // Authentication
  const APP_ID = "0fe2ba05";
  const APP_KEY = "2676182e0c1190b1e899c517b55665c1	";

  // State
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [submitQuery, setSubmitQuery] = useState('vegan');

  useEffect( () => {
    getRecipes();
  }, [submitQuery])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${submitQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);

    // Or fetch ...
    // fetch(`https://api.edamam.com/search?q=tofu&app_id=${APP_ID}&app_key=${APP_KEY}`)
    //   .then(response => {
    //     response.json();
    //   })
  }

  const updateQuery = e => {
    setQuery(e.target.value);
  }

  const getQuery = e => {
    e.preventDefault();
    setSubmitQuery(query);
    setQuery('');
  }

  return (
    <div className="App">
      <h1 className="title">RECIPE APP</h1>
      <h3 className="sub-title">Type here and find the most tasty recipes</h3>
      <form onSubmit={getQuery} className="search=form">
        <input className="search-bar" type="text" value={query} onChange={updateQuery}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={Math.round(recipe.recipe.calories)} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;


