import PreviousSearches from "../components/PreviousSearches";
import RecipeCard from "../components/RecipeCard";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, React, useMemo } from "react";

export default function Recipes() {
	const navigate = useNavigate();
	// const data = navigate.location.state?.data;
	const { state } = useLocation();
	const topRecipes = state?.top_recipes || [];
	const recipeNames = topRecipes.map((recipe) => recipe.name);
	const recipeIngred = topRecipes.map((recipe) => recipe.ingredients);
	const recipeInstruct = topRecipes.map((recipe) => recipe.instructions);
	const recipeTime = topRecipes.map((recipe) => recipe.time);
	console.log(recipeNames);

	useEffect(() => {
		// Trigger additional actions or updates when state changes, if needed
		console.log("State changed:", state);
	}, [state]);

	// console.log(recipeNames[0]);
	const recipes = [
		{
			// title: recipeNames[0],
			title: recipeNames[0],
			// title: " helloo",
			image: "/img/general_cooking/cooking_1.jpg",
			authorImg: "/img/top-chiefs/img_1.jpg",
			link: "/textrecipe",
			ingred: recipeIngred[0],
			instruct: recipeInstruct[0],
			time: recipeTime[0],
		},
		{
			title: recipeNames[1],
			// title: " helloo",
			image: "/img/general_cooking/cooking_2.jpg",
			authorImg: "/img/top-chiefs/img_2.jpg",
			link: "/textrecipe",
			ingred: recipeIngred[1],
			instruct: recipeInstruct[1],
			time: recipeTime[1],
		},
		{
			title: recipeNames[2],
			// title: " helloo",
			image: "/img/general_cooking/cooking_3.jpg",
			authorImg: "/img/top-chiefs/img_3.jpg",
			link: "/textrecipe",
			ingred: recipeIngred[2],
			instruct: recipeInstruct[2],
			time: recipeTime[2],
		},
		{
			title: recipeNames[3],
			// title: " helloo",
			image: "/img/general_cooking/cooking_4.jpg",
			authorImg: "/img/top-chiefs/img_5.jpg",
			link: "/textrecipe",
			ingred: recipeIngred[3],
			instruct: recipeInstruct[3],
			time: recipeTime[3],
		},
		{
			title: recipeNames[4],
			// title: " helloo",
			image: "/img/general_cooking/cooking_5.jpg",
			authorImg: "/img/top-chiefs/img_6.jpg",
			link: "/textrecipe",
			ingred: recipeIngred[4],
			instruct: recipeInstruct[4],
			time: recipeTime[4],
		},
		{
			title: recipeNames[5],
			// title: " helloo",
			image: "/img/general_cooking/cooking_6.jpg",
			authorImg: "/img/top-chiefs/img_1.jpg",
			link: "/textrecipe",
			ingred: recipeIngred[5],
			instruct: recipeInstruct[5],
			time: recipeTime[5],
		},
	];

	const handleRecipeClick = (index) => {
		const selectedRecipe = recipes[index];
		navigate(`/filterrecipe/${index}`, { state: { recipe: selectedRecipe } });
		// navigate(`/filterrecipe/${index}`, { state: selectedRecipe  });
	};

	return (
		<div>
			{/* gonna add the delay here so that the animation changes acoording to the number of items itself */}

			<div className="recipes-container">
				{recipes.map((recipes, index) => (
					<div key={index} onClick={() => handleRecipeClick(index)}>
						<RecipeCard recipe={recipes} />
					</div>
				))}
			</div>

			{/* <p>{state[0]}</p> */}
			{/* <Footer/> */}
		</div>
	);
}
