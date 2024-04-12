import { useCallback, useEffect } from "react";

// 커스텀 이벤트 타입 정의
type SkipToEvent = CustomEvent<{ timePercentage: number }>;

const useSkipTo = () => {
  return useCallback((timePercentage: number) => {
    // "skipTo" 커스텀 이벤트를 발생시키고, timePercentage를 전달
    const event: SkipToEvent = new CustomEvent("skipTo", {
      detail: { timePercentage },
    });

    // window 객체에 이벤트 발생시킴
    window.dispatchEvent(event);
  }, []);
};

const useSkipToListener = (callback: (timePercentage: number) => void) => {
  // "skipTo" 이벤트 리스너 등록, timePercentage를 콜백 함수에 전달
  useEffect(() => {
    function listener(event: Event | SkipToEvent) {
      const customEvent = event as SkipToEvent;
      callback(customEvent.detail.timePercentage);
    }

    window.addEventListener("skipTo", listener);

    return () => {
      window.removeEventListener("skipTo", listener);
    };
  }, [callback]);
};

export { useSkipTo, useSkipToListener };
