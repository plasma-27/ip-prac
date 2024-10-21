import React from 'react';
import './App.css';
import Blog from './first/CareerBlog';
import Quiz from './second/quiz';
import BMI from './third/bmi';
import MOVIE from './fourth/movie';
import PHONE from './fifth/phone';
import SALARY from './sixth/salary';
import COURSE from './seventh/course';
import RECIPE from './eight/recipe';
import BILL from './nine/bill';
import INTEREST from './ten/interest';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CareerBlog from './first/CareerBlog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/blog" element={<CareerBlog />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/movie" element={<MOVIE />} />
        <Route path="/phone" element={<PHONE />} />
        <Route path="/salary" element={<SALARY />} />
        <Route path="/course" element={<COURSE />} />
        
        {/* Update recipe routes */}
        <Route path="/recipe" element={<RECIPE />} />
        <Route path="/recipes/:id" element={<RECIPE />} /> {/* For individual recipe */}

        <Route path="/bill" element={<BILL />} />
        <Route path="/interest" element={<INTEREST />} />
      </Routes>
    </Router>
  );
}

export default App;