import { useState, useEffect } from "react";
export function Timer() {
  const [timeSpend, setTimeSpend] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeSpend((prev) => prev + 1);
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="timer">You have used {timeSpend} seconds on this page!</div>
  );
}
