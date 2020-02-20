import React from 'react';
import Course from './components/course'

const App= (props) => {
  const {courses} = props

  const courseRender = () => courses.map(course => <Course key={course.id} course={course}/>)

  return (
    <div>
      {courseRender()}
    </div>
  );
}

export default App;
