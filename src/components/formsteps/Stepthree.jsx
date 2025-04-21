import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../../store/slice/stepper";
import { usePostStepsMutation } from "../../store/services/Steps/Steps";
import toast from "react-hot-toast";
import { setStep3 } from "../../store/slice/stepSlice";
import { useForm, Controller } from "react-hook-form";
import NextButton from "../NextBtn/NextButton";
import PrevButton from "../PrevBtn/PrevButton";
import { FaCheck } from "react-icons/fa";

const Stepthree = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.step.currentStep);

  // States
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [errorMessages, setErrorMessages] = useState({}); // Error messages for validation

  // React Hook Form setup
  const { control, handleSubmit, setValue, watch, trigger, formState: { errors, isValid } } = useForm({
    mode: "onChange",
  });

  // Using provided medical data directly
  const medicalData = [
    {
      question: "Do you have any allergies or intolerances?",
      qsummary: "Do you have any allergies or intolerances?",
      answer: "no",
      subfield_response: "",
      sub_field_prompt: "Give us additional information, please.",
      has_sub_field: true
    },
    {
      question: "Have you been prescribed and are currently taking weight loss medication (including weight loss injections) from another provider?",
      qsummary: "Have you been prescribed and are currently taking weight loss medication (including weight loss injections) from another provider?",
      answer: "no",
      subfield_response: "",
      sub_field_prompt: "Please let us know which medication you are currently taking for weight loss (e.g. Mounjaro, Wegovy, Saxenda, Ozempic) and the current dose.",
      has_sub_field: true
    },
    {
      question: "Are you currently taking any medication (including injections such as Victoza, Mounjaro, Ozempic, Trulicity, Byetta, Bydureon) for the treatment of diabetes?",
      qsummary: "Are you currently taking any medication (including injections such as Victoza, Mounjaro, Ozempic, Trulicity, Byetta, Bydureon) for the treatment of diabetes?",
      answer: "no",
      subfield_response: "",
      sub_field_prompt: "Give us additional information, please.",
      has_sub_field: false
    },
    // Add all other questions from your medicalData array
  ];

  // Retrieve stored responses from localStorage (if any)
  const stepPrev3 = useMemo(() => localStorage.getItem("step3"), []);
  const stepPrev3Data = stepPrev3 !== undefined && stepPrev3 != "undefined" && stepPrev3 ? JSON.parse(stepPrev3) : undefined;

  useEffect(() => {
    if (medicalData) {
      // Merge Data with previous responses from localStorage
      const mergedQuestions = medicalData.map((q, index) => {
        const prevAnswer = stepPrev3Data?.find((p) => p.question === q.question);

        return {
          ...q,
          id: index,
          answer: prevAnswer?.answer || q.answer,
          subfield_response: prevAnswer?.subfield_response || q.subfield_response,
        };
      });

      setQuestions(mergedQuestions);

      // Pre-fill Form Values
      const initialResponses = {};
      mergedQuestions.forEach((q) => {
        initialResponses[q.id] = {
          answer: q.answer,
          subfield_response: q.subfield_response,
        };
        setValue(`responses[${q.id}].answer`, q.answer);
        setValue(`responses[${q.id}].subfield_response`, q.subfield_response);
      });
      setResponses(initialResponses);
    }
  }, [medicalData, stepPrev3, stepPrev3Data, setValue]);




  const onSubmit = async () => {
  
        dispatch(nextStep());
  };

  // Check if the Next button should be enabled
  const isNextEnabled = questions.every((q) => {
    const answer = watch(`responses[${q.id}].answer`);
    const subfield = watch(`responses[${q.id}].subfield_response`);

    return (
      !errorMessages[q.id] &&
      (answer === "no" || (answer === "yes" && (!q.has_sub_field || (subfield && subfield.trim() !== ""))))
    );
  });

  return (
    <div className="pb-20 sm:pb-0">
      <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-light">
        Step 3: <span className="font-bold">Medical Questions</span>
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        {questions.map((q) => {
          const selectedAnswer = watch(`responses[${q.id}].answer`);
          return (
            <div key={q.id} className={`mb-8 flex justify-between field | border rounded-md p-3 flex-col lg:flex-row items-start gap-5 lg:gap-10 ${errorMessages[q.id] ? "border-red-300" : "border-gray-300"}`}>
              <div className="font-reg md:text-sm text-[#1C1C29]">
                {/ul|li/.test(q.question) ? (
                  <div className="font-reg md:text-sm text-[#1C1C29] leading-relaxed pe-2" dangerouslySetInnerHTML={{ __html: q.question.replace(/<ul>/g, '<ul class="list-disc ml-5 space-y-2">') }}></div>
                ) : (
                  <div className="font-reg md:text-sm text-[#1C1C29] pe-2">{q.question}</div>
                )}
                {q.has_sub_field && selectedAnswer === "yes" && (
                  <textarea className="w-full p-2 border-2 border-violet-700 rounded-lg mt-4" placeholder={q.sub_field_prompt} value={responses[q.id]?.subfield_response} onChange={(e) => handleChange(q.id, e.target.value, true)} />
                )}

                {errorMessages[q.id] && <p className="text-red-500 text-sm mb-2">{errorMessages[q.id]}</p>}
              </div>

              <div className="flex gap-4">
                {["yes", "no"].map((option) => (
                  <div key={option}>
                    <label className={`flex w-24 p-3 rounded-md shadow-md cursor-pointer border-2 items-center justify-between ${selectedAnswer === option ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"}`}>
                      <Controller
                        name={`responses[${q.id}].answer`}
                        control={control}
                        render={({ field }) => (
                          <input type="radio" {...field} value={option} checked={field.value === option} onChange={(e) => handleChange(q.id, e.target.value)} className="hidden" />
                        )}
                      />
                      <span className={`text-sm font-semibold capitalize ${selectedAnswer === option ? "text-[#4DB581]" : "text-gray-500 "}`}>{option}</span>
                      {selectedAnswer === option && <FaCheck color="#4DB581" className="ml-2" size={14} />}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <div className="mt-10 mb-10 hidden sm:flex">
          <PrevButton label={"Back"} onClick={() => dispatch(prevStep())} />
          <NextButton disabled={!isNextEnabled} label={"Next"} />
        </div>


      </form>
    </div>
  );
};

export default Stepthree;
