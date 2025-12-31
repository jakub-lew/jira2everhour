import { readFileSync, writeFileSync } from 'fs';

// Read jira_config.json
const jiraConfig = JSON.parse(readFileSync('jira_config.json', 'utf-8'));
const jiraTaskId = jiraConfig.JIRA_TASK_ID;

// Read asana_config.json
const asanaConfig = JSON.parse(readFileSync('asana_config.json', 'utf-8'));

// Find the corresponding Asana task ID in pairs
const asanaTaskId = asanaConfig.pairs[jiraTaskId];

if (asanaTaskId) {
    // Update TASK_ID in asana_config.json
    asanaConfig.TASK_ID = asanaTaskId;

    // Write back to asana_config.json
    writeFileSync('asana_config.json', JSON.stringify(asanaConfig, null, 2));

    console.log(`Updated TASK_ID to ${asanaTaskId} for JIRA task ${jiraTaskId}`);
} else {
    console.error(`No corresponding Asana task ID found for JIRA task ${jiraTaskId}`);
}