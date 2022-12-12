import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home.jsx";
import Detail from "./components/Detail/Detail.jsx";
import Form from "./components/Form/Form.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/videogame" element={<Form />} />
        <Route path="/videogame/:id" element={<Detail />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
