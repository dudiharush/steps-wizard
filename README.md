React Steps Wizard

## Installation Steps:

1. download and install nodeJS, if you don't have it already.
2. open a terminal and run: npm i steps-wizard (in your project directory).

## A usage example of the wizard:

```
import {
  StepsWizardContext,
  StepsWizard,
  Step
} from "steps-wizard";

type SomeCompProps = {
  label: string;
  nextStepName?: string;
};
const SomeComp = ({ label, nextStepName }: SomeCompProps) => {
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
  return (
    <div className="App">
      <h1>wizard usage</h1>
      <StepsWizard startStepName='one'>
        <Step name='one' component={<SomeComp label="one" nextStepName="two" />} />
        <Step name='two' component={<SomeComp label="two" nextStepName="three" />} />
        <Step name='three' component={<SomeComp label="three" />} />
      </StepsWizard>
    </div>
  );
}
```