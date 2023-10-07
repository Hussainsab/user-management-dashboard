import { useEffect, useState } from "react";

// This is a custome hook i have created so i can get the current window width
//so i can perfom UI operation accordingly
const useWindowDiamention = () => {
  const [width, setWidth] = useState(window.innerWidth);

  function updateWidth() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return width;
};

export default useWindowDiamention;
