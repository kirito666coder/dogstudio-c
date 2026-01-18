import NavBar from "@/components/NavBar";
import Dog from "./Dog";

export default function Home() {
  return (
    <>
      <main className="relative">
        <Dog />
        <section id="section-1">
          <NavBar />
        </section>
        <section id="section-2" />
        <section id="section-3" />
      </main>
    </>
  );
}
