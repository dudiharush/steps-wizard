import * as React from "react";
export declare type StepMap = {
    [stepName: string]: JSX.Element;
};
export declare const StepsWizardContext: React.Context<{
    setNextStep: (stepName: string) => void;
    setPreviouseStep: () => void;
    getHasPreviousStep: () => boolean;
}>;
export declare type StepsWizardProps = {
    stepsMap: StepMap;
    startStepName: string;
};
export declare const StepsWizard: ({ stepsMap, startStepName }: StepsWizardProps) => JSX.Element;
