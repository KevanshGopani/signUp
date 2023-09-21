import { useState } from "react";
import { useDispatch } from "react-redux";
import { personalDetails } from "../redux/userSlice";

const PersonalInfo = ({ handleClick, currentState, steps, isVisible }) => {
  const current = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch();

  const [error, setError] = useState(false);

  const validation = () => {
    const { firstname, lastname, birthdate } = formData;

    if (
      firstname.length === 0 ||
      lastname.length === 0 ||
      birthdate.length === 0
    ) {
      setError("All fields are required.");
      return true;
    }
    setError("");
  };

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    birthdate: "",
  });

  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = async () => {
    dispatch(personalDetails({ formData }));
  };

  return (
    <>
      <div className={isVisible ? "block" : "hidden"}>
        {" "}
        <div className="mt-9">
          <label className="head ">Personal Information</label>
        </div>
        <div className="ml-6 mt-3 flex max-lg:flex-col justify-center items-center gap-4">
          <label className=" inputName text-lg">
            Firstname :
            <input
              className="input"
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={onChangeHandler}
            />
          </label>

          <label className="inputName text-lg">
            Lastname :
            <input
              className="input"
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={onChangeHandler}
            />
          </label>

          <label className="inputName text-lg">
            {" "}
            Date of birth :
            <input
              className="input text-white/50"
              type="date"
              name="birthdate"
              max={current}
              value={formData.birthdate}
              onChange={onChangeHandler}
            />
          </label>
        </div>
        <div className="flex justify-center items-center mt-8">
          <span className="text-red-600 text-lg font-semibold">{error}</span>
        </div>
        <div className="container flex justify-around mt-10 mb-8">
          {/* Next Button */}

          <button
            onClick={async () => {
              if (!(await validation())) {
                submitHandler();
                handleClick(2);
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

export default PersonalInfo;
