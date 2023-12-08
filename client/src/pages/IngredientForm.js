import { Link } from "react-router-dom"

export default function Login(){
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
                        <input type="password" required />
                        <span></span>
                        <label>Ingredients not suitable to use e.g. Sugar, Peanuts</label>
                    </div>
                        <Link to="/choice"><input type="submit" value="Submit" /></Link>
                    <div class="signup_link">
                        {/* Not a member? <a href="./signup">Signup</a> */}
                    </div>
                </form>
            </div>
            {/* <h1>hello</h1> */}
            
        </div>
    )
}

