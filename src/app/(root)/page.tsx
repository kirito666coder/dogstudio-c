import NavBar from "@/components/NavBar";
import Dog from "./Dog";
import HeroSection from "./HeroSection";
import ProjectSection from "./ProjectSection";

export default function Home() {
  return (
    <>
      <main className="relative">
        <Dog />
        <NavBar />
        <HeroSection />
        <ProjectSection />
        <section id="section-3" />
      </main>
    </>
  );
}
