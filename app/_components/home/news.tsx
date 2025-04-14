import Paragraph from "../renderer/paragraph";
import { Client } from "@notionhq/client";
import { processProperties } from "@/lib/utils";
import type { RichText, PropertyObjectType } from "@/app/_components/utility/types";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

function NewsItem({date, rich_text}: {date: PropertyObjectType, rich_text: PropertyObjectType}) {
    return (
      <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="text-sm text-gray-500"> {typeof date === 'string' ? date : ''} </div>
        <div className="text-lg">
          { <Paragraph richText={rich_text as unknown as RichText[]} /> }
        </div>
      </div>
    );
}

export default async function News(){
    const res = await notion.databases.query({
        database_id: "1d0fc1f89ce380ac9d99fde7060ea551",
        sorts: [
            {
                property: "Date",
                direction: "descending",
            },
        ],
    });

    const data = await res.results.map((block) => {
        const page = block as PageObjectResponse;
        return {
            id: page.id,
            properties: processProperties(page.properties),
        }
    });
   
    return (
      <>
          {data.map((item, index) => (
              <NewsItem key={index} date={item.properties.Date} rich_text={item.properties.Description} />
            ))
          }
      </>
          
    ); 
  }