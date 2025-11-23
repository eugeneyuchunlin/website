import Paragraph from "../renderer/paragraph";
import type { RichText, PropertyObjectType, TimeObject} from "@/app/_components/utility/types";
import { fetchNotionDataSource } from "@/lib/notionFetch";


function NewsItem({date, rich_text}: {date: PropertyObjectType, rich_text: PropertyObjectType}) {
    return (
      <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="text-lg text-gray-500">
          {date && typeof date === "object" && "start" in date
            ? (date as TimeObject).start
            : "date"}
        </div>
        <div className="text-lg">
          { <Paragraph richText={rich_text as unknown as RichText[]} /> }
        </div>
      </div>
    );
}

export default async function News(){
  const data = await fetchNotionDataSource(process.env.NEWS_ID as string, [{'property': 'Date', direction: 'descending'}]); 
    return (
      <>
          {data.map((item, index) => (
              <NewsItem key={index} date={item.properties.Date} rich_text={item.properties.Description} />
            ))
          }
      </>
          
    ); 
  }