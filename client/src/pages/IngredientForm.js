import { useNavigate } from "react-router-dom"
import { useState, useEffect} from "react"

export default function IngredientForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        input_ingredients: '',
        cannot_have: '',
    });

    
    useEffect(() => {
      // Clear the form data when the component mounts
        return () => setFormData({ input_ingredients: '', cannot_have: '' });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        const response = await fetch("http://localhost:5000/api/ingredform",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(formData)
        });
        if(response.status === 200){
            const serverResponse = await response.json();
            console.log(serverResponse.top_recipes)
            navigate("/filterrecipe", {state: serverResponse})
            return serverResponse
        } else {
            console.log("not working");
        }
    }

    // useEffect(() => {
    //   // Clear the form data when the component mounts
    //     return () => setFormData({ input_ingredients: '', cannot_have: '' });
    // }, []);

  //   const handleChange = (e) => {
	// 	setFormData({
	// 		...formData,
	// 		[e.target.id]: e.target.value,
	// 	});
	// };


  return (
    <div className="center">
      <h1>Ingredients</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="txt_field">
          <input
            type="text"
            value={formData.input_ingredients}
            onChange={(e) => setFormData({ ...formData, input_ingredients: e.target.value })}
            required
          />
          <span></span>
          <label>Ingredients available e.g. Milk, Flour, Vanilla</label>
        </div>
        <div className="txt_field">
          <input
            type="text"
            value={formData.cannot_have}
            onChange={(e) => setFormData({ ...formData, cannot_have: e.target.value })}
            required
          />
          <span></span>
          <label>Ingredients not suitable to use e.g. Sugar, Peanuts</label>
        </div>
        <input type="submit" value="Submit" />
        <div class="signup_link">
				</div>
      </form>
    </div>
  );
}

