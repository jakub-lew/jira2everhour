# jira2everhour

This is a very simple tool which helped me to pull times for a task from Jira worklogs, save them as json, and push the times to an Everhour task (in my case Everhour is connected to Asana but it should work for different origins as well).  
It was several hours of work, but I hope it can spare this time to others, especially if they copy-paste their times from one worklog into another. 

## Prerquisites
+ To make it work you must fill the information in asana_config.json and jira_config.json, according to their templates file (*_template.config).

## Scripts 
+ npm jira to pull the data from Jira
+ npm check for a small summary of the saved json
+ npm post to post the data to Everhour 

## Note:
+ Contributions are very welcome. 
+ It's been written in a quick & dirty way, but it does the job. The time was very limited :)

