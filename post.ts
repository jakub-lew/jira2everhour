import toAdd from './jira_worklog.json';
import config from './asana_config.json';

const apiKey = config.API_KEY;
const task_id = config.TASK_ID;
const user_id = config.USER_ID;
const url = `https://api.everhour.com/tasks/${task_id}/time`

async function processWorklog() {
  for (const item of toAdd) {
    const date = item.date;
    const time = item.time;
    const body = {
      date: date,
      time: time,
      user: user_id,
      comment: item.comment || ""
    };

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => console.log(`Added time for ${date} ${time}:`, data))
    .catch(error => console.error('Error:', error));
    //wait for 1 second to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

processWorklog();