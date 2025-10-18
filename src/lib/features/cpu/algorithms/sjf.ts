import { cpuState } from "../cpu.state.svelte";
import type { Process } from "../processes";
import { getArrivalQueue } from "../scheduling";



export const sjf = () => {
    //the process that requires the least amount of time, finishes first
    const arrivalQueue = getArrivalQueue();
    

    let currentTime = 1;
    let readyQueue = [] as Process[];// queue of processes that are ready to run

    while(readyQueue.length || arrivalQueue.length){

        if(readyQueue.length == 0){
            readyQueue.push(arrivalQueue.pop() as Process);//add the next process to the ready queue
        }
        else{
            //sort by burst time 
            readyQueue = readyQueue.sort((a, b) => {
                return b.burstTime - a.burstTime;
            });
        }
        
        const process = readyQueue.pop() as Process; 

        //skip to arrival time
        if(currentTime < process.arrivalTime){
            currentTime = process.arrivalTime;
        }

        //run the process for its burst time
        for(let i = 0; i < process.burstTime; i++){
            cpuState.addSchedulingStep(process.id, currentTime);

            if(arrivalQueue[arrivalQueue.length - 1]?.arrivalTime == currentTime){
                readyQueue.push(arrivalQueue.pop() as Process);//add the next process to the ready queue
            }
            currentTime++;//track the current time

        }
    }


}



export const sjfPriority = () => {
    // if a process with a higher priority than the one currently running becomes ready, 
    // the running process is moved to ready and 
    // the process with the highest priority gets to run. 
    // Once the process with the highest priority is finished, 
    // the new process to be run is the one with the shortest running time amongst those that have the highest priority
    const arrivalQueue = getArrivalQueue();

    let currentTime = 1;
    let readyQueue = [] as Process[];// queue of processes that are ready to run

    while(readyQueue.length || arrivalQueue.length){

        if(readyQueue.length == 0){
            readyQueue.push(arrivalQueue.pop() as Process);//add the next process to the ready queue
        }
        else{
            //sort by burst time 
            readyQueue = readyQueue.sort((a, b) => {
                return b.burstTime - a.burstTime;
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
                const newProcess = arrivalQueue.pop() as Process;//add the next process to the ready queue
                if(newProcess.priority > process.priority){
                    readyQueue.push(process);//add the current process to the ready queue
                    process = newProcess;//set the current process to the new process
                }
                else{
                    readyQueue.push(newProcess);//add the new process to the ready queue
                }
            }
            cpuState.addSchedulingStep(process.id, currentTime);
            process.remainingTime--;
            currentTime++;//track the current time
        }
    }
}