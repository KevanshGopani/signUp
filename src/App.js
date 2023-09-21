import "./App.css";
import Stepper from "./components/Stepper";
import PersonalInfo from "./components/steps/PersonalInfo";
import ContactInfo from "./components/steps/ContactInfo";
import AccountInfo from "./components/steps/AccountInfo";
import Address from "./components/steps/Address";
import Final from "./components/steps/Final";
import { useState } from "react";

function App() {
  const [currentState, setCurrentStep] = useState(1);
  // const [currentState, setCurrentStep] = useState();

  const steps = [
    "Personal Information",
    "Contact Information",
    "Account Information",
    "Address",
    "Final",
  ];

  const displayStep = (step) => {
    return (
      <>
        <PersonalInfo
          isVisible={currentState === 1}
          handleClick={handleClick}
          currentState={currentState}
          steps={steps}
        />
        <ContactInfo
          isVisible={currentState === 2}
          handleClick={handleClick}
          currentState={currentState}
          steps={steps}
        />
        <AccountInfo
          isVisible={currentState === 3}
          handleClick={handleClick}
          currentState={currentState}
          steps={steps}
        />
        <Address
          isVisible={currentState === 4}
          handleClick={handleClick}
          currentState={currentState}
          steps={steps}
        />
        <Final
          isVisible={currentState === 5}
          handleClick={handleClick}
          currentState={currentState}
          steps={steps}
        />
      </>
    );
  };

  const handleClick = (newStep) => {
    //
    // let newStep = currentState;
    // if (direction === "next") {
    setCurrentStep(newStep);
    // }
    // newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="bg-gray-900 md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 ">
      {/* Stepper */}
      <div className="container horizontal mt-5">
        <Stepper steps={steps} currentState={currentState} />
      </div>

      {displayStep(currentState)}

      {/* navigation */}
    </div>
  );
}

export default App;
