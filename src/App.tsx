import * as React from "react";
import { useStepsWizard, StepsWizard, Step } from "./exports";

type SomeCompProps = {
  label: string;
  nextStepName?: string;
  loadAsync?: boolean;
};

const SomeComp = ({
  label,
  nextStepName,
  loadAsync = false
}: SomeCompProps) => {
  return (
    <>
      {loadAsync ? <ContentAsync label={label} /> : <Content label={label} />}
      <Footer nextStepName={nextStepName} />
    </>
  );
};

const sleep = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });

const Content = ({ label }: { label: string }) => <span> {label} </span>;

const ContentAsync = ({ label }: { label: string }) => {
  const [data, setData] = React.useState();
  const { meta } = useStepsWizard();
  if (!data) {
    meta.setStepLoading(true);
    sleep(1000).then(() => {
      setData("someData");
      meta.setStepLoading(false);
    });
  }

  return meta.isStepLoading ? (
    <div>Loading Content...</div>
  ) : (
    <span> {label} </span>
  );
};

const Footer = ({ nextStepName }: { nextStepName?: string }) => {
  const {
    setNextStep,
    setPreviouseStep,
    getHasPreviousStep,
    meta
  } = useStepsWizard();

  if (meta.isStepLoading) return <div>Loading Footer...</div>;
  return (
    <div>
      {getHasPreviousStep() && <span onClick={setPreviouseStep}>{`<`}</span>}
      {nextStepName && (
        <span onClick={() => setNextStep(nextStepName)}>{`>`}</span>
      )}
    </div>
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
          component={<SomeComp label="two" nextStepName="three" loadAsync />}
        />
        <Step name="three" component={<SomeComp label="three" />} />
      </StepsWizard>
    </div>
  );
}
