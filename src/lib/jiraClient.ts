import { Version3Client } from "jira.js";
import JiraClient from "jira-connector"
import dotenv from "dotenv";

dotenv.config();

export const jira  = new Version3Client({
    host: process.env.JIRA_HOST!,
    authentication: {
        basic: {
            email: process.env.JIRA_EMAIL!,
            apiToken: process.env.JIRA_API_TOKEN!,
        },
    },
})



export const jiraConnectorClient = new  JiraClient({
    host: "rit.atlassian.net",
    basic_auth: {
        email: process.env.JIRA_EMAIL!,
        api_token: process.env.JIRA_API_TOKEN!,
    },
})