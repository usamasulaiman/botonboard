const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export default async (req, res) => {
  const response = await notion.databases.retrieve({ database_id: process.env.NOTION_FUNCTION_DB });
  res.status(200).json({ response })
}
