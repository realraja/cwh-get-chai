// "use client"s
import AllUsersComponent from "@/components/AllUsersComponent";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="min-h-[45vh] flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-center text-5xl font-bold">
          Get Best Notes
          <span>
            <Image width={16} height={16}  className="h-16 w-auto"  src="/cute-kitty2.gif" alt="gif image" />
          </span>
        </div>
        <p>A notes platform for students to get good marks.</p>
        <p className="text-center">
          A place where your students can buy note from this website , And also
          manage there notes my this platform
        </p>

        <div className="flex justify-center items-center flex-col sm:flex-row gap-5">
        <Link href={'/login'}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-800 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none  focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Start Now
          </button>
          </Link>
<Link href={'/about'}>
          <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none  focus:ring-blue-800">
            <span className="relative px-5 py-2 transition-all ease-in duration-75  bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Read More
            </span>
          </button>
          </Link>
        </div>

      </div>

      <div className="h-1 bg-white opacity-10"></div>

      <div className=" min-h-[50vh] flex flex-col sm:flex-row my-5 gap-3 justify-around items-center">
        <div className="flex flex-col justify-center items-center">
          <Image width={28} height={28}  className="w-28 h-28 rounded-full object-cover bg-pink-50" src="/support-kitty.gif" alt="coin Image" />
          <h2 className="font-bold scale-105">Student want to help</h2>
          <p className="my-3">Your students avlaible to help you.</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image width={28} height={28} className="w-28 h-28 rounded-full object-cover bg-pink-50" src="/money-kitty.gif" alt="coin Image" />
          <h2 className="font-bold scale-105">Student want to contrebute</h2>
          <p className="my-3">Your students want to contrebute finacially.</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image width={28} height={28} className="w-28 h-28 rounded-full object-cover bg-pink-50" src="/money-kitty.gif" alt="coin Image" />
          <h2 className="font-bold scale-105">Student want to contrebute</h2>
          <p className="my-3">Your students want to contrebute finacially.</p>
        </div>
      </div>
      
      <AllUsersComponent />

      <div className="h-1 bg-white opacity-10"></div>

      <div className=" min-h-[50vh] flex flex-col justify-around items-center">

        <h2 className="font-bold text-2xl my-5">Learn : how to make perfect notes</h2>
        <iframe
          id="ytplayer"
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/sm4PzXF61z8?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        ></iframe>
      {/* <iframe   src="https://www.youtube.com/embed/sm4PzXF61z8?si=9uCjPHeTO2FI52gL"  ></iframe> */}
      </div>
    </>
  );
}
