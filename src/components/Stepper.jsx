import React, { useEffect, useState, useRef } from "react";

const Stepper = ({ steps, currentState }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;

    while (count < newSteps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlited: true,
          selected: true,
          completed: false,
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlited: false,
          selected: true,
          completed: true,
        };

        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlited: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };

  useEffect(() => {
    //Obj
    const stepsState = steps.map((step, index) => {
      return Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlited: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      );
    });

    stepRef.current = stepsState;

    const current = updateStep(currentState - 1, stepRef.current);
    setNewStep(current);

    //console.log("New", newStep);
  }, [steps, currentState]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className="relative flex flex-col items-center text-teal-600">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
              step.selected
                ? " bg-orange-400 text-white font-bold border border-orange-500"
                : ""
            }`}
          >
            {/* Display Number */}
            {step.completed ? (
              <span className="text-white font-bold text-xl"> &#10003;</span>
            ) : (
              index + 1
            )}
          </div>

          <div
            className={`absolute text-xs top-0 text-center mt-16 w-32 font-medium uppercase ${
              step.highlited ? " text-orange-400" : "text-orange-200"
            }`}
          >
            {/* Display Descriptions */}
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
            step.completed ? "border-teal-600" : "border-green-300"
          }`}
        >
          {/* Display Line */}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="mx-4 p-4 flex justify-between items-center">
        {/* DisplaySteps */}
        {displaySteps}
      </div>
    </>
  );
};

export default Stepper;
