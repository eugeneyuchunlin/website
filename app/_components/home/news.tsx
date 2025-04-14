import { fetchNotionDataBase } from "@/lib/notionFetch";
import Paragraph from "../renderer/paragraph";
import type { RichText, PropertyObjectType} from "@/app/_components/utility/types";


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
   const data = await fetchNotionDataBase(process.env.NEWS_ID as string); 
    return (
      <>
          {data.map((item, index) => (
              <NewsItem key={index} date={item.properties.Date} rich_text={item.properties.Description} />
            ))
          }
      </>
          
    ); 
  }