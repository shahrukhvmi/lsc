import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { nextStep, prevStep } from "../../store/slice/stepper";
import { FaArrowRight, FaArrowLeft, FaCheck, FaChevronDown } from "react-icons/fa";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import { usePostStepsMutation } from "../../store/services/Steps/Steps";
import PrevButton from "../PrevBtn/PrevButton";
import NextButton from "../NextBtn/NextButton";
import { setStep5 } from "../../store/slice/stepSlice";

const Stepfive = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can change to "auto" for instant scrolling
    });
  }, []);

  const dispatch = useDispatch();
  const [btnZipCode, setbtnZipCode] = useState(false);

  // Static GP details data
  const gpdetailsStatic = {
    zipcode: "",
    gpName: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    gpConsent: "no"
  };


  // Initialize useForm
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  // Watch form values
  const gpDetails = watch("gpDetails");
  const gepTreatMent = watch("gepTreatMent");
  const postalCode = watch("postalCode");
  const searchClicked = watch("searchClicked", false);
  const addressOptions = watch("addressOptions", []);
  const selectedAddress = watch("selectedAddress", null);

  const getPid = localStorage.getItem("pid");

  const onSubmit = async (data) => {
    dispatch(nextStep());

  };

  const handleSelect = (index) => {
    const selected = addressOptions[index];
    setValue("selectedAddress", selected);
    setValue("addressLine1", selected.Address1 || "");
    setValue("addressLine2", selected.Address2 || "");
    setValue("city", selected.City || "");
    setValue("state", selected.County || "");
    setValue("postalCode", postalCode || "");
    setValue("gpName", selected.OrganisationName || "");
  };

  const handleAddress = async () => {
    try {
      const response = await fetch(`https://api.nhs.uk/service-search/search-postcode-or-place?api-version=1&search=${postalCode}`, {
        method: "POST",
        headers: {
          "subscription-key": "7a46f2abc01b47b58e586ec1cda38c68",
        },
        body: JSON.stringify({
          filter: "(OrganisationTypeID eq 'GPB') or (OrganisationTypeID eq 'GPP')",
          top: 25,
          skip: 0,
          count: true,
        }),
      });
      const data = await response.json();
      if (data.errorName) {
        toast.error("No address found for the given postal code.");
      }

      if (data && data.value) {
        setValue("addressOptions", data.value);
      } else {
        setValue("addressOptions", []);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setValue("addressOptions", []);
      toast.error("Error fetching address.");
    }
  };

  useEffect(() => {
    if (searchClicked) {
      handleAddress();
      setValue("searchClicked", false); // Reset searchClicked state
    }
  }, [searchClicked, postalCode]);

  // Use static data instead of fetching from localStorage
  useEffect(() => {
    setValue("gpDetails", gpdetailsStatic.gpConsent);
    setValue("gepTreatMent", gpdetailsStatic.gpConsent); // or set to default value
    setValue("email", gpdetailsStatic.email);
    setValue("gpName", gpdetailsStatic.gpName);
    setValue("postalCode", gpdetailsStatic.zipcode);
    setValue("addressLine1", gpdetailsStatic.addressLine1);
    setValue("addressLine2", gpdetailsStatic.addressLine2);
    setValue("state", gpdetailsStatic.state);
    setValue("city", gpdetailsStatic.city);
  }, [setValue]);

  const textFieldStyles = {
    "& label": {
      color: "#6b7280", // Default label color
      fontSize: 16,
      top: "-2px",
    },
    "& label.Mui-focused": {
      color: "#6c757d", // Label color when focused
    },
    "& .MuiInputBase-input": {
      color: "#111827", // Text color inside input
      borderBottom: "2px solid #f2f3f5",
    },
    "& .MuiInputBase-input:focus": {
      color: "#111827", // Text color inside input
      borderBottom: "2px solid #f7a564",
    },
    "& .MuiInput-underline:before": {
      display: "none", // Default underline color
    },
    "& .MuiInput-underline:hover:before": {
      display: "none", // Default underline color
    },
    "& .MuiInput-underline:after": {
      display: "none", // Default underline color
    },
  };

  const selectStyles = {
    "& label": {
      color: "#6b7280", // Default label color
      fontSize: 20,
      top: "-2px",
    },
    "& label.Mui-focused": {
      color: "#6c757d", // Label color when focused
    },
    "& .MuiSelect-select": {
      color: "#111827", // Text color inside select
      borderBottom: "2px solid #f2f3f5", // Custom bottom border
    },
    "& .MuiSelect-select:focus": {
      color: "#111827",
      borderBottom: "2px solid #f7a564", // Focus bottom border
    },
    "& .MuiInput-underline:before": {
      display: "none", // Removes default underline
    },
    "& .MuiInput-underline:hover:before": {
      display: "none",
    },
    "& .MuiInput-underline:after": {
      display: "none",
    },
  };

  // Effect to enable/disable the button
  useEffect(() => {
    setbtnZipCode(!postalCode?.trim()); // Disable if empty
  }, [postalCode]);

  return (
    <div className="pb-20 sm:pb-0 w-full max-w-[636px] my-7 overflow-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step Indicator */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-light">
            Step 5: <span className="font-bold">GP Details</span>
          </h1>
        </div>

        {/* Question: Inform GP */}
        <div>
          <h1 className="text-gray-500 text-base mb-4">Are you registered with a GP in the UK?</h1>
          <div className="grid md:grid-cols-1 md:gap-4 md:w-1/2 lg:w-1/3 xl:w-2/5">
            <div className="flex gap-4">
              <label
                htmlFor="yes"
                className={
                  gpDetails === "yes"
                    ? "border-[#4DB581] text-gray-500 bg-green-50 border-[2px] rounded-md shadow-lg flex justify-between items-center w-28 px-4 font-medium"
                    : "border-gray-300 text-gray-500 px-4 py-2 rounded-md w-28 text-left cursor-pointer shadow-md font-medium"
                }
              >
                Yes {gpDetails === "yes" && <FaCheck className="ms-4 text-[#4DB581]" size={15} />}
                <input
                  id="yes"
                  type="radio"
                  value="yes"
                  {...register("gpDetails", {
                    required: "Please select Yes or No.",
                  })}
                  className="hidden"
                />
              </label>
              <label
                htmlFor="no"
                className={
                  gpDetails === "no"
                    ? "border-[#4DB581] cursor-pointer text-gray-500 rounded-md bg-green-50 border-[2px] shadow-lg flex justify-between items-center w-28 px-4"
                    : "border-gray-300 text-gray-500 px-4 py-2 rounded-md w-28 text-left cursor-pointer shadow-md"
                }
              >
                No {gpDetails === "no" && <FaCheck className="ms-4 text-[#4DB581]" size={15} />}
                <input
                  id="no"
                  type="radio"
                  value="no"
                  {...register("gpDetails", {
                    required: "Please select Yes or No.",
                  })}
                  className="hidden"
                />
              </label>
            </div>
            {errors.gpDetails && <p className="text-red-500 mt-2">{errors.gpDetails.message}</p>}
          </div>
        </div>

        {/* Conditional Rendering for Yes */}
        {gpDetails === "yes" && (
          <div>
            <p className="text-black mt-6 sm:mt-8 text-sm sm:text-base mb-4">
              Do you consent for us to inform your GP about the treatment we have provided?
            </p>
            {/* Additional fields when GP consent is "yes" */}
            {/* Similar to existing code structure */}
          </div>
        )}

        {/* Conditional Rendering for No */}
        {gpDetails === "no" && (
          <div className="bg-[#FFF3CD] px-4 py-4 mt-6 text-gray-700 rounded-lg shadow-md hover:bg-[#FFEBB5]">
            <p className="text-sm md:text-base">
              You should inform your doctor of any medication you take. If you would like us to email you a letter to forward onto your doctor, please
              contact us.
            </p>
          </div>
        )}

        <div className="mt-10 sm:flex mb-10 hidden ">
          <PrevButton label={"Back"} onClick={() => dispatch(prevStep())} />
          <NextButton label={"Next"} disabled={!isValid} />
        </div>

   
      </form>
    </div>
  );
};

export default Stepfive;
