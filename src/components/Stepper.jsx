import React from "react";
import { Progress } from "flowbite-react";
import { useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";

export default function Stepper() {
  const progress = useSelector((state) => state.step.progress);
  return (
    <div
      className="stepper-wrapper | rounded-tl-md rounded-tr-md lg:rounded-md w-full lg:w-auto fixed z-40 top-0 left-0 lg:relative"
      //   style={{
      //     display: animatedProgress === 100 ? "hidden" : "", // Set height to 0 when animatedProgress is 100
      //   }}
    >
      <div className="stepper |  gap-4 hidden">
        <div className="stepper-item | flex text-sm transition-colors duration-700">Step 1</div>
        <div className="stepper-item | flex text-sm transition-colors duration-700">Step 2</div>
        <div className="stepper-item | flex text-sm transition-colors duration-700">Step 3</div>
        <div className="stepper-item | flex text-sm transition-colors duration-700">Step 4</div>
        <div className="stepper-item | flex text-sm transition-colors duration-700">Step 5</div>
        <div className="stepper-item | flex text-sm transition-colors duration-700">Step 6</div>
      </div>
      <div className="progress-wrapper | flex flex-col gap-1 lg:flex-row">
        <div className="progress-bar | w-full">
          {/* <Progress progress={progress} size="sm" className="[&>div]:bg-violet-700" /> */}
          <ProgressBar className="[&>div]:bg-secondary" />
        </div>
        <div className="progress | text-gray-500 text-sm">
          {/* {animatedProgress.toFixed(0)}% complete */}
          {/* <div className="progress | text-gray-500 text-sm">{progress.toFixed(0)}% complete</div> */}
        </div>
      </div>
    </div>
  );
}
