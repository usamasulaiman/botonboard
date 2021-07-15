import axios from "axios";

export const notionInstance = axios.create({
  baseURL: 'https://api.notion.com/',
  headers: {
    Authorization: `Bearer ${process.env.NOTION_KEY}`,
    "Content-Type": "application/json",
    "Notion-Version": "2021-05-13",
  }
});