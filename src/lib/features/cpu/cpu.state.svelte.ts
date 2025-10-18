import { SvelteMap } from "svelte/reactivity";
import { addProcess, randomizeProcesses, removeProcess, resetProcesses, updateProcess, type Process } from "./core";
import { addSchedulingStep, resetSchedulingSteps } from "./scheduling";


export const cpuState = $state({
    algorithm: 'fcfs',  // Default CPU scheduling algorithm
    processes: [] as Process[],     // List of processes to be scheduled
    addProcess,
    updateProcess,
    removeProcess,
    resetProcesses,
    randomizeProcesses,
    visualizerGrid: new SvelteMap(), // Map of time unit to array of process IDs or null
    addSchedulingStep,
    resetSchedulingSteps,
})