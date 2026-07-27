import PropTypes from "prop-types";
import { FaFolderOpen } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { Tooltip } from "@nextui-org/react";
import { Steps } from "rsuite";

const Stepper = ({ currentStep, setCurrentStep }) => {
  const steps = [
    { label: "BioData", icon: MdModeEdit },
    { label: "Officials", icon: FaFolderOpen },
  ];

  return (
    <div className="my-4">
      <Steps current={currentStep}>
        {steps.map((step, i) => (
          <Steps.Item
            icon={
              <Tooltip showArrow={true} content={step.label}>
                <div
                  className={`border text-lg h-[30px] w-[30px] rounded-full flex justify-center items-center  ${
                    currentStep == i + 1
                      ? "border-blue-500 text-blue-500"
                      : "border-gray-500 text-gray-400 cursor-not-allowed"
                  }`}
                  // onClick={() => setCurrentStep(i + 1)}
                >
                  <step.icon />
                </div>
              </Tooltip>
            }
            key={i}
          />
        ))}
      </Steps>
    </div>
  );
};

export default Stepper;
Stepper.propTypes = {
  currentStep: PropTypes.number,
  setCurrentStep: PropTypes.func,
};
