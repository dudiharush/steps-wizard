import * as React from "react";

export type StepMap = { [stepName: string]: JSX.Element };

export type StepsWizardProps = {
  startStepName: string;
};

export type StepProps = {
  name: string;
  component: JSX.Element;
};

export const StepsWizardContext = React.createContext<{
  setNextStep: (stepName: string) => void;
  setPreviouseStep: () => void;
  getHasPreviousStep: () => boolean;
}>({
  setNextStep: (stepName: string) => {},
  setPreviouseStep: () => {},
  getHasPreviousStep: () => false
});

export const Step = ({ component }: StepProps) => component;

export const StepsWizard = ({ startStepName, children }: React.PropsWithChildren<StepsWizardProps>) => {
  const [stepMap, setStepMap] = React.useState<StepMap>({});

  React.useEffect(()=>{
    const steps:StepMap = {};
    React.Children.forEach(children as React.ReactElement<StepProps>[], ({props}) => {
      steps[props.name] = props.component;
    });
    setStepMap(steps);
  },[children])
  
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
      {stepMap[currentStepName()]}
    </StepsWizardContext.Provider>
  );
};
