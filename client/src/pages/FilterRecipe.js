// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faSearch } from "@fortawesome/free-solid-svg-icons"
import PreviousSearches from "../components/PreviousSearches"
import RecipeCard from "../components/RecipeCard"
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, React, useMemo } from "react";

export default function Recipes(){
    const navigate = useNavigate();
    // const data = navigate.location.state?.data;
    const { state } = useLocation();
    const topRecipes = state?.top_recipes || [];
    const recipeNames = topRecipes.map((recipe) => recipe.name);
    console.log(recipeNames);


    // useEffect(() => {
    //   // Trigger additional actions or updates when state changes, if needed
    //     console.log("State changed:", state);
    // }, [state]);

    // console.log(recipeNames[0]);
    const recipes = [
        {
            // title: recipeNames[0],
            title: recipeNames[0],
            // title: " helloo",
            image: "/img/gallery/img_1.jpg",
            authorImg: "/img/top-chiefs/img_1.jpg",
        }, 
        {
            title: recipeNames[1],
            // title: " helloo",
            image: "/img/gallery/img_4.jpg",
            authorImg: "/img/top-chiefs/img_2.jpg",
        },
        {
            title: recipeNames[2],
            // title: " helloo",
            image: "/img/gallery/img_5.jpg",
            authorImg: "/img/top-chiefs/img_3.jpg",
        },
        {
            title: recipeNames[3],
            // title: " helloo",
            image: "/img/gallery/img_6.jpg",
            authorImg: "/img/top-chiefs/img_5.jpg",
        },
        {
            title: recipeNames[4],
            // title: " helloo",
            image: "/img/gallery/img_10.jpg",
            authorImg: "/img/top-chiefs/img_6.jpg",
        },
        {
            title: recipeNames[5],
            // title: " helloo",
            image: "/img/gallery/img_1.jpg",
            authorImg: "/img/top-chiefs/img_1.jpg",
        }
    ]

    // const recipes = React.useMemo(
    //     () =>
    //       recipeNames.map((title, index) => ({
    //         title,
    //         image: `/img/gallery/img_${index + 1}.jpg`, // Assuming index starts from 0
    //         authorImg: `/img/top-chiefs/img_${index + 1}.jpg`,
    //       })),
    //     [recipeNames]
    //   );

    return (
        <div>
            {/* gonna add the delay here so that the animation changes acoording to the number of items itself */}
            <div className="recipes-container">
                {recipes.map((recipes, index) => (
                    <RecipeCard key = {index} recipe = {recipes} />
                ))}
            </div>
            {/* <p>{state[0]}</p> */}
            {/* <Footer/> */}
        </div>
    )
}