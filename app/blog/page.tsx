import { fetchNotionDataSource, fetchNotionBlock } from "@/lib/notionFetch";
import { ImageObject, PropertyObjectType, TimeObject } from "../_components/utility/types";

async function Post({id, data}: {id: string, data: Record<string, PropertyObjectType>}){
  const COLOR_BADGE_MAP: Record<string, string> = {
    "Research": "badge-primary",
    "Misc": "badge-secondary",
    "Life": "badge-accent",
    "Work": "badge-info",
  }
  var image_url = ""
  var first_paragraph = ""

  await fetchNotionBlock(id).then((blocks) => {
    for (const block of blocks) {
      if(block !== null && block.type === "paragraph") {
        if (first_paragraph === "" && block.rich_text.length > 0) { 
          first_paragraph = block.rich_text.map((text) => text.text).join(" ");
        }
      }else if (block != null && block.type === 'image' && block.image) {
        // console.log(block.image.file ? block.image.file.url : (block.image.external ? block.image.external.url : ''));
        if (image_url === "") {
          image_url = block.image.file ? block.image.file.url : (block.image.external ? block.image.external.url : '');
        }
      }
    }


    if (first_paragraph.length > 100) {
      first_paragraph = first_paragraph.substring(0, 100) + "...";
    }

    if (image_url === "") {
      if (data.Tag && Array.isArray(data.Tag) && data.Tag.length > 0) {
        const first_tag = data.Tag[0] as Record<string, string>;
        if (first_tag.name === "Research") {
          image_url = "/quantum-computing.svg";
        } else if (first_tag.name === "Misc") {
          image_url = "/image.svg";
        } else if (first_tag.name === "Life") {
          image_url = "/image.svg";
        } else if (first_tag.name === "Work") {
          image_url = "/image.svg";
        } else{
          image_url = "/image.svg";
        }
      }
    }


  });

  
  // console.log(image_url);

  return (
    <>
      <a className="card bg-base-100 w-96 shadow-sm m-4 cursor-pointer hover:shadow-lg transition-shadow duration-300" href={`/blog/${id}`}>
      <figure>
        <img
          // src={image_url !== "" ? image_url : undefined}
          src={`/api/notion-image?url=${encodeURIComponent(image_url)}`}
          // alt={data.Name as string} 
          className="w-full h-48 rounded-lg shadow-lg object-cover mx-auto"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title"> 
            {data.Name as string}
        </h2>
          <p>{first_paragraph}</p>
          <div className="flex justify-between items-center">
            <div>{(data.PublishedDate as TimeObject).start}</div>
            <div className="flex gap-2">
              {data.Tags && Array.isArray(data.Tags) && data.Tags.length > 0 ? (
                data.Tags.map((tag, index) => (
                  <div key={index} className={`badge badge-soft badge-outline ${COLOR_BADGE_MAP[(tag as Record<string, string>).name]}`}>#{(tag as Record<string, string>).name}</div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </a>
    </>
  )

}

export default async function Home() {
  const data = await fetchNotionDataSource(
    process.env.BLOG_ID as string,
    [],
    {
      property: "Public",
      checkbox: {
        equals: true
      }
    }
  );
  // console.log(data);

  return (
    <>
      <div className="flex flex-col flex-row p-4">
        {data.map((item, index) => (
          <Post key={index} id={item.id} data={item.properties} />
        ))}
      </div>

      {/* <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-3 p-10">🚧 Blog Coming Soon! 🚧</h1>
      </div> */}
    </>
  );
}