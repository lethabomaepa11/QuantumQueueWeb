// First-Come, First-Served (FCFS)

import { cpuState } from "../cpu.state.svelte";
import type { Process } from "../processes";
import { getArrivalQueue } from "../scheduling";

export function fcfs(){

    //sort by arrival time, last arrival time first, to use pop method which is O(1)
    const arrivalQueue = getArrivalQueue();

    let currentTime = 1;

    while(arrivalQueue.length){

        //get the next process
        const process = arrivalQueue.pop() as Process; 

        //skip to arrival time
        if(currentTime < process.arrivalTime){
            currentTime = process.arrivalTime;
        }

        //run the process for its burst time
        for(let i = 0; i < process.burstTime; i++){
            cpuState.addSchedulingStep(process.id, currentTime);
            currentTime++;//track the current time

        }

    }
    
}

export function fcfsPriority(){
    //sort by arrival time, last arrival time first, to use pop method which is O(1)
    const arrivalQueue = getArrivalQueue();

    const readyQueue = [] as Process[];// queue of processes that are ready to run
    let currentTime = 1;

    while(readyQueue.length || arrivalQueue.length){
        //sort by priority, highest priority first, to use pop method which is O(1)

        if(readyQueue.length == 0){
            readyQueue.push(arrivalQueue.pop() as Process);//add the next process to the ready queue
        }
        else{
            readyQueue.sort((a, b) => {
                return b.priority - a.priority;
            });
        }
        
        let process = readyQueue.pop() as Process; 

        //skip to arrival time
        if(currentTime < process.arrivalTime){
            currentTime = process.arrivalTime;
        }

        while(process.remainingTime > 0){
            //check if a process with a higher priority becomes ready
            if(arrivalQueue[arrivalQueue.length - 1]?.arrivalTime == currentTime){
                const newProcess = arrivalQueue.pop() as Process;//get the process with that has arrived
                if(newProcess.priority > process.priority){
                    readyQueue.push(process);//add the current process to the ready queue
                    process = newProcess;
                }
                else{
                    readyQueue.push(newProcess);//add the new process to the ready queue
                }
            }

            cpuState.addSchedulingStep(process.id, currentTime);
            process.remainingTime--;
            currentTime++;
        }
    }
}