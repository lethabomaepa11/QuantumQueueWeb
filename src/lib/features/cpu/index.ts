import { fcfs, fcfsPriority } from "./algorithms/fcfs";
import { roundRobin, roundRobinPriority } from "./algorithms/roundRobin";
import { sjf, sjfPriority } from "./algorithms/sjf";
import { srtn } from "./algorithms/srt";
import { cpuState } from "./cpu.state.svelte"
import { resetSchedulingSteps } from "./scheduling";

export const showSchedulingSolution = () => {
    resetSchedulingSteps();
    switch (cpuState.algorithm) {
        case 'fcfs':
            fcfs()
            break;
        case 'fcfs-priority':
            fcfsPriority()
            break;
        case 'sjf':
            sjf()
            break;
        case 'sjf-priority':
            sjfPriority()
            break;
        case 'srt':
            srtn()
            break;
        case 'rr':
            roundRobin();
            break;
        case 'rr-priority':
            roundRobinPriority();
            break;
        default:
            break;
    }
}