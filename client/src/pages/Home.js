
import Hero from "../components/Hero.js"
import ImproveSkill from "../components/ImproveSkill.js";
import QuoteSection from "../components/QuoteSection.js";
import Footer from "../components/Footer.js";

export default function Home(){
    return (
        <div>
            <Hero/>
            <ImproveSkill/>
            <QuoteSection/>
            {/* <Footer/> */}
        </div>
    )
}