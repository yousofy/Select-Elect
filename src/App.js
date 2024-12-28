import { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { TbTruckLoading } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import './App.css';
import CardManager from './CardManager';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseDetails from './CourseDetails';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function App() {
  const [search, setSearch] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    // Populate unique department names based on fetched courses
    const uniqueDepts = Array.from(new Set(courses.map(course => course.dept)));
    setCourseDepts(uniqueDepts);

    // Populate unique first digits of course numbers based on fetched courses
    const uniqueNumbers = Array.from(new Set(courses.map(course => course.code.split(' ')[1][0]))).sort();
    setCourseNumbers(uniqueNumbers);
  }, [courses]);

  const handleSearchClick = async () => {
    try {
      setIsFiltering(true);
      setLoading(true);
      const response = await fetch(`${API_URL}/getAllCourses?search=${search}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsFiltering(false);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to SelectElect</h1>
      <div className='search-container'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for courses..."
          id="search-bar"
        />
        <a onClick={handleSearchClick} className='search-button'>
          <CiSearch style={{ cursor: 'pointer' }} className='search-icon' />
        </a>
      </div>
      {/* Other components */}
    </div>
  );
}

function MainApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/course-details/:dept/:course" element={<CourseDetails />} />
      </Routes>
    </Router>
  );
}

export default MainApp;
