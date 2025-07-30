//import json and sum the times
import  data from './jira_worklog.json';

const totalTime = data.reduce((acc: number, item: any) => acc + item.time, 0);
console.log('Total Time Spent:', totalTime);
//in hours and minutes
const hours = Math.floor(totalTime / 3600);
const minutes = Math.floor((totalTime % 3600) / 60);
console.log(`Total Time Spent: ${hours} hours and ${minutes} minutes`);
//show all times as table in hh:mm format
const formattedTimes = data.map((item: any) => {
    const timeInHours = Math.floor(item.time / 3600);
    const timeInMinutes = Math.floor((item.time % 3600) / 60);
    return {
        date: item.date,
        time: `${timeInHours}h ${timeInMinutes}m`,
        comment: item.comment
    };
});
console.log('Formatted Times:', formattedTimes);
