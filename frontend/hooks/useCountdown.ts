import { useEffect, useState } from "react";

import { getReturnValues } from "../utils/constants";

const useCountdown = (targetDate: number): number[] => {
  const countDownDate = new Date(targetDate).getTime();
  // console.log(targetDate);

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  // console.log(getReturnValues(countDown));

  return getReturnValues(countDown);
};

export default useCountdown;
