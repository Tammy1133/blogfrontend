import logo from "../utils/logo.png";

import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import { redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../redux/actions/UserActions";
import Axios from "axios";
import Toast from "react-bootstrap/Toast";

import { setUser } from "../redux/actions/useractions.js";

export const Login = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showA, setShowA] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 7000);
  }, [errorMessage]);

  const user = useSelector((state) => {
    return state.user.token;
  });

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      logUser();
    }
  };

  const logUser = async () => {
    setLoading(true);
    try {
      await Axios.post("http://localhost:3001/login", {
        username: username,
        password: password,
      }).then((data) => {
        dispatch(
          setUser({ username: data.data.username, token: data.data.token })
        );
        setLoading(false);
        navigate("/admin");
      });
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    !user && (
      <div className="bg-blue-200 min-h-[100vh]">
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
        <div>
          <div className=" bg-[#000000]  flex justify-center items-center w-screen py-1">
            <img
              onClick={() => {
                navigate("/");
              }}
              src={logo}
              alt=""
              className="w-[100px]"
            />
          </div>
        </div>
        <div className="relative loginpage overflow-x-hidden  fade-in-tl  ">
          <div className="relative z-30   flex justify-center  py-[60px] fade-in-bck1 overflow-x-hidden ">
            <div className="flex flex-col bg-opacity-10 bg-white justify-center items-center  rounded-b-2xl overflow-x-hidden">
              <div className="form-top bg-[black] flex py-3 pl-4  text-white text-xl rounded-t-xl items-center w-[350px] sm:w-[450px] lg:w-[600px]  overflow-x-hidden ">
                Admin Login
              </div>
              <div className="flex items-center justify-center inputs py-5 px-3 md:px-5  shadow-2xl rounded-b-2xl  w-[350px] sm:w-[450px]  lg:w-[600px] border-x-2 border-b-2 border-[black]">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3 ">
                    <Form.Group controlId="validationCustom01">
                      <Form.Label className="mb-2 text-base text-black ">
                        Username
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="mt-3  lg:ml-[85px] text-xl"
                      >
                        This field can't be empty
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      controlId="validationCustom01"
                      className="mt-4 "
                    >
                      <Form.Label className="mb-2 text-base text-black">
                        Password
                      </Form.Label>
                      <Form.Control
                        required
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="mt-3  lg:ml-[85px] text-xl"
                      ></Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <button type="submit" className="button-29 mydiv mb-3 ">
                    Login
                  </button>
                  <br />
                  <a
                    style={{ textDecoration: "none" }}
                    className="transition text-teal-800 pl-1 hover:text-[green] text-lg  mt-[50px] underline-offset-4 cursor-pointer font-bold"
                    onClick={() => {
                      navigate("/password-reset");
                    }}
                  >
                    Forgot Password
                  </a>
                </Form>
              </div>
            </div>
          </div>
          {errorMessage !== "" && (
            <div className="fixed z-50 top-[60px] right-0 bg-transparent text-white rounded-2xl shadow-2xl  fade-in-bck1  ">
              <Toast
                show={showA}
                style={{
                  // border: "2px solid blue",
                  // borderTopRightRadius: "50px",
                  marginLeft: "-10px",

                  // backgroundColor: "#ff00001c",

                  fontWeight: "800",
                }}
              >
                <Toast.Body className="rounded-t-lg bg-blue-500 uppercase pt-[60px]">
                  {errorMessage}
                </Toast.Body>
              </Toast>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Login;
