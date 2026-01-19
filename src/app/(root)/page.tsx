import NavBar from "@/components/NavBar";
import Dog from "./Dog";
import HeroSection from "./HeroSection";
import ProjectSection from "./ProjectSection";
import BackGroundImages from "./BackGroundImages";

export default function Home() {
  return (
    <>
      <main className="relative">
        <BackGroundImages />
        <Dog />
        <NavBar />
        <HeroSection />
        <ProjectSection />
        <section id="section-3" />
      </main>
    </>
  );
}
