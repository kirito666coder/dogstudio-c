export default function FooterSection() {
  return (
    <div className="min-h-screen mt-30">
      <div className="md:flex">
        <div className="  px-4 md:px-70 md:w-1/2">
          <h5 className="text-xs font-extrabold opacity-50">THIS IS HOW WE DO IT</h5>
          <p className="text-4xl md:text-5xl font-extrabold text-center md:text-start md:w-100">
            We&apos;re crafting emotional experiences aimed at improving results
          </p>
        </div>
        <div className="relative z-2 px-4 md:mr-10 mt-10 md:mt-60 pt-10 bg-gradient-to-b from-transparent to-black md:from-transparent md:to-transparent">
          <div className="flex flex-col md:flex-row text-sm opacity-50 font-bold gap-5 md:gap-20">
            <p className="md:w-60">
              Dogstudio is a design & technology firm working globally from our offices based in
              Belgium and Chicago. <br /> Our strong focus on producing high quality & emotional
              brandings, digital products and experiences became a signature.
            </p>
            <p className="md:w-60">
              We’re passionate about moving people and solving problems for the likes of Microsoft,
              The Museum of Science And Industry Of Chicago, The Kennedy Center of Washington,
              Dragone, Quanta Magazine, and many more.
            </p>
          </div>
          <h5 className="border-b-2 border-red-500 w-fit py-2 font-bold mt-5">
            Discover our values
          </h5>
          <div className="absolute bg-red-600 h-px w-70 top-39 md:top-90 right-[25vw] md:right-[50vw] md:w-90 rotate-45" />
        </div>
      </div>
      <div className=" relative z-2 bg-gradient-to-b from-transparent via-black/70 to-black w-full h-150 ">
        <div className="flex w-full h-full items-end pb-15">
          <div className=" w-full h-50 text-2xl px-4 flex flex-col md:flex-row gap-4 md:items-end md:justify-end md:gap-35">
            <p>Chicago .</p>
            <p>Amsterdam .</p>
            <p>Paris .</p>
          </div>
          <div className=" w-[80%] h-50 flex flex-col items-end md:pr-45 pr-4">
            <h3 className="text-2xl font-extrabold text-end">
              We <br />
              Make <br />
              Good <br />
              Shit{" "}
            </h3>
            <h4 className="text-sm mt-2 md:mt-9">Fb / Ins / Dr / Tw</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
