import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faHome, faList, faCog } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function Navbar() {
	const { currentUser } = useSelector((state) => state.user);

	//all the default links
	const defaultLinks = [
		{
			name: "Home",
			path: "/",
			icon: faHome,
		},
		{
			name: "Recipes",
			path: "/recipes",
			icon: faList,
		},
		{
			name: "Settings",
			path: "/settings",
			icon: faCog,
		},
	];
	//links to be displayed when user is not logged in
	const loggedOutLinks = [
		{
			name: "Login",
			path: "/login",
			icon: faCog,
		},
		{
			name: "Signup",
			path: "/signup",
			icon: faCog,
		},
	];
	//links to be displayed when user is logged in
	const loggedInLinks = [
		{
			name: "Exercise",
			path: "/choice",
			icon: faCog,
		},
	];

	// ----- front-end code -----
	return (
		<>
			<div className="navbar container">
				<Link to="/" className="logo">
					W<span>ellness</span>Sphere
				</Link>
				<div className="nav-links">
					{defaultLinks.map((link) => (
						<Link to={link.path} key={link.name}>
							{link.name}
						</Link>
					))}
					{currentUser
						? loggedInLinks.map((link) => (
								<Link to={link.path} key={link.name}>
									{link.name}
								</Link>
						  ))
						: loggedOutLinks.map((link) => (
								<Link to={link.path} key={link.name}>
									{link.name}
								</Link>
						  ))}
				</div>
			</div>
		</>
	);
}
