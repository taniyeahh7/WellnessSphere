import Navbar from "./components/Navbar.js"
import Hero from "./components/Hero.js"
import ImproveSkill from "./components/ImproveSkill.js";
import QuoteSection from "./components/QuoteSection.js";
// import ChefSection from "./components/ChefSection.js"; if want to include put in body also
import Footer from "./components/Footer.js";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="container main">
        <Hero/>
        <ImproveSkill/>
        <QuoteSection/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
