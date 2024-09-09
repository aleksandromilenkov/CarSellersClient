import { useCallback, useEffect, useRef } from "react";

type UseOutsideClickProps = {
  close: () => void;
  listenCapturingPhase?: boolean;
};

const useOutsideClick = ({ close, listenCapturingPhase = true }: UseOutsideClickProps) => {
  const ref = useRef<HTMLElement>(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (typeof close === "function") {
          close();
        } else {
          console.error("Close function is undefined");
        }
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick, listenCapturingPhase);
    return () => {
      document.removeEventListener("click", handleClick, listenCapturingPhase);
    };
  }, [handleClick, listenCapturingPhase]);

  return ref;
};

export default useOutsideClick;
