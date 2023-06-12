import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../utils/logo.png";
import { removeUser } from "../redux/actions/useractions";
import heroimage from "../utils/hero-bg.jpg";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const Admin = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalData, setModalData] = useState({});
  const [edit, setEdit] = useState(false);
  const [base64code, setBase64code] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => {
    return state?.user?.token;
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const data = await Axios.get(
        "https://blogbackend2.onrender.com/allposts"
      );
      setAllPosts(data.data.reverse());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    console.log(base64code);
  }, [base64code]);
  const onChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    getbase64(file);
  };

  const onLoad = (fileString) => {
    setBase64code(fileString);
    setImage(fileString);
  };

  const getbase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };
  const dispatch = useDispatch();
  const [showAllPosts, setShowAllPosts] = useState(true);
  const [showAddNewPost, setShowAddNewPost] = useState(false);

  const [id, setID] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("others");
  const [best, setBest] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    token: user,
  };

  const handleEdit = async () => {
    try {
      setLoading(true);
      console.log(user);
      console.log(id);
      console.log(headers.token);
      await Axios.put(
        "https://blogbackend2.onrender.com/editpost",

        {
          _id: id,
          image,
          title,
          content,
          best,
        },
        { headers }
      );

      console.log("Successful");
      setAllPosts(
        allPosts.map((item) => {
          if (item._id === id) {
            return {
              ...item,
              title: title,
              content: content,
              image: image,
              best: best,
            };
          }
          return item;
        })
      );
      setShow(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error");
    }
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      await Axios.delete(`https://blogbackend2.onrender.com/deletepost/${id}`);

      console.log("Successful");
      const newData = allPosts.filter((item) => item._id !== id);
      setAllPosts(newData);
      setShow(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    console.log(category);

    try {
      setLoading(true);
      await Axios.post(`https://blogbackend2.onrender.com/addpost`, {
        image: base64code,
        title,
        content,
        category,
        best: best === "true" ? true : false,
      });
      setBest(false);
      setTitle("");
      setContent("");
      setCategory("others");
      setImage("");
      console.log("successful");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    user && (
      <div>
        {loading && (
          <div className="fixed top-0 h-[100vh] w-screen z-[1000px] overflow-x-hidden bg-[#00000064] bg-cover flex justify-center items-center">
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
        <div className=" bg-[#000000]  flex justify-between items-center w-screen py-3">
          <img
            onClick={() => {
              navigate("/");
            }}
            src={logo}
            alt=""
            className="w-[100px] cursor-pointer"
          />

          <div>
            <button
              onClick={() => {
                getAllPosts();
                setEdit(false);
                setShowAllPosts(true);

                setShowAddNewPost(false);
              }}
              className="text-white fs-5 pe-4"
              style={{ textDecoration: "none" }}
            >
              All Posts
            </button>
            <button
              onClick={() => {
                setShowAllPosts(false);
                setShowAddNewPost(true);
                setBest(false);
                setTitle("");
                setContent("");
                setCategory("others");
                setImage("");
              }}
              className="text-white fs-5 pe-4"
              style={{ textDecoration: "none" }}
            >
              Add New Post
            </button>
            <button
              className="button-29 mr-[40px]"
              onClick={() => {
                dispatch(removeUser());
                navigate("/login");
              }}
            >
              LOGOUT
            </button>
          </div>
        </div>

        {showAllPosts && (
          <div className="mt-8 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-center ">
              {allPosts.map((item) => {
                return (
                  <div className="w-[300px]  tobeincreasedonlg sm:w-[290px] mx-auto md:w-[350px] lg:w-[300px] mb-[60px] flex flex-col items-center justify-center md:justify-start md:items-start ">
                    <img
                      src={item.image}
                      alt=""
                      className=" rounded-xl w-[300px] tobeincreasedonlg sm:w-[290px] md:w-[350px] lg:w-[300px] h-[250px]  object-cover"
                    />
                    <div className="mt-3 md:mt-6  w-[30%]">
                      <span
                        onClick={() => {
                          navigate(`${item.category}`);
                        }}
                        className="bg-gray-700 cursor-pointer rounded-xl  text-sm py-1 px-2 text-white"
                      >
                        {item.category}
                      </span>
                    </div>
                    <div
                      className="my-3 text-[black] cursor-pointer hover:text-orange-500 hover:underline text-2xl mx-auto md:mx-0 text-center-on-sm"
                      onClick={() => {
                        setModalData(item);
                        setContent(item.content);
                        setImage(item.image);
                        console.log(item.image);
                        setTitle(item.title);
                        setBest(item.best);
                        setID(item._id);
                        setTimeout(() => {
                          setShow(true);
                        }, 200);
                      }}
                    >
                      {item.title.split(" ").slice(0, 10).join(" ")}...
                    </div>
                    <div className="mt-2 text-base text-[black] text-center-on-sm addmlonlg">
                      {item.content.split(" ").slice(0, 30).join(" ")}...
                    </div>
                  </div>
                );
              })}
            </div>

            <Modal show={show} onHide={handleClose}>
              {/* <Modal.Title>{modalData.title}</Modal.Title> */}
              <br />
              {edit ? (
                <div className="flex flex-col justify-center items-center px-2">
                  <img src={image} alt="" className="h-[200px]  my-2" />
                  <input
                    type="file"
                    className="mb-3 py-2 px-1 bg-black text-white"
                    placeholder="Change Image"
                    onChange={onChange}
                    required
                  />

                  <textarea
                    cols="20"
                    rows="2"
                    type="text"
                    className="text-xl border-2 border-slate-500 text-red-600 w-[100%] h-[100%] box-border p-2"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center px-2">
                  <img src={image} alt="" className="h-[200px]  mb-5" />
                  <textarea
                    cols="20"
                    rows="2"
                    type="text"
                    className="text-xl w-[100%] h-[100%] box-border p-2"
                    disabled
                    value={title}
                  />
                </div>
              )}

              <Modal.Body>
                {edit ? (
                  <textarea
                    cols="30"
                    rows="10"
                    type="text"
                    className="text-red-600 text-xl border-2 border-slate-500 w-[100%] h-[100%] box-border p-2"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  />
                ) : (
                  <textarea
                    cols="30"
                    rows="10"
                    type="text"
                    className="text-xl   w-[100%] h-[100%] box-border p-2"
                    disabled
                    value={content}
                  />
                )}
              </Modal.Body>
              <div className="flex justify-center my-3 items-center mt-4">
                <h3 className="mr-3 pt-2">Is Post best</h3>
                {best ? (
                  <button
                    onClick={() => {
                      setBest(!best);
                    }}
                    className="bg-red-400 px-2 py-1 rounded text-xl text-white"
                  >
                    True
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setBest(!best);
                    }}
                    className="bg-green-400 px-2 py-1 rounded text-xl text-white"
                  >
                    False
                  </button>
                )}
              </div>
              <Modal.Footer>
                <Button
                  variant="success"
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  Edit
                </Button>

                {edit && (
                  <Button
                    variant="warning"
                    onClick={() => {
                      console.log(title, content);
                      handleEdit();
                    }}
                  >
                    Save
                  </Button>
                )}
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleClose();
                    setEdit(false);
                  }}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
        {showAddNewPost && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex justify-between items-center mt-3">
              <h3 className="mt-4 ml-5">Add new Post</h3>
              <button type="submit" className="button-29 mr-[40px]">
                Submit
              </button>
            </div>
            <div className="mx-6 flex justify-evenly ">
              <div className="">
                <div className="mt-5">
                  <input
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    placeholder="Post Title"
                    id="title"
                    name="title"
                    type="text"
                    className="placeholder:text-[orangered] border-2 rounded-md py-2 pl-2 w-[500px] ml-5 border-[orangered]"
                  />
                </div>
                <div className="mt-5 flex items-center">
                  <textarea
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    placeholder="Post Content"
                    name="content"
                    id="content"
                    cols="30"
                    rows="10"
                    required
                    className="placeholder:text-[orangered] border-2 rounded-md py-2 pl-2 w-[500px] ml-5 border-[orangered]"
                  ></textarea>
                </div>
              </div>
              <div>
                <div>
                  <div className="mt-5">
                    <label htmlFor="category" className="text-2xl">
                      Category
                    </label>
                    <select
                      required
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                      name="category"
                      id="category"
                      className="ml-5 border-[orangered] rounded px-4 border-2"
                    >
                      <option value="Others">Others</option>
                      <option value="Politics">Politics</option>

                      <option value="Music">Music</option>
                      <option value="Romance">Romance</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="mt-5">
                    <label htmlFor="category" className="text-2xl">
                      Best
                    </label>
                    <select
                      required
                      value={best}
                      onChange={(e) => {
                        setBest(e.target.value);
                      }}
                      name="best"
                      id="best"
                      className="ml-5 border-[orangered] rounded px-4 border-2"
                    >
                      <option value="false">False</option>
                      <option value="true">True</option>
                    </select>
                  </div>

                  <div className="mt-5">
                    <input
                      type="file"
                      className="mb-3 py-2 px-1 bg-black text-white"
                      placeholder="Change Image"
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    )
  );
};
