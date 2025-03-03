import React from 'react';

const StepNavigation = ({ activeStep }) => {
  const steps = [
    { id: 1, title: 'Create a card' },
    { id: 2, title: 'Submit a form' },
    { id: 3, title: 'Get your card' },
  ];

  return (
    <div>
      {/* Circles and connecting lines */}
      <div className="flex items-center mx-5">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div
              className={`rounded-full w-10 h-10 flex items-center justify-center border-2
              ${activeStep >= step.id ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-gray-300 text-gray-500'}`}
            >
              {step.id}
            </div>
            {/* Connector: only render if not the last step */}
            {index !== steps.length - 1 && (
              <div className="flex-1 h-1 bg-gray-300" />
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Step Labels */}
      <div className="flex justify-between mt-2">
        {steps.map((step) => (
          <span key={step.id} className="w-fit text-center text-sm font-medium">
            {step.title}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StepNavigation;
