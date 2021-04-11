import React, { useEffect, useState } from "react";

function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time + 1);
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <div>
        <h2 className="timer">You Have Used {time} Seconds</h2>
      </div>
    </>
  );
}

export default Timer;
