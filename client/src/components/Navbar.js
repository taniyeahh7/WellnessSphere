
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
        }
    ]

    // function closeSidebar(){
    //     setShowSideBar(false);
    // }

    return(
        <>
            <div className="navbar container">
                <a href="#!" className="logo">W<span>ellness</span>Sphere</a>
                <div className="nav-links">
                    {/* <a href="#!">Home</a>
                    <a href="#!">Recipes</a>
                    <a href="#!">Settings</a> */}
                    {links.map(link=>(
                        <Link to={link.path} key={link.name}>{link.name}</Link>
                    ))}
                </div>
                {/* <div onClick={()=>setShowSideBar(!showSidebar)} className='sidebar-btn'> */}
                {/* <div onClick={() => setShowSideBar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div> this is the original side
                </div> */}
            </div>
            {/* {showSidebar && <Sidebar close={closeSidebar} links={links}/>} this also one right under not so sure */}
            {/* <Sidebar links={links}/> */}
        </>
        
    )
}