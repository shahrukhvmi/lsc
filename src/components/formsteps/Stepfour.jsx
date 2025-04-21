import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../../store/slice/stepper";
import DynamicRadioButton from "../DynamicCheckBox/DynamicCheckBox";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { setStep4 } from "../../store/slice/stepSlice";
import { usePostStepsMutation } from "../../store/services/Steps/Steps";
import PrevButton from "../PrevBtn/PrevButton";
import NextButton from "../NextBtn/NextButton";

const Stepfour = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can change to "auto" for instant scrolling
    });
  }, []);

  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.step.currentStep);
  const [getQuestion, setGetQuestion] = useState(null);
  const [confirmationInfo, setconfirmationInfo] = useState(null);

  const [postSteps, { error: isError, isLoading: loader }] = usePostStepsMutation();
  const pid = localStorage.getItem("pid");

  // Initialize useForm
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Enable live validation
  });

  // Watch checkbox state dynamically
  const isChecked = watch("confirmation_question");

  // Replace stepPrevData with your provided medicalData
  const medicalData = [
    {
      question: "Please confirm you have read and understand the below information related to the treatment prescribed: I confirm and understand that:",
      qsummary: "Please confirm you have read and understand the below information related to the treatment prescribed: I confirm and understand that:",
      has_checklist: true,
      checklist: (
        <ul>
          <li>Treatments are sub-cutaneous injections and I feel comfortable administering this medication myself.</li>
          <li>Treatments are prescription only medication and therefore you must inform your GP/doctor that you have been prescribed this and that you are taking it.</li>
          <li>I confirm that I understand how to store the medication and dispose of the needles responsibly.</li>
          <li>I confirm that I have tried to lose weight by diet, exercise and lifestyle changes. I understand that the weight loss injections must be used with a healthy diet and exercise regime.</li>
          <li>I confirm that I will seek medical attention and/or inform my GP if I develop any adverse reactions or symptoms, including but not limited to the following: abdominal pain, swelling or a lump in the throat, difficulty swallowing, symptoms of low blood sugar (such as sweating, shakiness, feeling weak), nausea and vomiting which does not settle, an allergic reaction, palpitations or changes to my mood.</li>
          <li>I confirm I understand that Prescription Only Medication cannot be returned, unless there is a manufacturer recall on the product or if you have received it faulty. I agree that a faulty product, as per our terms and conditions, will be returned to Mayfair Weight Loss Clinic’s pharmacy in its received form for manufacturers testing.</li>
          <li>I confirm that no guarantees have been given for weight loss and I understand that results will vary from individual to individual.</li>
          <li>I confirm that I understand that prescribed medication may cause side effects such as nausea, diarrhoea, headaches, lack of appetite, bloating, constipation, and abdominal pain.</li>
          <li>I understand that if the weight loss injections are ever frozen or stored in temperatures above 30 °C then they must be discarded.</li>
          <li>I consent to an age and ID check when placing my first order.</li>
          <li>I confirm that I have read, understood and accept Mayfair Weight Loss Clinic’s <a target="blank" style="color: blue;" href="https://www.mayfairweightlossclinic.co.uk/terms-conditions/">Terms and Conditions</a>.</li>
        </ul>
      ),
      answer: true,
    },
  ];

  useEffect(() => {
    setGetQuestion(medicalData[0]); // Using medicalData instead of stepPrevData
  }, []);

  useEffect(() => {
    console.log("Checklist content:", getQuestion?.checklist);  // Check if it's an object or string
    const updatedConfirmation = [
      {
        question: getQuestion?.question,
        qsummary: getQuestion?.qsummary,
        checklist: getQuestion?.checklist,
        answer: isChecked,
        has_checklist: getQuestion?.has_checklist,
      },
    ];
    setconfirmationInfo(updatedConfirmation);
  }, [isChecked, getQuestion]);

  // Form submission handler
  const onSubmit = async (data) => {


    // dispatch(setStep4(confirmationInfo));
    dispatch(nextStep());

  };

  return (
    <div className="mb-36">
      <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-light">
        Step 4: <span className="font-bold">Consent</span>
      </h1>
      <p className="text-[#6c757d] pt-3 text-sm lg:text-base mb-7">
        Your information is kept private and will be reviewed by a healthcare professional. The questions are meant to help the prescriber make an
        informed decision about the suitability of the treatment.
      </p>
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Dynamically Render Checkboxes */}
          {getQuestion && (
            <DynamicRadioButton
              key={getQuestion.question}
              name="confirmation_question" // Register with react-hook-form
              label={getQuestion.question}
              terms={getQuestion.checklist} // Directly pass JSX content as terms
              register={register("confirmation_question", {
                required: "You must confirm before proceeding.",
              })}
              isChecked={isChecked} // Pass watched state
            />
          )}

          {/* Validation Error Message */}
          {errors.confirmation_question && <p className="text-red-500 mt-2">{errors.confirmation_question.message}</p>}

          {/* Navigation Buttons */}
          <div className="mt-10 mb-10 hidden sm:flex">
            <PrevButton label={"Back"} onClick={() => dispatch(prevStep())} />
            <NextButton disabled={!isValid || loader} label={"Next"} loading={loader} />
          </div>

          <div className="fixed bottom-2 w-[95%] mx-auto left-0 right-0 z-50 block sm:hidden">
            <div className="relative flex justify-between items-center bg-white/30 backdrop-blur-lg rounded-lg py-3 px-6 shadow-lg border border-white/40">
              {/* Content Layer (to prevent blur on buttons) */}
              <div className="relative flex w-full justify-between items-center">
                {/* Back Button */}
                <button
                  onClick={() => dispatch(prevStep())}
                  className="flex flex-col items-center justify-center text-white rounded-md bg-primary p-3"
                >
                  <span className="text-md font-semibold px-6">Back</span>
                </button>

                {/* Proceed Button */}
                <button
                  type="submit"
                  disabled={!isValid || loader}
                  className={`p-3 flex flex-col items-center justify-center ${!isValid || loader ? "disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-not-allowed bg-primary text-white rounded-md" : "text-white rounded-md bg-primary"}`}
                >
                  {loader ? (
                    // Loading Spinner with Label
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span></span>
                    </div>
                  ) : (
                    <span className="text-md font-semibold px-6">Next</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Stepfour;
