import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="section-1" className="mx-10 mt-20 md:mt-36 ">
      <div className="md:flex">
        <div className=" md:text-right md:w-1/2">
          <h1 className="text-7xl md:text-9xl font-bold leading-16 md:leading-28">
            We <br /> Make <br /> Good <br />
            Shit
          </h1>
        </div>
        <div className="mt-12 md:w-1/4 md:ml-35 md:mt-128">
          <h2 className="text-[1.4rem] md:text-2xl ">
            Dogstudio is a multidisciplinary creative studio at the intersection of art, design and
            technology.
          </h2>
          <p className="text-xs md:text-[15px] mt-2 opacity-70 text-purple-200">
            Our goal is to deliver amazing experiences that make people talk, and build strategic
            value for brands, tech, entertainment, arts & culture.
          </p>
          <ul className="flex mt-8 text-xs gap-2 ">
            {["Facebook", "Instagram", "Dribbble", "Twitter"].map((item, index) => (
              <li key={item}>
                {index === 0 ? "" : "/"}
                {"  "}
                <Link href="/" className="cursor-pointer">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
