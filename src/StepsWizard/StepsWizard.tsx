import * as React from "react";

type StepMap = Record<string, JSX.Element>;

export type StepsWizardProps = {
  startStepName: string;
};

export type StepProps = {
  name: string;
  component: JSX.Element;
};

type StepMetadata = {
  isStepLoading: boolean;
  setStepLoading: (isLoading: boolean) => void;
};

interface StepsizardContectProps {
  setNextStep: (stepName: string) => void;
  setPreviouseStep: () => void;
  getHasPreviousStep: () => boolean;
  meta: StepMetadata;
}

const StepsWizardContext = React.createContext<StepsizardContectProps>({
  setNextStep: (stepName: string) => {
    return;
  },
  setPreviouseStep: () => {
    return;
  },
  getHasPreviousStep: () => false,
  meta: {
    isStepLoading: false,
    setStepLoading: () => {
      return;
    }
  }
});

export const Step = ({ component }: StepProps) => component;

export const useStepsWizard = () => {
  return React.useContext(StepsWizardContext);
};

export const StepsWizard = ({
  startStepName,
  children
}: React.PropsWithChildren<StepsWizardProps>) => {
  const [stepMap, setStepMap] = React.useState<StepMap>({});
  const [isStepLoading, setStepLoading] = React.useState(false);
  const [stepsRoute, setStepsRoute] = React.useState([startStepName]);

  React.useEffect(() => {
    const steps: StepMap = {};
    React.Children.forEach(
      children as React.ReactElement<StepProps>[],
      ({ props }) => {
        steps[props.name] = props.component;
      }
    );
    setStepMap(steps);
  }, [children]);

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
      value={{
        setNextStep,
        setPreviouseStep,
        getHasPreviousStep,
        meta: { isStepLoading, setStepLoading }
      }}
    >
      {stepMap[currentStepName()]}
    </StepsWizardContext.Provider>
  );
};
