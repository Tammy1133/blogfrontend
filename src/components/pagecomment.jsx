import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageactions } from "../redux/actions/pageactions";
import Axios from "axios";
// import { editcomment } from "../../../server/controllers/blogcontroller";

export const PageComment = (props) => {
  console.log(props);
  const [loading, setLoading] = useState(false);
  const [showedit, setshowedit] = useState(false);
  const [showdelete, setshowdelete] = useState(false);
  const [comments, setComments] = useState(props.item.comments);
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState("");

  const commentsr = useSelector((state) => {
    return state.comment.comment;
  });
  useEffect(() => {
    if (commentsr.password !== "") {
      setPassword(commentsr.password);
    }
  }, [comments]);

  useEffect(() => {
    setTimeout(() => {
      setShowError("");
    }, 4000);
  }, [showError]);

  const pagedatafromredux = useSelector((state) => {
    return state.pagedata.pagedata;
  });
  const dispatch = useDispatch();
  console.log(props._id);

  const deleteComment = async (id) => {
    console.log(props);
    try {
      setLoading(true);
      const newData = pagedatafromredux.comments.filter((item) => {
        return item.id !== id;
      });
      console.log("password", "is", password);
      await Axios.put("https://blogbackend2.onrender.com/editcomment", {
        _id: props._id,
        id: id,
        comment: newData,
        password: password,
      });

      const pagedata = { ...pagedatafromredux, comments: newData };
      dispatch(pageactions(pagedata));
      setLoading(false);
      setShowError("Done");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setShowError("Incorrect Password");
    }
  };
  const editComment = async (id) => {
    try {
      setLoading(true);
      const newData = pagedatafromredux.comments.map((item) => {
        if (item.id === id) {
          return { ...item, comments: comments };
        } else {
          return item;
        }
      });
      console.log(newData);
      await Axios.put("https://blogbackend2.onrender.com/editcomment", {
        _id: props._id,
        id: id,
        password: password,
        comment: newData,
      });

      const pagedata = { ...pagedatafromredux, comments: newData };
      dispatch(pageactions(pagedata));
      setLoading(false);
      setShowError("Done");
    } catch (error) {
      setLoading(false);
      setShowError("Incorrect Password");
      console.log(error);
    }
  };

  return (
    <div>
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
      <div className="mt-7">
        <h5 className="text-[orangered] mb-1">Name: {props.item.name}</h5>
        <h5 className="text-[] mb-4">{props.item.comments}</h5>

        <div className="flex">
          <button
            onClick={() => {
              setshowedit(!showedit);
              setshowdelete(false);
            }}
            className="flex bg-white py-1 px-2 text-black rounded-md justify-center items-center mr-6"
          >
            <i className="bi bi-pen-fill text-sm mr-2"></i>
            Edit
          </button>
          <button
            onClick={() => {
              setshowdelete(!showdelete);
              setshowedit(false);
            }}
            className="flex justify-center items-center  bg-[red] text-black py-1 rounded-md px-2"
          >
            <i className="bi bi-basket text-xl mr-3 text-[white]"></i>
            Delete
          </button>
        </div>
        {showedit && (
          <div>
            <input
              type="email"
              value={comments}
              onChange={(e) => {
                setComments(e.target.value);
              }}
              className=" scale-in-hor-center text-[20px] text-black w-[70vw] p-2 mt-4 rounded-xl"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="placeholder:text-black text-[20px] text-black w-[70vw] p-2 mt-4 rounded-xl"
            />
            <button
              onClick={() => {
                setshowedit(true);
                editComment(props.item.id);
              }}
              className="mt-4 flex bg-[green] py-1 px-2 text-white rounded-md justify-center items-center mr-6"
            >
              <i className="bi bi-pen-fill text-sm mr-2"></i>
              Save
            </button>
          </div>
        )}

        {showdelete && (
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className=" scale-in-hor-center placeholder:text-black text-[20px] text-black w-[70vw] p-2 mt-4 rounded-xl"
            />
            <button
              onClick={() => {
                setshowedit(false);
                deleteComment(props.item.id);
              }}
              className=" scale-in-hor-center mt-4 flex bg-[green] py-1 px-2 text-white rounded-md justify-center items-center mr-6"
            >
              <i className="bi bi-pen-fill text-sm mr-2"></i>
              Delete
            </button>
          </div>
        )}

        {showError !== "" && (
          <div>
            <div className="border-2 border-orange-600 rounded-md border-dotted p-3 fixed top-[30px] right-[20px]">
              {" "}
              {showError}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
