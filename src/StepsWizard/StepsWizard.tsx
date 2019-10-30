import * as React from "react";

export type StepMap = { [stepName: string]: JSX.Element };

export const StepsWizardContext = React.createContext<{
  setNextStep: (stepName: string) => void;
  setPreviouseStep: () => void;
  getHasPreviousStep: () => boolean;
}>({setNextStep: (stepName: string)=>{}, setPreviouseStep: ()=>{}, getHasPreviousStep:()=>false});

export type StepsWizardProps = {
  stepsMap: StepMap;
  startStepName: string;
};

export const StepsWizard = ({ stepsMap, startStepName }: StepsWizardProps) => {
  const [stepsRoute, setStepsRoute] = React.useState([startStepName]);

  const setNextStep = (stepName: string) => {
    setStepsRoute(stepsRoute.concat(stepName));
  };

  const setPreviouseStep = () => {
    setStepsRoute(stepsRoute.slice(0, stepsRoute.length - 1));
  };

  const getHasPreviousStep = () => {
    return stepsRoute.length > 1;
  };

  const currentStepName = () => {
    return stepsRoute[stepsRoute.length - 1];
  };

  return (
    <StepsWizardContext.Provider
      value={{ setNextStep, setPreviouseStep, getHasPreviousStep }}
    >
      {stepsMap[currentStepName()]}
    </StepsWizardContext.Provider>
  );
};
