import { useState, useEffect } from "react";

export default function Time () {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 100);
    return () => clearInterval(interval);
    }, []);

    const hora = `${time.getHours()}:${('0' + time.getMinutes()).slice(-2)}`;
  return (
    <p className="mt-2 me-2">{hora}</p>
  )
}
