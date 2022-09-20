import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/App.css";
import About from "./pages/About";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import ITask from "./ITask";
import TaskService from "./TaskService";

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const updateTasks = () => {
    TaskService.getAllTasks()
      .then((response) => {
        setTasks(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    updateTasks();
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home selectedMenuButton="LIST" />}></Route>

          <Route
            path="/done"
            element={<Home selectedMenuButton="DONE" />}
          ></Route>

          <Route
            path="/trash"
            element={<Home selectedMenuButton="TRASH" />}
          ></Route>

          <Route path="/about" element={<About />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
