import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  name: string;
}

interface ContentProps {
  parts: Array<CoursePart>;
}

interface PartProps {
  part: CoursePart;
}

  interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

const Header: React.FC<HeaderProps> = ({ name }) => {
  return <h1>{name}</h1>;
};

const assertNever = (value: never): never => { throw new Error('Something went wrong') }

const Part: React.FC<PartProps> = ({ part }) => {
    switch (part.name) {
      case "Fundamentals":
        return <p>{part.name} {part.description} {part.exerciseCount}</p>
      case "Using props to pass data":
        return <p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>
      case "Deeper type usage":
        return <p>{part.name} {part.description} {part.exerciseCount} {part.exerciseSubmissionLink}</p>
    }
    return assertNever(part);
};

const Content: React.FC<ContentProps> = ({ parts }) => {
  return (
    <div>
      {
        parts.map((part) =>
          <Part part={part} />
        )
      }
    </div>
  );
};

const Total: React.FC<ContentProps> = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>)
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";


  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));