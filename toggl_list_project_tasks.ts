import toAdd from './jira_worklog.json';
import config from './toggl_config.json';

const apiKey = config.API_KEY;
const projectId = config.PROJECT_ID; // or override yours
const taskDescription = config.TASK_DESCRIPTION;
const workspaceId = config.WORKSPACE_ID;
const url = `https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/projects/${projectId}/tasks`

async function processWorklog() {
  for (const item of toAdd) {
    await fetch(url, {
      method: "GET",      
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${apiKey}:api_token`).toString('base64')}`
      },
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    //wait for 1 second to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

processWorklog();