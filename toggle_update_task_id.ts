import { readFileSync, writeFileSync } from 'fs';

// Read jira_config.json
const jiraConfig = JSON.parse(readFileSync('jira_config.json', 'utf-8'));
const jiraTaskId = jiraConfig.JIRA_TASK_ID;

// Read asana_config.json
const togglConfig = JSON.parse(readFileSync('toggl_config.json', 'utf-8'));

const toggleEntry = togglConfig.pairs[jiraTaskId];

if (toggleEntry) {    
    togglConfig.TASK_DESCRIPTION = toggleEntry.taskDescription;
    togglConfig.PROJECT_ID = toggleEntry.projectId;
    togglConfig.TASK_ID = toggleEntry.taskId;

    // Write back to toggl_config.json
    writeFileSync('toggl_config.json', JSON.stringify(togglConfig, null, 2));

    console.log(`Updated toggle entry to ${JSON.stringify(toggleEntry)} for JIRA task ${jiraTaskId}`);
} else {
    console.error(`No corresponding toggle entry found for JIRA task ${jiraTaskId}`);
}