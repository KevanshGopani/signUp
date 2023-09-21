import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { accountInfo } from "../redux/userSlice";

const AccountInfo = ({ handleClick, currentState, steps, isVisible }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };
  const validation = () => {
    const { username, password, confirmPassword } = formData;

    if (
      username.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      setError("All fields are required.");
      return true;
    } else if (password !== confirmPassword) {
      setError("Password and confirm password should be same.");
      return true;
    }
    setError("");
  };

  const submitHandler = () => {
    dispatch(accountInfo({ formData }));
  };

  return (
    <>
      <div className={isVisible ? "block" : "hidden"}>
        <div className="mt-9">
          <p className="head mb-4">Account Information</p>
        </div>
        <div className=" ml-4 mt-3 flex max-lg:flex-col max-lg:items-start flex-col justify-center items-center gap-4">
          <div className="mb-5">
            <label className="inputName text-lg">
              Username :
              <input
                className="input text-sm"
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formData.email}
                onChange={onChangeHandler}
              />
            </label>
          </div>
          <div className="inputClass flex max-lg:flex-col gap-4">
            <label className="inputName  text-lg ">
              Password :{" "}
              <input
                className="input"
                type="password"
                placeholder="Enter Password"
                name="password"
                autoComplete="off"
                value={formData.password}
                onChange={onChangeHandler}
              />{" "}
            </label>

            <label className="inputName  text-lg ">
              Confirm Password :{" "}
              <input
                className="input "
                type="password"
                name="confirmPassword"
                autoComplete="off"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={onChangeHandler}
              />{" "}
            </label>
          </div>
        </div>

        <div className="flex justify-center items-center mt-8">
          <span className="text-red-600 text-lg font-semibold">{error}</span>
        </div>

        <div className="container flex justify-around mt-10 mb-8">
          {/* Back BUtton */}
          <button
            onClick={() => handleClick(2)}
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
                handleClick(4);
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

export default AccountInfo;
