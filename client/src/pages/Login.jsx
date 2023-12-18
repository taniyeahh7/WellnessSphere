import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	//function to handle changes in the form
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	//function to handle submit in the form
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await fetch("/api/auth/sign-in", {
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
			navigate("/choice");
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	};
	// ----- front-end code -----
	return (
		<div>
			<div class="center">
				<h1>Login</h1>
				<form onSubmit={handleSubmit}>
					<div class="txt_field">
						<input type="text" required id="username" onChange={handleChange} />
						<span></span>
						<label>Username</label>
					</div>
					<div class="txt_field">
						<input
							type="password"
							required
							id="password"
							onChange={handleChange}
						/>
						<span></span>
						<label>Password</label>
					</div>
					<input
						disabled={loading}
						type="submit"
						value={loading ? "Loading..." : "Login"}
					/>
					<div class="signup_link">
						Not a member? <a href="./signup">Signup</a>
					</div>
				</form>
			</div>
		</div>
	);
}
