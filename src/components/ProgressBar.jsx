import React from "react";
import { useSelector } from "react-redux";

export default function ProgressBar({ className = "" }) {
  const progress = useSelector((state) => state.step.progress);

  return (
    <div className="w-full h-4 rounded-md overflow-hidden">
      <div
        className="h-full bg-secondary transition-all duration-700 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
