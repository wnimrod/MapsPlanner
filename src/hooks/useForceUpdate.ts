import { useState } from "react";

export const useForceUpdate = () => {
  const [, setCount] = useState(0);
  return () => setCount((count) => count + 1);
};
