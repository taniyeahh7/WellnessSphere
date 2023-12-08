import { useState } from "react";

export default function Signup() {
	return (
		<div>
			<div class="center">
				<h1>Sign Up</h1>
				<form method="post">
					<div class="txt_field">
						<input type="text" required />
						<span></span>
						<label>Username</label>
					</div>

					<div class="txt_field">
						<input type="text" required />
						<span></span>
						<label>Any disorders?</label>
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
						<input type="password" required />
						<span></span>
						<label>Password</label>
					</div>
					<div class="txt_field">
						<input type="password" required />
						<span></span>
						<label>Confirm Password</label>
					</div>
					<div class="pass">Forgot Password?</div>
					<input type="submit" value="Login" />
					<div class="signup_link">
						Already a member? <a href="./login">Sign In</a>
					</div>
				</form>
			</div>
		</div>
	);
}
