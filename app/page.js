export default function Home() {
  return (
    <>
      <div class="min-h-[45vh] flex flex-col justify-center items-center gap-4">
        <div className="flex items-center justify-center text-5xl font-bold">
          Get Best Notes
          <span>
            <img className="h-16" src="/cute-kitty2.gif" alt="gif image" />
          </span>
        </div>
        <p>A notes platform for students to get good marks.</p>
        <p>
          A place where your students can buy note from this website , And also
          manage there notes my this platform
        </p>

        <div className="flex justify-center items-center gap-5">
          <button
            type="button"
            class="text-white bg-gradient-to-br from-purple-800 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none  focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Start Now
          </button>

          <button class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none  focus:ring-blue-800">
            <span class="relative px-5 py-2 transition-all ease-in duration-75  bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Read More
            </span>
          </button>
        </div>

      </div>

      <div className="h-1 bg-white opacity-10"></div>

      <div className=" min-h-[50vh] flex justify-around items-center">
        <div className="flex flex-col justify-center items-center">
          <img className="h-28 bg-pink-50 rounded-full" src="/support-kitty.gif" alt="coin Image" />
          <h2 className="font-bold scale-105">Student want to help</h2>
          <p className="my-3">Your students avlaible to help you.</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img className="h-28 bg-pink-50 rounded-full" src="/money-kitty.gif" alt="coin Image" />
          <h2 className="font-bold scale-105">Student want to contrebute</h2>
          <p className="my-3">Your students want to contrebute finacially.</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img className="h-28 bg-pink-50 rounded-full" src="/money-kitty.gif" alt="coin Image" />
          <h2 className="font-bold scale-105">Student want to contrebute</h2>
          <p className="my-3">Your students want to contrebute finacially.</p>
        </div>
      </div>

      <div className="h-1 bg-white opacity-10"></div>

      <div className=" min-h-[50vh] flex flex-col justify-around items-center">

        <h2 className="font-bold text-2xl my-5">Learn : how to make perfect notes</h2>
        
      <iframe className="m-10" width="560" height="315" src="https://www.youtube.com/embed/sm4PzXF61z8?si=9uCjPHeTO2FI52gL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </>
  );
}
