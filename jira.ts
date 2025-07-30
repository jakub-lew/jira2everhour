import * as fs from 'fs';
import jiraConfig from './jira_config.json';

const domain = jiraConfig.JIRA_URL;
const jiraTaskID = jiraConfig.JIRA_TASK_ID;
const apiEndpoint = `${domain}rest/api/3/issue/{issueIdOrKey}/worklog`;
const jiraApiKey = jiraConfig.JIRA_API_KEY;
const jiraMail = jiraConfig.JIRA_MAIL;
const headers = {
    'Authorization': `Basic ${btoa(`${jiraMail}:${jiraApiKey}`)}`,
    'Content-Type': 'application/json'
};
async function getWorklog(issueIdOrKey: string) {
    const response = await fetch(apiEndpoint.replace('{issueIdOrKey}', issueIdOrKey), {
        method: 'GET',
        headers: headers
    });

    if (!response.ok) {
        throw new Error(`Error fetching worklog: ${response.statusText}`);
    }

    return response.json();
}

async function main() {
    try {
        const resp = await getWorklog(jiraTaskID);
        const output: any = [];

        resp.worklogs.map((item: any) => {
            //   console.log(`Date: ${item.started}, Time Spent: ${item.timeSpent}`);
            //   if (item.comment) {
            //     console.log(`Comment: ${item.comment.content[0].content[0].text}`);
            //   }
            //   console.log('---');
            output.push({
                date: item.started.split('T')[0],
                time: item.timeSpentSeconds,
                comment: item.comment ? item.comment.content[0].content[0].text : ''
            });
        });

        return output;
    } catch (error) {
        console.error('Error:', error);
    }
}


main().then((data) => {
    data = data.filter((item: any) => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(jiraConfig.dateRange.start) && itemDate <= new Date(jiraConfig.dateRange.end);
    });
    console.log('Worklog Data:', JSON.stringify(data, null, 2));
    //export string to a file
    fs.writeFileSync('jira_worklog.json', JSON.stringify(data, null, 2));
});
