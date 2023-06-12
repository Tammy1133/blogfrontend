import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../subcomponents/navbar";
import heroimg from "../utils/hero-bg.jpg";
import logo from "../utils/logo.png";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import { Autoplay, EffectFade } from "swiper";
import { Footer } from "../subcomponents/footer";
import { redirect, useNavigate } from "react-router-dom";
import Axios from "axios";

export const Home = () => {
  const navigate = useNavigate();

  const [allSections, setAllSections] = useState([]);
  const [blogData, setblogdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const data = await Axios.get(
        "https://blogbackend2.onrender.com/allposts"
      );
      setblogdata(data.data.reverse());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getPolitics = () => {
    const data = blogData.filter((item) => {
      return item.category.toUpperCase() === "POLITICS";
    });
    allSections.push(...data.slice(0, 2));
  };
  const getRomance = () => {
    const data = blogData.filter((item) => {
      return item.category.toUpperCase() === "ROMANCE";
    });
    allSections.push(...data.slice(0, 2));
    // setAllSections([...allSections, ...data.slice(0, 2)]);
  };
  const getMusic = () => {
    const data = blogData.filter((item) => {
      return item.category.toUpperCase() === "MUSIC";
    });
    // setAllSections([...allSections, ...data.slice(0, 2)]);
  };
  const getOthers = () => {
    const data = blogData.filter((item) => {
      return item.category.toUpperCase() === "OTHERS";
    });
    // setAllSections([...allSections, ...data.slice(0, 2)]);
  };

  useEffect(() => {
    getRomance();
    getPolitics();
    getMusic();
    getOthers();
    getAllPosts();
  }, []);

  const handleScroll = () => {
    localStorage.setItem("scrollPosition", window.scrollY);
  };

  // Attach the event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Retrieve the saved scroll position from localStorage
    const savedScrollPosition = localStorage.getItem("scrollPosition");
    // console.log(savedScrollPosition);

    // Scroll to the saved position
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
      console.log("Zagadat");
    }
  }, [blogData]);

  return loading ? (
    <div className="flex justify-center items-center h-[100vh] bg-black">
      <svg
        class="sp"
        viewBox="0 0 128 128"
        width="128px"
        height="128px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#000" />
            <stop offset="40%" stop-color="#fff" />
            <stop offset="100%" stop-color="#fff" />
          </linearGradient>
          <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#000" />
            <stop offset="60%" stop-color="#000" />
            <stop offset="100%" stop-color="#fff" />
          </linearGradient>
          <mask id="mask1">
            <rect x="0" y="0" width="128" height="128" fill="url(#grad1)" />
          </mask>
          <mask id="mask2">
            <rect x="0" y="0" width="128" height="128" fill="url(#grad2)" />
          </mask>
        </defs>
        <g fill="none" stroke-linecap="round" stroke-width="16">
          <circle class="sp__ring" r="56" cx="64" cy="64" stroke="#ddd" />
          <g stroke="hsl(223,90%,50%)">
            <path
              class="sp__worm1"
              d="M120,64c0,30.928-25.072,56-56,56S8,94.928,8,64"
              stroke="hsl(343,90%,50%)"
              stroke-dasharray="43.98 307.87"
            />
            <g transform="translate(42,42)">
              <g class="sp__worm2" transform="translate(-42,0)">
                <path
                  class="sp__worm2-1"
                  d="M8,22c0-7.732,6.268-14,14-14s14,6.268,14,14"
                  stroke-dasharray="43.98 175.92"
                />
              </g>
            </g>
          </g>
          <g stroke="hsl(283,90%,50%)" mask="url(#mask1)">
            <path
              class="sp__worm1"
              d="M120,64c0,30.928-25.072,56-56,56S8,94.928,8,64"
              stroke-dasharray="43.98 307.87"
            />
            <g transform="translate(42,42)">
              <g class="sp__worm2" transform="translate(-42,0)">
                <path
                  class="sp__worm2-1"
                  d="M8,22c0-7.732,6.268-14,14-14s14,6.268,14,14"
                  stroke-dasharray="43.98 175.92"
                />
              </g>
            </g>
          </g>
          <g stroke="hsl(343,90%,50%)" mask="url(#mask2)">
            <path
              class="sp__worm1"
              d="M120,64c0,30.928-25.072,56-56,56S8,94.928,8,64"
              stroke-dasharray="43.98 307.87"
            />
            <g transform="translate(42,42)">
              <g class="sp__worm2" transform="translate(-42,0)">
                <path
                  class="sp__worm2-1"
                  d="M8,22c0-7.732,6.268-14,14-14s14,6.268,14,14"
                  stroke-dasharray="43.98 175.92"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  ) : (
    blogData.length > 0 && (
      <div className="bg-black">
        <div className="relative">
          <img
            src={heroimg}
            alt=""
            className="absolute h-[85vh] w-screen object-cover"
          />
          <div className="relative">
            <Navbar></Navbar>
          </div>
          <div className="relative flex flex-col justify-center h-[75vh]  text-white ml-4">
            <div className="text-[50px] md:text-[55px] ">WELCOME TO</div>
            <div className="text-[30px] md:text-[35px] mt-[-10px] uppercase text-orange-500 ">
              Blogger Blog and news
            </div>
            <a
              href="#latest"
              className="flex items-center mt-2 ml-1 text-white decoration-transparent"
            >
              <div className=" mr-2">Read Latest news</div>
              <i className="bi bi-arrow-down-circle text-3xl mt-1 hover:text-orange-500 hover:underline cursor-pointer"></i>
            </a>
          </div>
        </div>
        <div className="pt-[60px] md:pt-[100px] mt-[-20px] bg-black ">
          <div className="h-[1px] w-[95vw] mx-auto  bg-white"></div>
          <div className="ml-3 md:ml-7 my-2  text-xl text-white">
            Get started with our
            <span className="font-semibold"> best stories</span>
          </div>
          <div
            id="latest"
            className="h-[1px] w-[95vw] mx-auto mb-5  bg-white"
          ></div>
          <div className="ml-[30px] mr-[10px]">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Autoplay]}
              className="mySwiper "
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
            >
              {blogData
                .filter((item) => item.best === true)
                .slice(0, 7)
                .map((item) => {
                  return (
                    <SwiperSlide>
                      <div className="w-[250px] md:w-[350px] mb-[60px] ">
                        <img
                          src={item.image}
                          alt=""
                          className=" transition-transform hover:scale-105 rounded-xl  w-[250px] md:w-[350px] h-[250px]  object-cover"
                        />
                        <div className="mt-3 md:mt-6  w-[30%] ">
                          <span
                            onClick={() => {
                              // window.open(`${item.category}`, "_self");
                              navigate(`${item.category}`);
                              // redirect(`${item.category}`);
                            }}
                            className="bg-gray-700 cursor-pointer text-sm  rounded-xl  py-1 px-2 text-white"
                          >
                            {item.category}
                          </span>
                        </div>
                        <div
                          className="my-3 text-[white] text-2xl cursor-pointer hover:text-orange-500 hover:underline"
                          onClick={() => {
                            // window.open(`/post/${item._id}`, "_blank");
                            navigate(`/post/${item._id}`);
                          }}
                        >
                          {item.title.split(" ").slice(0, 10).join(" ")}...
                        </div>
                        <div className="mt-2 text-base text-white">
                          {item.content.split(" ").slice(0, 30).join(" ")}...
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>

        <div className="py-7 bg-black">
          {/* <div className="h-[1px] w-[95vw] mx-auto  bg-white"></div> */}

          <div className="mx-3 md:mx-7 text-xl md:text-3xl text-white mt-4 mb-8">
            Latest Posts <br />
            <span className="font-semibold text-2xl md:text-4xl text-orange-500">
              From All Sections
            </span>
            <div className="mt-8 ">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-center ">
                {blogData.slice(0, 12).map((item) => {
                  return (
                    <div className="w-[300px]  tobeincreasedonlg sm:w-[290px] mx-auto md:w-[350px] lg:w-[300px] mb-[60px] flex flex-col items-center justify-center md:justify-start md:items-start ">
                      <img
                        src={item.image}
                        alt=""
                        className=" transition-transform hover:scale-105 rounded-xl w-[300px] tobeincreasedonlg sm:w-[290px] md:w-[350px] lg:w-[300px] h-[250px]  object-cover"
                      />
                      <div className="mt-3 md:mt-6  w-[30%] ">
                        <span
                          onClick={() => {
                            navigate(`${item.category}`);
                            // window.open(`${item.category}`, "_blank");
                          }}
                          className="bg-gray-700 cursor-pointer rounded-xl  text-sm py-1 px-2 text-white"
                        >
                          {item.category}
                        </span>
                      </div>
                      <div
                        className="my-3 text-[white] cursor-pointer hover:text-orange-500 hover:underline text-2xl mx-auto md:mx-0 text-center-on-sm"
                        onClick={() => {
                          // window.open(`/post/${item._id}`, "_blank");
                          navigate(`/post/${item._id}`);
                        }}
                      >
                        {item.title.split(" ").slice(0, 10).join(" ")}...
                      </div>
                      <div className="mt-2 text-base text-white text-center-on-sm addmlonlg">
                        {item.content.split(" ").slice(0, 30).join(" ")}...
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-screen h-[100%] py-[50px]  pl-3 bg-black">
          <div className=" w-screen md:w-[50vw] lg:w-[60vw] h-[100%]  relative ">
            <div className="mx-3 md:mx-7 text-xl md:text-3xl text-white mt-4 mb-2">
              Recommended <span className="text-orange-500">Posts</span> <br />
              <div className="mt-1 md:mt-4 ">
                <div className="">
                  <div className=" flex  mb-2  items-center">
                    <div className="mt-[60px] mr-6">
                      <img
                        src={blogData[3].image}
                        alt=""
                        className=" rounded-xl h-[130px]  sm:h-[170px] object-cover sm:w-[350px]"
                      />
                      <div className="mt-3 md:mt-6  w-[30%] ">
                        <span
                          onClick={() => {
                            navigate(`${blogData[3].category}`);
                          }}
                          className="bg-gray-700 cursor-pointer rounded-xl text-xs    sm:text-sm py-1 px-2 text-white"
                        >
                          {blogData[3].category}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div
                        className="my-3 text-[white] cursor-pointer hover:text-orange-500 hover:underline text-sm sm:text-xl mx-auto md:mx-0 "
                        onClick={() => {
                          navigate(`/post/${blogData[3]._id}`);
                        }}
                      >
                        {blogData[3].title.split(" ").slice(0, 10).join(" ")}...
                      </div>
                      <div className="mt-2 text-xs sm:text-sm text-white  ">
                        {blogData[3].content.split(" ").slice(0, 30).join(" ")}
                        ...
                      </div>
                    </div>
                  </div>
                  <div className=" flex  mb-2  items-center">
                    <div className="mt-[60px] mr-6">
                      <img
                        src={blogData[1].image}
                        alt=""
                        className=" rounded-xl h-[130px]  sm:h-[170px] object-cover sm:w-[350px]"
                      />
                      <div className="mt-3 md:mt-6  w-[30%] ">
                        <span
                          onClick={() => {
                            navigate(`${blogData[1].category}`);
                          }}
                          className="bg-gray-700 cursor-pointer rounded-xl text-xs    sm:text-sm py-1 px-2 text-white"
                        >
                          {blogData[1].category}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div
                        className="my-3 text-[white] cursor-pointer hover:text-orange-500 hover:underline text-sm sm:text-xl mx-auto md:mx-0 "
                        onClick={() => {
                          navigate(`/post/${blogData[1]._id}`);
                        }}
                      >
                        {blogData[1].title.split(" ").slice(0, 10).join(" ")}...
                      </div>
                      <div className="mt-2 text-xs sm:text-sm text-white  ">
                        {blogData[1].content.split(" ").slice(0, 30).join(" ")}
                        ...
                      </div>
                    </div>
                  </div>

                  <div className=" flex  mb-2  items-center">
                    <div className="mt-[60px] mr-6">
                      <img
                        src={blogData[7].image}
                        alt=""
                        className=" rounded-xl h-[130px]  sm:h-[170px] object-cover sm:w-[350px]"
                      />
                      <div className="mt-3 md:mt-6  w-[30%] ">
                        <span
                          onClick={() => {
                            navigate(`${blogData[7].category}`);
                          }}
                          className="bg-gray-700 cursor-pointer rounded-xl text-xs    sm:text-sm py-1 px-2 text-white"
                        >
                          {blogData[7].category}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div
                        className="my-3 text-[white] cursor-pointer hover:text-orange-500 hover:underline text-sm sm:text-xl mx-auto md:mx-0 "
                        onClick={() => {
                          navigate(`/post/${blogData[7]._id}`);
                        }}
                      >
                        {blogData[7].title.split(" ").slice(0, 10).join(" ")}...
                      </div>
                      <div className="mt-2 text-xs sm:text-sm text-white  ">
                        {blogData[7].content.split(" ").slice(0, 30).join(" ")}
                        ...
                      </div>
                    </div>
                  </div>
                  <div className=" flex  mb-2  items-center">
                    <div className="mt-[60px] mr-6">
                      <img
                        src={blogData[9].image}
                        alt=""
                        className=" rounded-xl h-[130px]  sm:h-[170px] object-cover sm:w-[350px]"
                      />
                      <div className="mt-3 md:mt-6  w-[30%] ">
                        <span
                          onClick={() => {
                            navigate(`${blogData[9].category}`);
                          }}
                          className="bg-gray-700 cursor-pointer rounded-xl text-xs    sm:text-sm py-1 px-2 text-white"
                        >
                          {blogData[9].category}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div
                        className="my-3 text-[white] cursor-pointer hover:text-orange-500 hover:underline text-sm sm:text-xl mx-auto md:mx-0 "
                        onClick={() => {
                          navigate(`/post/${blogData[9]._id}`);
                        }}
                      >
                        {blogData[9].title.split(" ").slice(0, 10).join(" ")}...
                      </div>
                      <div className="mt-2 text-xs sm:text-sm text-white  ">
                        {blogData[9].content.split(" ").slice(0, 30).join(" ")}
                        ...
                      </div>
                    </div>
                  </div>
                  <div className=" flex  mb-2  items-center">
                    <div className="mt-[60px] mr-6">
                      <img
                        src={blogData[11].image}
                        alt=""
                        className=" rounded-xl h-[130px]  sm:h-[170px] object-cover sm:w-[350px]"
                      />
                      <div className="mt-3 md:mt-6  w-[30%] ">
                        <span
                          onClick={() => {
                            navigate(`${blogData[11].category}`);
                          }}
                          className="bg-gray-700 cursor-pointer rounded-xl text-xs    sm:text-sm py-1 px-2 text-white"
                        >
                          {blogData[11].category}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div
                        className="my-3 text-[white] cursor-pointer hover:text-orange-500 hover:underline text-sm sm:text-xl mx-auto md:mx-0 "
                        onClick={() => {
                          navigate(`/post/${blogData[11]._id}`);
                        }}
                      >
                        {blogData[11].title.split(" ").slice(0, 10).join(" ")}
                        ...
                      </div>
                      <div className="mt-2 text-xs sm:text-sm text-white  ">
                        {blogData[11].content.split(" ").slice(0, 30).join(" ")}
                        ...
                      </div>
                    </div>
                  </div>
                  <div className=" flex  mb-2  items-center">
                    <div className="mt-[60px] mr-6">
                      <img
                        src={blogData[15].image}
                        alt=""
                        className=" rounded-xl h-[130px]  sm:h-[170px] object-cover sm:w-[350px]"
                      />
                      <div className="mt-3 md:mt-6  w-[30%] ">
                        <span
                          onClick={() => {
                            navigate(`${blogData[15].category}`);
                          }}
                          className="bg-gray-700 cursor-pointer rounded-xl text-xs    sm:text-sm py-1 px-2 text-white"
                        >
                          {blogData[15].category}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div
                        className="my-3 text-[white] cursor-pointer hover:text-orange-500 hover:underline text-sm sm:text-xl mx-auto md:mx-0 "
                        onClick={() => {
                          navigate(`/post/${blogData[15]._id}`);
                        }}
                      >
                        {blogData[15].title.split(" ").slice(0, 10).join(" ")}
                        ...
                      </div>
                      <div className="mt-2 text-xs sm:text-sm text-white  ">
                        {blogData[15].content.split(" ").slice(0, 30).join(" ")}
                        ...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky top-[60px] hidden md:flex w-[320px] h-[300px] rounded-xl   bg-[#ffffff1c]  ml-[40px]  mt-[150px] px-3  justify-center items-center flex-col shadow-inner ">
            <img src={logo} alt="" className="h-[70px] w-[100px] mt-[-20px]" />
            <div className=" text-2xl text-white ">Subscribe to Newsletter</div>

            <input
              type="text"
              className="py-2 mt-2 pl-3 w-[300px] placeholder:text-black rounded-xl border-black border-2"
              placeholder="Email"
            />
            <br />
            <button className="button-3 mt-[-10px]">Submit</button>
          </div>
        </div>
        <Footer></Footer>
      </div>
    )
  );
};

export default Home;
