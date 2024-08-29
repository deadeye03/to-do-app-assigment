"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
const ProgressProvider = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#000000"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressProvider;