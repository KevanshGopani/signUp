import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { contact } from "../redux/userSlice";

const ContactInfo = ({ handleClick, currentState, steps, isVisible }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const validation = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const { email, phone } = formData;

    if (email.length === 0 || phone.length !== 10) {
      setError("All fields are required.");
      return true;
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return true;
    }
    setError("");
  };

  const submitHandler = () => {
    dispatch(contact({ formData }));
  };

  return (
    <>
      <div className={isVisible ? "block" : "hidden"}>
        <div className="mt-9">
          <p className="head mb-4">Contact Information</p>
        </div>

        <div className=" max-lg:flex-col ml-6 mt-3 flex justify-center items-start gap-4">
          <label className="inputName text-lg">
            Email Address :
            <input
              className="input"
              type="email"
              placeholder="Enter Email"
              value={formData.password}
              onChange={onChangeHandler}
              name="email"
            />
          </label>

          <label className="inputName text-lg">
            Phone Number :
            <input
              className="input"
              type="text"
              placeholder="Enter phone Number"
              value={formData.password}
              onChange={onChangeHandler}
              name="phone"
            />
          </label>
        </div>

        <div className="flex justify-center items-center mt-8">
          <span className="text-red-600 text-lg font-semibold">{error}</span>
        </div>

        <div className="container flex justify-around mt-10 mb-8">
          {/* Back BUtton */}
          <button
            onClick={() => handleClick(1)}
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
                handleClick(3);
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

export default ContactInfo;
