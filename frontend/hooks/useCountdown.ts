import { useEffect, useState } from "react";

import { getReturnValues } from "../utils/constants";
/**
 *
 * @param deadline - unix timestamp
 * @returns [days, hours, minutes, seconds, secondsLeft]
 */

const useCountdown = (deadline: number): number[] => {
  const timeLeft = deadline - new Date().getTime();

  const [countDown, setCountDown] = useState(timeLeft);

  // console.log(new Date(countDown));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(timeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  // console.log(getReturnValues(countDown));
  return getReturnValues(countDown);
};

export default useCountdown;
