import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { address } from "../redux/userSlice";

const Address = ({ handleClick, currentState, steps, isVisible }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    postal: "",
  });

  const validation = () => {
    const { street, city, state, postal } = formData;

    if (
      street.length === 0 ||
      city.length === 0 ||
      state.length === 0 ||
      postal.length === 0
    ) {
      setError("All fields are required.");
      return true;
    }
    setError("");
  };

  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = () => {
    dispatch(address({ formData }));
  };
  return (
    <>
      <div className={isVisible ? "block" : "hidden"}>
        <div className="mt-9">
          <p className="head mb-4">Address</p>
        </div>

        <div className="flex justify-center mr-[9rem]">
          <div className="flex flex-col max-lg:flex-col justify-center items-end gap-6 mt-2 ml-6  w-[25rem]">
            <div className="ml-4 flex flex-col max-lg:flex-col justify-center items-end gap-4">
              <label className="inputName">
                Street Address :
                <input
                  className="input"
                  type="text"
                  placeholder="Address"
                  name="street"
                  value={formData.street}
                  onChange={onChangeHandler}
                />
              </label>

              <label className="inputName">
                City :
                <input
                  className="input"
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={onChangeHandler}
                />
              </label>
            </div>
            <div className="ml-4 flex flex-col max-lg:flex-col justify-center items-end gap-4">
              <label className="inputName">
                State :
                <input
                  className="input"
                  type="text"
                  placeholder="State"
                  name="state"
                  value={formData.state}
                  onChange={onChangeHandler}
                />
              </label>

              <label className="inputName">
                Postal Code :
                <input
                  className="input"
                  type="text"
                  name="postal"
                  placeholder="Postal Code"
                  value={formData.postal}
                  onChange={onChangeHandler}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-8">
          <span className="text-red-600 text-lg font-semibold">{error}</span>
        </div>

        <div className="container flex justify-around mt-10 mb-8">
          {/* Back BUtton */}
          <button
            onClick={() => handleClick(3)}
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
                handleClick(5);
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

export default Address;
