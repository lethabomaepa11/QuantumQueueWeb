import { cpuState } from "../cpu.state.svelte";
import type { Process } from "../processes";
import { getArrivalQueue } from "../scheduling"

export const roundRobin = () => {
    // the process that arrives first, gets to go first. 
    // The process only runs for the amount of time allowed by the quantum before transitioning to ready. 
    // The process that arrived next, gets to go next

    const arrivalQueue = getArrivalQueue();
    const readyQueue = [] as Process[];// queue of processes that are ready to run
    let currentTime = 1;
    
    while(readyQueue.length || arrivalQueue.length){

        if(readyQueue.length == 0){
            readyQueue.push(arrivalQueue.pop() as Process);//add the next process to the ready queue
        }
        
        
        const process = readyQueue.shift() as Process;//remove the next process from the ready queue

        //skip to arrival time
        if(currentTime < process.arrivalTime){
            currentTime = process.arrivalTime;
        }

        let count = 0;
        while(count < cpuState.quantum && process.remainingTime > 0){
            if(arrivalQueue[arrivalQueue.length - 1]?.arrivalTime == currentTime){//check if a process is ready
                readyQueue.push(arrivalQueue.pop() as Process);//add the next process to the ready queue
            }

            cpuState.addSchedulingStep(process.id, currentTime);//track the current time

            process.remainingTime--;//decrement the remaining time
            currentTime++;//track the current time
            count++;
        }

        if(process.remainingTime > 0){
            readyQueue.push(process);//add the process back to the ready queue, at the back
        }

    }
}


export const roundRobinPriority = () => {}