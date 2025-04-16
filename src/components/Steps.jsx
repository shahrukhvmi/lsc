import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Stepone from "./formsteps/Stepone";
import Steptwo from "./formsteps/Steptwo";
import Stepthree from "./formsteps/Stepthree";
import Stepfour from "./formsteps/Stepfour";
import Stepfive from "./formsteps/Stepfive";
import Stepsix from "./formsteps/Stepsix";
import Stepseven from "./formsteps/Stepseven";
import Stepeight from "./formsteps/Stepeight";
import Stepper from "./Stepper";
import Footer from "./Footer";
import ApplicationLogo from "../config/ApplicationLogo";

const Steps = () => {
  // const [hideSidebar, setHideSidebar] = useState(false);
  // const [searchParams] = useSearchParams();
  // const navigate = useNavigate();

  // const paymentLoading = useSelector((state) => state.paymentLoader.loading);

  // const productId = searchParams.get("product_id");

  // useEffect(() => {
  //   if (!productId) {
  //     // Redirect to home or product list if product_id is missing
  //     navigate("/consultation-form/", { replace: true });
  //   }
  // }, [productId, navigate]);

  const currentStep = useSelector((state) => state.step?.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Stepone />;
      case 2:
        return <Steptwo />;
      case 3:
        return <Stepthree />;
      case 4:
        return <Stepfour />;
      case 5:
        return <Stepfive />;
      case 6:
        return <Stepsix />;
      case 7:
        return <Stepseven />;
      case 8:
        return <Stepeight />;
      default:
        return <Stepone />;
    }
  };


  return (
    <>
      <div className={`bg-gradient-to-r from-[#e0f5fc] via-[#F3F6F2] to-[#FFF7ED] `}>
        <div className="consultation-form w-full max-w-[1366px] mx-auto flex flex-col lg:flex-row font-inter overflow-hidden min-h-screen justify-center items-center px-4 py-20">
          <div
            className={`right relative bg-white mx-3 md:mx-6 lg:mx-0 w-auto rounded-xl lg:w-[55%] lg:rounded-tr-xl rounded-bl-xl lg:rounded-bl-none rounded-br-xl`}
          >
            <Stepper />
            <div className="flex flex-col justify-between h-full">
              <div 
              className={`step-handler-wrapper p-5 xl:p-10 `}>
                {renderStep()}
              </div>
            </div>
          </div>
        </div>
      </div>
 
    </>
  );
};

export default Steps;
