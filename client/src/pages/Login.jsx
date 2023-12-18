import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	signInStart,
	signInSuccess,
	signInFailure,
} from "../redux/user/userSlice";

export default function Login() {
	const [formData, setFormData] = useState({});
	const { loading, error } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

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
			dispatch(signInStart());
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
				dispatch(signInFailure(data.message));
				return;
			}
			dispatch(signInSuccess(data));
			navigate("/choice");
		} catch (error) {
			dispatch(signInFailure(error.message));
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
				</form>
				{error && <p>{error}</p>}
				<div class="signup_link">
					Not a member? <Link to="/signup">Signup</Link>
				</div>
			</div>
		</div>
	);
}
