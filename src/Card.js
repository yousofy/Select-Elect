import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

function Card({ course }) {
    const navigate = useNavigate();

    const handleClick = () => {
        // Pass the course details as state to the CourseDetails route
        navigate(`/course-details/${course.dept}/${course.code.split(' ')[1]}`, {
            state: {
                courseDescription: course.desc,
                prerequisites: course.prer,
                corequisites: course.creq,
                credits: course.cred,
                courseName: course.name,
            }
        });
    };

    return (
        <div className='course-card' onClick={handleClick}>
            <h3 className='course-code'><strong>{course.code}</strong></h3>
            <h4 className='course-name'>{course.name}</h4>
            <p className='course-description'>{course.desc}</p>
            <p className='pre-req'><strong>Pre-Requisite: </strong> {(course.prer == "" || course.prer == null) ? "None" : course.prer}</p>
            <p className='co-req'><strong>Co-Requisite: </strong> {course.creq.length > 0 ? course.creq.join(', ') : 'None'}</p>
            <p className='course-credits'><strong>Credits: </strong> {(course.cred == "" || course.cred == null) ? "None" : course.cred}</p>
        </div>
    )
}

export default Card;
