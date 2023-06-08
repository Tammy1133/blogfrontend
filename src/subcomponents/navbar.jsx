import React, { useEffect, useState } from "react";
import "../css/main.css";
import { Spin as Hamburger } from "hamburger-react";
import logo from "../utils/logo.png";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsopen] = useState(false);

  const handleBarclose = () => {
    setIsopen(!isOpen);
  };
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className=" z-50  w-screen   ">
      <div
        className=" py-[10px] md:py-[10px]  flex mynav items-center  w-[100%] 
         drop-shadow-lg px-6  bg-transparent"
      >
        <div className="flex items-center cursor-pointer w-full justify-between ">
          {/* <h1 className="text-4xl md:text-5xl font-semibold text-white">
            BRAND.
          </h1> */}
          <div className="flex items-center" onClick={() => navigate("/")}>
            <img
              src={logo}
              alt=""
              className="w-[80px] md:w-[100px]"
              loading="lazy"
            />
          </div>
          <div className="md:hidden">
            <Hamburger
              color="white"
              toggled={isOpen}
              toggle={() => {
                setIsopen(!isOpen);
              }}
            />
          </div>
          <div className="hidden md:flex items-center justify-between mr-12">
            <h5
              onClick={() => {
                navigate("/");
              }}
              className="mr-3 text-white hover:scale-105 cursor-pointer"
            >
              Home
            </h5>
            <h5
              onClick={() => {
                navigate("/Politics");
              }}
              className="mr-3 text-white hover:scale-105 cursor-pointer"
            >
              Politics
            </h5>
            <h5
              onClick={() => {
                navigate("/Romance");
              }}
              className="mr-3 text-white hover:scale-105 cursor-pointer"
            >
              Romance
            </h5>
            <h5
              onClick={() => {
                navigate("/Music");
              }}
              className="mr-3 text-white hover:scale-105 cursor-pointer"
            >
              Music
            </h5>
            <h5
              onClick={() => {
                navigate("/others");
              }}
              className="mr-3 text-white hover:scale-105 cursor-pointer"
            >
              Others
            </h5>
          </div>
        </div>
      </div>
      <div
        className={`bi ${
          !isOpen && "hidden"
        } md:hidden absolute mynavext z-[50]  w-screen px-10 py-3 slide-in-right bg-black`}
      >
        <div className="   flex flex-col w-full ">
          <h5
            className=" text-white hover:scale-105 cursor-pointer "
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </h5>
          <h5
            className=" text-white hover:scale-105 cursor-pointer mt-3"
            onClick={() => {
              navigate("/politics");
            }}
          >
            Politics
          </h5>
          <h5
            className=" text-white hover:scale-105 cursor-pointer mt-3"
            onClick={() => {
              navigate("/romance");
            }}
          >
            Romance
          </h5>
          <h5
            className=" text-white hover:scale-105 cursor-pointer mt-3"
            onClick={() => {
              navigate("/music");
            }}
          >
            Music
          </h5>
          <h5
            className=" text-white hover:scale-105 cursor-pointer mt-3"
            onClick={() => {
              navigate("/others");
            }}
          >
            Others
          </h5>
        </div>
      </div>
    </div>
  );
};
