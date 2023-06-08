import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import "./css/main.css";
import { setQuestions } from "./redux/actions/questionActions";
import { EachSection } from "./components/eachsection";
import { EachPost } from "./components/eachpost";
import { Login } from "./components/login";
import { Admin } from "./components/admin";

const Home = React.lazy(() => import("./components/home"));

function App() {
  const [showTotop, setShowTotop] = useState(false);

  const getscroll = () => {
    if (window.scrollY >= 150) {
      setShowTotop(true);
    } else {
      setShowTotop(false);
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", getscroll);
  }
  const dispatch = useDispatch();
  const [loading, setLoading] = useState("");

  return loading ? (
    <div className="h-screen flex justify-center items-center">
      <div class="spinner-border text-green-400" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <div>
      <Suspense
        fallback={
          <div>
            <div class="center">
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
            </div>
          </div>
        }
      >
        <Routes>
          <Route element={<Home></Home>} path="/"></Route>
          <Route element={<EachSection></EachSection>} path="/:name"></Route>
          <Route element={<EachPost></EachPost>} path="/post/:id"></Route>
          <Route element={<Login></Login>} path="/login"></Route>
          <Route element={<Admin></Admin>} path="/admin"></Route>
        </Routes>
      </Suspense>
      {showTotop && (
        <a href="#">
          <div className="back1">
            <div className="back">
              <span>
                <i class="bi bi-arrow-up backtotoparrow text-xl mt-1"></i>
              </span>
            </div>
          </div>
        </a>
      )}
    </div>
  );
}

export default App;
