import { fetchNotionDataBase } from "@/lib/notionFetch";
import { PropertyObjectType, TimeObject } from "../_components/utility/types";
import InlineParagraph from "../_components/renderer/inlineParagraph";
import Sidebar from "../_components/sidebar/sidebar";

function Post({data}: {data: Record<string, PropertyObjectType>}){


const COLOR_BADGE_MAP: Record<string, string> = {
  "Research": "badge-primary",
  "Misc": "badge-secondary",
  "Life": "badge-accent",
  "Work": "badge-info",
}

console.log(typeof data);
if (!data.Public){
  return <></>
}

const id = data.id;

return (
  <>
    <div className="card bg-base-100 w-96 shadow-sm m-4">
    <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title"> 
          {data.Name as string}
      </h2>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
        <div className="flex justify-between items-center">
          <div>{(data.PublishedDate as TimeObject).start}</div>
          <div className="flex gap-2">
            {data.Tags && Array.isArray(data.Tags) && data.Tags.length > 0 ? (
              data.Tags.map((tag, index) => (
                <div key={index} className={`badge badge-soft badge-outline ${COLOR_BADGE_MAP[(tag as any).name]}`}>#{(tag as any).name}</div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
)

}

export default async function Home() {
  const data = await fetchNotionDataBase(process.env.BLOG_ID as string);
  console.log(data);

  return (
    <>
      <div className="flex flex-col flex-row p-4">
        {data.map((item, index) => (
          <Post key={index} data={item.properties} />
        ))}
      </div>
    </>
  );
}