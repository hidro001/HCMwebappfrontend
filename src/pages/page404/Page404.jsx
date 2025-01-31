import  { useState, useEffect } from "react";

const NotFoundPage = () => {
  const [torchPosition, setTorchPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setTorchPosition({
        top: event.clientY,
        left: event.clientX,
      });
    };

    // Add mousemove event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Embedded CSS */}
      <style jsx>{`
        html,
        body {
          height: 100%;
          margin: 0;
          padding: 0;
        }

        .not-found-container {
          height: 100vh;
          background: url("https://wallpapercave.com/wp/6SLzBEY.jpg") no-repeat
            left top;
          background-size: cover;
          overflow: hidden;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .text h1 {
          color: #011718;
          margin-top: -200px;
          font-size: 15em;
          text-align: center;
          text-shadow: -5px 5px 0px rgba(0, 0, 0, 0.7),
            -10px 10px 0px rgba(0, 0, 0, 0.4), -15px 15px 0px rgba(0, 0, 0, 0.2);
          font-family: monospace;
          font-weight: bold;
        }

        .text h2 {
          color: black;
          font-size: 5em;
          text-shadow: -5px 5px 0px rgba(0, 0, 0, 0.7);
          text-align: center;
          margin-top: -150px;
          font-family: monospace;
          font-weight: bold;
        }

        .text h3 {
          color: white;
          margin-left: 30px;
          font-size: 2em;
          text-shadow: -5px 5px 0px rgba(0, 0, 0, 0.7);
          margin-top: -40px;
          font-family: monospace;
          font-weight: bold;
        }

        .torch {
          width: 200px;
          height: 200px;
          box-shadow: 0 0 0 9999em #000000f7;
          opacity: 1;
          border-radius: 50%;
          position: fixed;
          background: rgba(0, 0, 0, 0.3);
          pointer-events: none; /* Allows mouse events to pass through */
          transform: translate(
            -50%,
            -50%
          ); /* Centers the torch based on top and left */
          transition: top 0.1s ease, left 0.1s ease; /* Smooth movement */
        }

        .torch::after {
          content: "";
          display: block;
          border-radius: 50%;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          box-shadow: inset 0 0 40px 2px #000,
            0 0 20px 4px rgba(13, 13, 10, 0.2);
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .text h1 {
            font-size: 8em;
            margin-top: -100px;
          }

          .text h2 {
            font-size: 3em;
            margin-top: -100px;
          }

          .text h3 {
            font-size: 1.5em;
            margin-top: -20px;
          }

          .torch {
            width: 150px;
            height: 150px;
          }
        }
      `}</style>

      {/* Main Container */}
      <div className="not-found-container">
        {/* Text Content */}
        <div className="text">
          <h1>404</h1>
          <h2>Uh, Ohh</h2>
          <h3>
            Sorry we can't find what you're looking for because it's so dark in
            here
          </h3>
        </div>

        {/* Torch Element */}
        <div
          className="torch"
          style={{
            top: `${torchPosition.top}px`,
            left: `${torchPosition.left}px`,
          }}
        ></div>
      </div>
    </>
  );
};

export default NotFoundPage;
