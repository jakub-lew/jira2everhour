import toAdd from './jira_worklog.json';
import config from './toggl_config.json';

const apiKey = config.API_KEY;
const projectId = config.PROJECT_ID;
const taskDescription = config.TASK_DESCRIPTION;
const workspaceId = config.WORKSPACE_ID;
const url = `https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/time_entries`

async function processWorklog() {
  for (const item of toAdd) {
    const date = item.date;
    const time = item.time;
    const startTime = item.startTime;
    const body = {
      start: date+'T'+startTime + 'Z',
      duration: time,
      project_id: projectId,
      description: taskDescription,
      created_with: "userScript",
      workspace_id: workspaceId,
    };

    await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${apiKey}:api_token`).toString('base64')}`
      },
    })
      .then(response => response.json())
      .then(data => console.log(`Added time for ${date} ${time}:`, data))
      .catch(error => console.error('Error:', error));
    //wait for 1 second to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

processWorklog();