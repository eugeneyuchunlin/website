import Paragraph from "../renderer/paragraph";
import { Client } from "@notionhq/client";
import { processProperties } from "@/lib/utils";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

function NewsItem({date, rich_text}: {date: string, rich_text: any}){
    return (
      <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="text-sm text-gray-500">{date} </div>
        <div className="text-lg">
          <Paragraph richText={rich_text} />
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

    const data = await res.results.map((block: any) => {
        return {
            id: block.id,
            properties: processProperties(block.properties),
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