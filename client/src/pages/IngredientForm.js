import { Link } from "react-router-dom"
import { useState } from "react"

export default function Login(){

    const[ingredients, setIngredients] = useState("");
    const[unsuitableIngre, setUnsuitableIngre] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            input_ingre: ingredients,
            cannot_have: unsuitableIngre,
        };
   

    try{
        const response = await fetch("/ingredientform",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if(response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error("Server responded with an error");
        }
    }
    catch(error) {
        console.error("Error sending request to the server:", error);
    }
    };

    return(
        <div>
            <div class="center">
            <h1>Ingredients</h1>
                <form method="post">
                    <div class="txt_field">
                        <input type="text" required />
                        <span></span>
                        <label>Ingredients available e.g. Milk, Flour, Vanilla</label>
                    </div>
                    <div class="txt_field">
                        <input type="text" required />
                        <span></span>
                        <label>Ingredients not suitable to use e.g. Sugar, Peanuts</label>
                    </div>
                        <Link to="/filterrecipe"><input type="submit" value="Submit" /></Link>
                    <div class="signup_link">
                        {/* Not a member? <a href="./signup">Signup</a> */}
                    </div>
                </form>
            </div>
            {/* <h1>hello</h1> */}
            
        </div>
    )
}

