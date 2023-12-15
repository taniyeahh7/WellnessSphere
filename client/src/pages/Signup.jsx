import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("called");
		try {
			setLoading(true);
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			console.log(data);
			if (data.success === false) {
				setLoading(false);
				setError(data.message);
				return;
			}
			setLoading(false);
			setError(null);
			navigate("/sign-in");
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	};
	// front-end code
	return (
		<div>
			<div class="center">
				<h1>Sign Up</h1>
				<form onSubmit={handleSubmit}>
					<div class="txt_field">
						<input type="text" required id="username" onChange={handleChange} />
						<span></span>
						<label>Username</label>
					</div>
					<div class="txt_field">
						<input type="text" required id="email" onChange={handleChange} />
						<span></span>
						<label>Email</label>
					</div>
					<div class="txt_field">
						<input type="text" required id="phone" onChange={handleChange} />
						<span></span>
						<label>Phone No.</label>
					</div>

					<div style={{ marginBottom: "4px" }}>
						<label>Have any of the following health conditions:</label>
					</div>
					<div>
						<input type="checkbox" id="scales" name="scales" />
						<label for="scales">Diabetes</label>
					</div>
					<div>
						<input type="checkbox" id="horns" name="horns" />
						<label for="horns">Blood Pressure</label>
					</div>
					<div>
						<input type="checkbox" id="horns" name="horns" />
						<label for="horns">Color Blindness</label>
					</div>

					<div class="txt_field">
						<input
							type="password"
							required
							onChange={handleChange}
							id="password"
						/>
						<span></span>
						<label>Password</label>
					</div>
					<div class="pass">Forgot Password?</div>
					<input
						disabled={loading}
						type="submit"
						value={loading ? "Loading..." : "Sign Up"}
					/>
					<div class="signup_link">
						Already a member? <a href="./login">Sign In</a>
					</div>
				</form>
			</div>
		</div>
	);
}
