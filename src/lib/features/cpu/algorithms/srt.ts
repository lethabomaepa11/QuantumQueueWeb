import { cpuState } from "../cpu.state.svelte";
import type { Process } from "../processes";
import { getArrivalQueue } from "../scheduling";

export const srtn = () => {
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
                    return b.remainingTime - a.remainingTime;
                });
            }
            
            let process = readyQueue.pop() as Process; 
    
            //skip to arrival time
            if(currentTime < process.arrivalTime){
                currentTime = process.arrivalTime;
            }
    
            while(process.remainingTime > 0){
                //check if a process with a shorter remaining time becomes ready
                if(arrivalQueue[arrivalQueue.length - 1]?.arrivalTime == currentTime){
                    const newProcess = arrivalQueue.pop() as Process;//add the next process to the ready queue
                    if(newProcess.remainingTime < process.remainingTime){
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
