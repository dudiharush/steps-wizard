import * as React from "react";
import { render } from "react-dom";
import {
  StepsWizardContext,
  StepsWizard,
  StepsWizardProps
} from "./StepsWizard";
import "./styles.css";

type StepCompProps = {
  label: string;
  nextStepName?: string;
};
const StepCompProps = ({ label, nextStepName }: StepCompProps) => {
  const {
    setNextStep,
    setPreviouseStep,
    getHasPreviousStep
  } = React.useContext(StepsWizardContext);
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

function App() {
  const stepsWizardProps: StepsWizardProps = {
    stepsMap: {
      one: <StepCompProps label="one" nextStepName="two" />,
      two: <StepCompProps label="two" nextStepName="three" />,
      three: <StepCompProps label="three" />
    },
    startStepName: "one"
  };
  return (
    <div className="App">
      <h1>wizard usage</h1>
      <StepsWizard {...stepsWizardProps} />
      <br />
      <StepsWizard {...stepsWizardProps} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
