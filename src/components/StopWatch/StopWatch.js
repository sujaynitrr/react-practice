import React, { useEffect, useState, useRef } from "react";

const StopWatch = () => {
  const intervalRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0); // time in milliseconds

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10); // increment by 10ms
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startHandler = () => setIsRunning(true);
  const stopHandler = () => setIsRunning(false);
  const resetHandler = () => {
    setIsRunning(false);
    setTime(0);
  };

  
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10); 

    const pad = (num, size = 2) => num.toString().padStart(size, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Stop Watch</h1>
      <h2>{formatTime(time)}</h2>
      <div>
        <button onClick={startHandler}>Start</button>
        <button onClick={stopHandler}>Stop</button>
        <button onClick={resetHandler}>Reset</button>
      </div>
    </div>
  );
};

export default StopWatch;
