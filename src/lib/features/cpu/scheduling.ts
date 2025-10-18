import { cpuState } from "./cpu.state.svelte";

export const addSchedulingStep = (processId: string | undefined, timeUnit: number) => {
    if(cpuState.visualizerGrid.has(timeUnit)) {
        //replace the existing entry
        cpuState.visualizerGrid.set(timeUnit, processId);
        console.log(cpuState.visualizerGrid);
        console.log("Updated visualizer grid at time unit", timeUnit, "to process ID", processId);
        return;
    }
    console.log(cpuState.visualizerGrid);
    cpuState.visualizerGrid.set(timeUnit, processId);
};

export const resetSchedulingSteps = () => {
    cpuState.visualizerGrid.clear();
}