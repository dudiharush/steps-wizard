React Steps Wizard

## Installation Steps:

1. download nodeJS, if you don't have it already.
2. open a terminal and run: npm i steps-wizard (in your project directory).

## An usage example of the wizard:

import { StepsWizardContext, StepsWizard, StepsWizardProps, StepMap } from 'steps-wizard';

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

const App: React.FC = () => {
  const stepMap: StepMap = {
    one: <StepCompProps label="one" nextStepName="two" />,
    two: <StepCompProps label="two" nextStepName="three" />,
    three: <StepCompProps label="three" />
}
  const stepsWizardProps: StepsWizardProps = {
    stepMap,
    startStepName: "one"
  };
  return (
    <div className="App">
       <StepsWizard {...stepsWizardProps} />
    </div>
  );
}