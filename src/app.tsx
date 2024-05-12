import React, { useState } from "react";
import { BestPractices } from "./best-practices";
import "./app.css";
import { SeeMoreButton } from "./button";

export const App: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  const handleClick = (): void => {
    setShowMore(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          Welcome to Pluralsight Guided Code Lab{" "}
          <span role="img" aria-label="rocket">
            🚀
          </span>
        </h1>
        <p>React Testing with Jest and React Testing Library</p>
        <a
          className="App-link"
          href=" https://kentcdodds.com/blog/common-mistakes-with-react-testing-library"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Best Practices
        </a>
        <SeeMoreButton handleClick={handleClick} />
      </header>
      {showMore && <BestPractices />}
    </div>
  );
};
