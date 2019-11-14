import * as React from "react";
import { useStepsWizard, StepsWizard, Step } from "./exports";

type SomeCompProps = {
  label: string;
  nextStepName?: string;
};
const SomeComp = ({ label, nextStepName }: SomeCompProps) => {
  const {
    setNextStep,
    setPreviouseStep,
    getHasPreviousStep
  } = useStepsWizard();
  return (
    <>
      {getHasPreviousStep() && <span onClick={setPreviouseStep}>{`<`}</span>}
      <span> {label} </span>
      {nextStepName && (
        <span onClick={() => setNextStep(nextStepName)}>{`>`}</span>
      )}
    </>
  );
};

export function App() {
  return (
    <div className="App">
      <h1>wizard usage</h1>
      <StepsWizard startStepName="one">
        <Step
          name="one"
          component={<SomeComp label="one" nextStepName="two" />}
        />
        <Step
          name="two"
          component={<SomeComp label="two" nextStepName="three" />}
        />
        <Step name="three" component={<SomeComp label="three" />} />
      </StepsWizard>
    </div>
  );
}
