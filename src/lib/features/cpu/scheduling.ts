import { cpuState } from "./cpu.state.svelte";


export const getArrivalQueue = () => {
    const arrivalQueue = cpuState.processes
        .map(p => ({ ...p })) // shallow clone each process
        .toSorted((a, b) => b.arrivalTime - a.arrivalTime);

    return arrivalQueue;
};


export const addSchedulingStep = (processId: string | undefined, timeUnit: number) => {
    if(cpuState.visualizerGrid.has(timeUnit)) {
        //replace the existing entry
        cpuState.visualizerGrid.set(timeUnit, processId);
        return;
    }
    cpuState.visualizerGrid.set(timeUnit, processId);
};

export const resetSchedulingSteps = () => {
    cpuState.visualizerGrid.clear();
}