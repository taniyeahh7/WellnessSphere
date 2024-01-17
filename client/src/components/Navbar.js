
// import {useState} from "react"
// import Sidebar from "./Sidebar.js"
import { Link } from "react-router-dom"
import {faHome,faList,faCog} from "@fortawesome/free-solid-svg-icons"

export default function Navbar(){
    // const [showSidebar,setShowSideBar]=useState(true);
    const links=[
        {
            name:"Home",
            path:"/",
            icon:faHome
        },
        {
            name:"Recipes",
            path:"/recipes",
            icon:faList
        },
        {
            name:"Settings",
            path:"/settings",
            icon:faCog
        },
        {
            name:"Login",
            path:"/login",
            icon:faCog
        },
        {
            name:"Signup",
            path:"/signup",
            icon:faCog
        },
        {
            name:"Profile",
            path:"/profile",
            icon:faCog
        }
    ]

    // function closeSidebar(){
    //     setShowSideBar(false);
    // }

    return(
        <>
            <div className="navbar container">
                <Link to="/" className="logo">W<span>ellness</span>Sphere</Link>
                <div className="nav-links">
                    {links.map(link=>(
                        <Link to={link.path} key={link.name}>{link.name}</Link>
                    ))}
                </div>
            </div>
        </>
        
    )
}