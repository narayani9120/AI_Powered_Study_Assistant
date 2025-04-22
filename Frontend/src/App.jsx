import { useState } from "react";
import "./App.css";
import DashBoard from "./Compontents/DashBoard";
import GenerateContent from "./Compontents/GenerateContent";
import { Router, Routes, Route } from "react-router-dom";
import QuizSetting from "./Compontents/QuizSetting";
import PopContent from "./Compontents/PopContent";
import SignupForm from "./Compontents/SignupForm";
import LoginForm from "./Compontents/LoginForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/generate/:type" element={<GenerateContent />} />
          <Route path="/PopContent/:type" element={<PopContent />} />
          <Route path="/QuizSetting" element={<QuizSetting />} />
          <Route path='/signup' element={<SignupForm/>} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
     
    </>
  );
}

export default App;
