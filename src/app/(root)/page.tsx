import NavBar from "@/components/NavBar";
import Dog from "./Dog";
import HeroSection from "./HeroSection";

export default function Home() {
  return (
    <>
      <main className="relative">
        <Dog />
        <NavBar />
        <HeroSection />
        <section id="section-2" />
        <section id="section-3" />
      </main>
    </>
  );
}
