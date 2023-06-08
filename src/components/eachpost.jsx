import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogData } from "../utils/blogdata";
import { Navbar } from "../subcomponents/navbar";
import heroimg from "../utils/hero-bg.jpg";
import { Footer } from "../subcomponents/footer";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pageactions } from "../redux/actions/pageactions";
import { setComments } from "../redux/actions/blogactions";
import { PageComment } from "./pagecomment";

export const EachPost = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState([]);
  const [pageData2, setPageData2] = useState([]);
  const [allposts, setAllPosts] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showedit, setshowedit] = useState(false);
  const comments = useSelector((state) => {
    return state.comment.comment;
  });
  useEffect(() => {
    if (comments.name !== "") {
      setName(comments.name);
    }
    if (comments.password !== "") {
      setPassword(comments.password);
    }
  }, [comments]);

  const location = useLocation();

  const getAllPosts = async () => {
    try {
      const data = await Axios.get("http://localhost:3001/allposts");
      setAllPosts(data.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(params.id);

    const data2 = allposts.find((item) => {
      return item._id === params.id;
    });

    console.log(data2);

    setPageData(data2);

    dispatch(pageactions(data2));

    // console.log(allposts);
    // console.log(pageData);
  }, [allposts]);

  const pagedatafromredux = useSelector((state) => {
    return state.pagedata.pagedata;
  });

  useEffect(() => {
    const data = allposts.filter((item) => {
      return item.category === pageData.category;
    });
    setPageData2(data.filter((item) => item._id !== pageData._id));
  }, [pageData]);

  return pagedatafromredux?._id ? (
    <div className="">
      <div className="bg-black">
        <Navbar></Navbar>
      </div>
      {loading && (
        <div className="fixed top-0    h-[100vh] w-screen z-50 overflow-x-hidden bg-[#00000064] bg-cover flex justify-center items-center">
          <svg
            class="pl overflow-x-hidden"
            viewBox="0 0 200 200"
            width="200"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                <stop offset="100%" stop-color="hsl(223,90%,55%)" />
              </linearGradient>
              <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                <stop offset="100%" stop-color="hsl(223,90%,55%)" />
              </linearGradient>
            </defs>
            <circle
              class="pl__ring"
              cx="100"
              cy="100"
              r="82"
              fill="none"
              stroke="url(#pl-grad1)"
              stroke-width="36"
              stroke-dasharray="0 257 1 257"
              stroke-dashoffset="0.01"
              stroke-linecap="round"
              transform="rotate(-90,100,100)"
            />
            <line
              class="pl__ball"
              stroke="url(#pl-grad2)"
              x1="100"
              y1="18"
              x2="100.01"
              y2="182"
              stroke-width="36"
              stroke-dasharray="1 165"
              stroke-linecap="round"
            />
          </svg>
        </div>
      )}
      <div className="pt-6 flex flex-col justify-around px-[40px] items-center bg-[#000000e7]">
        <div className="text-xl sm:text-3xl leading-[30px] sm:leading-[50px] pr-5 text-white font-semibold">
          {pagedatafromredux?.title}
        </div>
        <img
          src={pagedatafromredux.image}
          className="h-[400px] w-[300px] sm:w-[400px] md:w-[600px] lg:w-[350px] mt-[60px] rounded-xl object-cover"
          alt=""
        />
      </div>
      <div className="pb-[60px] pt-[70px] bg-[#000000e7] text-white text-lg sm:text-2xl px-5">
        {pagedatafromredux?.content}
      </div>

      <div className="bg-[#000000e7] py-4">
        <div className="h-[1px] bg-white w-[95%] mx-auto mb-3"></div>
        <div className="text-white ml-6 text-xl pb-5">
          <span className="font-bold">Comments</span>

          {pagedatafromredux.comments.length === 0 ? (
            <div className=" text-center text-xs mt-6">
              There are not comments yet <br /> be the first to add a comment
            </div>
          ) : (
            <div>
              {pagedatafromredux.comments.map((item) => {
                return (
                  <PageComment
                    item={item}
                    _id={pagedatafromredux._id}
                  ></PageComment>
                );
              })}
            </div>
          )}
        </div>

        <div className="font-bold ml-6 text-xl text-white">Add New Comment</div>

        <form
          className="ml-6"
          onSubmit={async (e) => {
            e.preventDefault();

            let time = Date.now() + pagedatafromredux._id;

            try {
              setLoading(true);
              await Axios.put("http://localhost:3001/addcomment", {
                _id: pagedatafromredux._id,
                name: name,
                password: password,
                comments: comment,
                myid: time,
              });

              setName("");
              setPassword("");
              setComment("");
              setLoading(false);

              if (name !== "" && password !== "") {
                dispatch(setComments({ name: name, password: password }));
              } else {
                dispatch(
                  setComments({ name: comments.name, password: password })
                );
              }

              console.log("Successful");
              {
                dispatch(
                  pageactions({
                    ...pagedatafromredux,
                    comments: [
                      ...pagedatafromredux.comments,
                      {
                        id: time,
                        name: name || "Anonymous",
                        password: password,
                        comments: comment,
                      },
                    ],
                  })
                );
              }
              // setAllPosts(data.data.reverse());
            } catch (error) {
              setLoading(false);
              console.log(error);
            }
          }}
        >
          <input
            type="text"
            className="w-[70vw] mt-5 rounded-xl p-2 placeholder:text-black focus:border-2 focus:border-[orangered]"
            placeholder="Full name or leave empty to post Anonymously"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            className="w-[70vw] mt-5 rounded-xl p-2 placeholder:text-black focus:border-2 focus:border-[orangered]"
            placeholder="Enter password to enable editing"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <textarea
            type="text"
            className="w-[70vw] rounded-xl  mt-5 px-2 pt-2 pb-40 placeholder:text-black focus:border-2 focus:border-[orangered]"
            placeholder="Enter comment here"
            value={comment}
            required
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <br />
          <button className="button-29 mt-3">Submit</button>
        </form>
      </div>
      <div className="bg-[#000000e7]">
        <div className="h-[1px] bg-white w-[95%] mx-auto mb-3"></div>
        <div className="text-white ml-6 text-xl pb-5">
          You may <span className="font-bold">also</span> like
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center ">
          {pageData2.slice(0, 5).map((item) => {
            return (
              <div className="w-[300px]  tobeincreasedonlg sm:w-[290px] mx-auto md:w-[350px] lg:w-[300px] mb-[60px] flex flex-col items-center justify-center md:justify-start md:items-start ">
                <img
                  src={item.image}
                  alt=""
                  className=" rounded-xl w-[300px] tobeincreasedonlg sm:w-[290px] md:w-[350px] lg:w-[300px] h-[250px]  object-cover"
                />
                <div className="mt-3 md:mt-6  w-[30%] ">
                  <span
                    onClick={() => {
                      // navigate(`${item.category}`);
                      window.open(`${item.category}`, "_blank");
                    }}
                    className="bg-gray-700 cursor-pointer rounded-xl  text-sm py-1 px-2 text-white"
                  >
                    {item.category}
                  </span>
                </div>
                <div
                  className="my-3 text-[white] cursor-pointer hover:text-orange-500 hover:underline text-2xl mx-auto md:mx-0 text-center-on-sm"
                  onClick={() => {
                    // navigate(`/post/${item.id}`);
                    window.open(`/post/${item.id}`, "_blank");
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
      <div className="bg-black">
        <Footer></Footer>
      </div>
    </div>
  ) : (
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
  );
};
