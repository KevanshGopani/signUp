import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { final } from "../redux/userSlice";

const Final = ({ handleClick, currentState, steps, isVisible }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    terms: false,
  });
  const validation = () => {
    const { terms } = formData;
    if (!terms) {
      setError("Please accept terms and conditions.");
      return true;
    }
    setError("");
  };

  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.checked,
    }));
  };

  const submitHandler = () => {
    dispatch(final({ formData }));
  };

  return (
    <>
      <div className={isVisible ? "block" : "hidden"}>
        <div className="mt-9">
          <p className="head mb-4">Terms and Conditions:</p>
        </div>
        <input
          className="ml-6"
          type="checkbox"
          name="terms"
          id="checkbox"
          onChange={onChangeHandler}
          required
        ></input>
        <label htmlFor="checkbox" className="text-white">
          {" "}
          Terms and conditions<sup className="text-red-600">*</sup>
        </label>

        <div className="flex justify-center items-center mt-8">
          <span className="text-red-600 text-lg font-semibold">{error}</span>
        </div>

        <div className="container flex justify-around mt-10 mb-8">
          {/* Back BUtton */}
          <button
            onClick={() => handleClick(4)}
            className={`bg-white text-orange-400 uppercase py-2 px-4 rounded-xl font-semibold bottom-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${
              currentState === 1
                ? " cursor-not-allowed bg-black opacity-50"
                : ""
            }`}
          >
            Back
          </button>
          {/* Next Button */}

          <button
            onClick={async () => {
              if (!(await validation())) {
                submitHandler();
              }
            }}
            className={`bg-orange-400 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer bottom-2  hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out`}
          >
            {currentState === steps.length ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Final;
