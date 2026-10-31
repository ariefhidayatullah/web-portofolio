import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import Music from "@/components/sections/Music";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import RecruiterView from "@/components/sections/RecruiterView";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Music />
        <Contact />
      </main>
      <RecruiterView />
      <Footer />
    </>
  );
}
