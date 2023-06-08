import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../subcomponents/navbar";
import { Footer } from "../subcomponents/footer";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import heroimg from "../utils/hero-bg.jpg";

export const EachSection = () => {
  const [pageData, setPageData] = useState([]);
  const [tobepageData, setToBePageData] = useState([]);

  const params = useParams();
  const [blogData, setblogdata] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(6);
  const [loading, setLoading] = useState(false);

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const data = await Axios.get("http://localhost:3001/allposts");
      setblogdata(data.data.reverse());

      setPageData(
        data.data.filter(
          (item) => item.category.toUpperCase() === params.name.toUpperCase()
        )
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(params.name);
  const getPageData = () => {
    if (pageData.length > tobepageData.length) {
      console.log(start);
      setToBePageData([...tobepageData, ...pageData.slice(start, end)]);
    }
    console.log(tobepageData);
  };
  useEffect(() => {
    setToBePageData([]);
    getAllPosts();
    console.log("params changed");

    setStart(0);
    setEnd(6);
  }, [params.name]);

  useEffect(() => {
    getPageData();
    console.log(pageData);
    console.log("Changed");
  }, [pageData]);
  useEffect(() => {
    getPageData();
  }, [end]);

  const navigate = useNavigate();

  return loading ? (
    <div className="flex justify-center items-center h-screen bg-black">
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
    tobepageData.length > 0 && (
      <div className="bg-black">
        <Navbar></Navbar>

        <div className="mt-5 text-center uppercase text-white">
          <h5 className="text-xl md:text-3xl ">
            {params.name} <span className="text-orange-500">Section</span>
          </h5>
          <div className="mt-5 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center">
              {tobepageData.map((item) => {
                return (
                  <div className="w-[300px]  tobeincreasedonlg sm:w-[290px] mx-auto md:w-[350px] lg:w-[300px] mb-[60px] flex flex-col items-center justify-center md:justify-start md:items-start ">
                    <img
                      src={item.image}
                      alt=""
                      className="hover:scale-105 transition-transform  rounded-xl w-[300px] tobeincreasedonlg sm:w-[290px] md:w-[350px] lg:w-[300px] h-[250px]  object-cover"
                    />
                    <div className="mt-3 md:mt-6  w-[30%] ">
                      <span
                        onClick={() => {
                          // window.open(`${item.category}`, "_blank");
                          navigate(`${item.category}`);
                        }}
                        className="cursor-pointer bg-gray-700 rounded-xl  text-sm py-1 px-2 text-white"
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

        <div className="mt-2">
          {pageData.length > tobepageData.length && (
            <h3
              onClick={() => {
                setStart(start + 6);

                setEnd(end + 6);
              }}
              className="text-center text-2xl text-white my-5 font-bold cursor-pointer"
            >
              Load More
            </h3>
          )}
        </div>
        <Footer></Footer>
      </div>
    )
  );
};
