"use client";
import { Link } from 'react-router-dom';
import { TypeAnimation } from "react-type-animation";

export default function Header() {
  return (
    <nav className="text-gray-800 p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-2xl fixed z-10 w-full">
      <div className="container lg:px-8 mx-auto my-auto flex justify-between items-center place-items-center">
      <Link to="/">
          <p className=" text-white font-bold">
            {" "}
            <TypeAnimation
              style={{
                whiteSpace: "pre-line",
                display: "block",
              }}
              sequence={[
                "Anime",
                1200,
                `Anime Search`,
                1200,
                `Anime Search App`,
                1200,
                ``,
                1200,
                "",
              ]}
              repeat={Infinity}
            />
          </p>
        </Link>
      </div>
    </nav>
  );
}
