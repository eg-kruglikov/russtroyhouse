import { useRef } from "react";
import { ymNotBounce } from "../utils/metrika";

export const useNotBounceOnce = () => {
  const sentRef = useRef(false);

  return () => {
    if (sentRef.current) {
      return;
    }

    ymNotBounce();
    sentRef.current = true;
  };
};
