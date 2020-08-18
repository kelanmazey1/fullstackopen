import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  name: string;
}

interface ContentProps {
  parts: Array<{name: string, exerciseCount: number}>;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content: React.FC<ContentProps> = ({ parts }) => {
  return (
    <div>
      {
        parts.map((part) =>
          <p key={part.name}>{part.name} {part.exerciseCount}</p>
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
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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