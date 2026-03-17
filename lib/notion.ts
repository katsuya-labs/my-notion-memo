"use server";

/*** Notion API integration */
import { Client } from "@notionhq/client";
import { markdownToBlocks } from "@tryfabric/martian";
import { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints";

// initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

/**
 * Function to save to Notion
 * @param title Title
 * @param category Category
 * @param content Content (in Markdown format)
 */
export const saveToNotion = async (
  title: string,
  category: string,
  content: string,
) => {
  try {
    const blocks = markdownToBlocks(content) as BlockObjectRequest[];

    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID! },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
        Category: {
          select: {
            name: category,
          },
        },
      },
      children: blocks,
    });
    return { success: true, data: response };
  } catch (error) {
    console.error("Error saving to Notion:", error);
    return { success: false, error };
  }
};
