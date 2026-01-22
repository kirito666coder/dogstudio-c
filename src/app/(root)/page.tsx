import NavBar from "@/components/NavBar";
import Dog from "./Dog";
import HeroSection from "./HeroSection";
import ProjectSection from "./ProjectSection";
import BackGroundImages from "./BackGroundImages";
import FooterSection from "./FooterSection";

export default function Home() {
  return (
    <>
      <main className="relative">
        <BackGroundImages />
        <Dog />
        <NavBar />
        <HeroSection />
        <ProjectSection />
        <FooterSection />
      </main>
    </>
  );
}
