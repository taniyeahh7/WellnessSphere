import Navbar from "./components/Navbar.js"
import Hero from "./components/Hero.js"
import ImproveSkill from "./components/ImproveSkill.js";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="container main">
        <Hero/>
        <ImproveSkill/>
      </div>
    </div>
  );
}

export default App;
