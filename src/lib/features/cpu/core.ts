import { cpuState } from "./cpu.state.svelte";

export type Process = {
    id?: string;
    priority: number;
    arrivalTime: number;
    burstTime: number;
    remainingTime?: number; // For preemptive algorithms
    color?: string; // For visualization purposes
}
const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const addProcess = (process: Process = {arrivalTime: 1, priority: 1, burstTime: 1}) => {
    process.id = generateProcessID(cpuState.processes.length);
    process.color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;
    cpuState.processes = [...cpuState.processes, process];
}

export const generateProcessID = (index: number): string => {
    // Generate process IDs like A, B, ..., Z, AA, AB, ..., ZZ
    if(index < 0) return 'A';
    if(index >= 676) return `P${index}`; // Limit to two-letter IDs
    if(index > 25) {
        const firstCharIndex = Math.floor(index / 26) - 1;
        const secondCharIndex = index % 26;
        return `${alphabets[firstCharIndex]}${alphabets[secondCharIndex]}`;
    }

    return `${alphabets[index]}`;
};

export const updateProcess = (updatedProcess: Process) => {
    cpuState.processes = cpuState.processes.map(p => p.id === updatedProcess.id ? updatedProcess : p);
}   
export const removeProcess = (id: string) => {
    // Remove the process with the given id
    cpuState.processes = cpuState.processes.filter(p => p.id !== id);
    // Reassign IDs to maintain consistency
    cpuState.processes = cpuState.processes.map((p, index) => {
        p.id = generateProcessID(index);
        return p;
    });
    
}

export const resetProcesses = () => {
    // Clear all processes
    cpuState.processes = [];
}

export const randomizeProcesses = (count: number = -1) => {
    if(count === -1) {
        count = Math.floor(Math.random() * 5) + 3; // Random count between 3 and 7
    }
    // Clear existing processes
    resetProcesses();
    //add a first process with arrival time 1
    addProcess({arrivalTime: 1,priority: Math.floor(Math.random() * 6) + 1, burstTime: Math.floor(Math.random() * 10) + 1});

    // Add random processes
    for (let i = 1; i < count; i++) {
        const process: Process = {
            priority: Math.floor(Math.random() * 10) + 1,
            arrivalTime: Math.floor(Math.random() * 6) + 1,
            burstTime: Math.floor(Math.random() * 10) + 1
        };
        addProcess(process);
    }
}
