import { fcfs, fcfsPriority } from "./algorithms/fcfs";
import { roundRobin, roundRobinPriority } from "./algorithms/roundRobin";
import { sjf, sjfPriority } from "./algorithms/sjf";
import { srtn } from "./algorithms/srt";
import { cpuState } from "./cpu.state.svelte"
import { resetSchedulingSteps } from "./scheduling";
import { page } from "$app/state";
import lzString from 'lz-string';


const { compressToEncodedURIComponent, decompressFromEncodedURIComponent } = lzString; 

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


export const shareCpuPageState = () => {
    const compressed = compressToEncodedURIComponent(JSON.stringify(cpuState));
    const url = page.url.origin + page.url.pathname + '?state=' + compressed;
    navigator.clipboard.writeText(url);
    //show share modal
    navigator.share({
			title: "CPU Scheduling Algorithm Visualizer: "+cpuState.algorithm,
			text: "Check out this visualizer for CPU scheduling algorithms!",
			url: url
		})
}
export const parseCpuPageState = () => {
    const state = page.url.searchParams.get('state');
    if (state) {
        const decompressed = JSON.parse(decompressFromEncodedURIComponent(state));
        console.log(decompressed);
        cpuState.algorithm = decompressed.algorithm;
        cpuState.processes = decompressed.processes;
        cpuState.quantum = decompressed.quantum;
        //cpuState.visualizerGrid = decompressed.visualizerGrid;
    }
}