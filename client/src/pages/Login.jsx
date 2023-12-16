import { Link } from "react-router-dom";

export default function Login() {
	return (
		<div>
			<div class="center">
				<h1>Login</h1>
				<form method="post">
					<div class="txt_field">
						<input type="text" required />
						<span></span>
						<label>Username</label>
					</div>
					<div class="txt_field">
						<input type="password" required />
						<span></span>
						<label>Password</label>
					</div>
					<div class="pass">Forgot Password?</div>
					<Link to="/choice">
						<input type="submit" value="Login" />
					</Link>
					<div class="signup_link">
						Not a member? <a href="./signup">Signup</a>
					</div>
				</form>
			</div>
			{/* <h1>hello</h1> */}
		</div>
	);
}
