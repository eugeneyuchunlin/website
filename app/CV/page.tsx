import { ToolBox, Education } from "@carbon/icons-react";
import { fetchNotionDataSource } from "@/lib/notionFetch";
import InlineParagraph from "@/app/_components/renderer/inlineParagraph";
import { MultiSelectObject, PropertyObjectType, RichText, TimeObject } from "../_components/utility/types";
import Content from "@/app/_components/renderer/content";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 60;

function Time({ time }: { time: TimeObject }) {
  return (

      time.end ? (
        <span>{time.start} - {time.end}</span>
      ) : (
        <span>{time.start} - now</span>
      )
  );

}

function TimeLineBlock({ item }: { item: {
  id: string;
  properties: Record<string, PropertyObjectType>;
} }) {

  return (
    <>
        <time className="font-mono italic">
          <Time time={item.properties.Time as TimeObject} />
        </time>
        <div className="text-4xl font-black">
          <InlineParagraph  richText={item.properties.Affiliation as RichText[]} />
        </div>
        <div className="text-gray-900 font-semibold">
          <InlineParagraph richText={item.properties.Title as RichText[]} />
        </div>
        <div className="text-gray-500 w-full float-right">
          <Content API={item.id} />
        </div>
        {/* <div className="relative w-full h-20 flex">
            src={item.svg}
            alt="logo"
            className="object-contain"
            fill
          />
        </div> */}
    </>
  );
}

async function TimeLine() {
  
  const exp = await fetchNotionDataSource(process.env.EXP_ID as string, [
    {
      property: "Time",
      direction: "descending"
    },
  ]);
  exp.sort((a, b) => {

    const timeA = (a.properties.Time as TimeObject);
    const timeB = (b.properties.Time as TimeObject);
    const A = timeA.end ? new Date(timeA.end).getTime() : 0;
    const B = timeB.end ? new Date(timeB.end).getTime() : new Date().getTime();

    if (new Date(timeB.start).getTime() - new Date().getTime() > 0){
      return new Date(timeB.start).getTime() - new Date(timeA.start).getTime();
    }

    return B - A;
  });

  return (
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
      {exp.map((item, index) => (
        <li key={index}>
          <hr />
          <div className="timeline-middle">
            {
              item.properties.Type === "Education" ? (
                <Education size={32} className="text-gray-500" />
              ) : (
                <ToolBox size={32} className="text-gray-500" />
              )
            }
          </div>
          {
            item.properties.Type === "Education" ? (

              <div className="timeline-start mb-10 md:text-end">
                <TimeLineBlock item={item} />
              </div>
            ) : (
              <div className="timeline-end">
                <TimeLineBlock item={item} />
              </div>
            )
          }
          <hr />
        </li>
      ))}
    </ul>
  );
}

function Tags({tags} : {tags : MultiSelectObject []}){
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <div key={index} className={`
          bg-${tag.color}-200
          text-gray-900 dark:text-gray-200 
          rounded-full px-3 py-1 
          text-sm font-semibold mr-2`}>
          #{tag.name}
        </div>
      ))}
    </div>
  );
}

async function Publications() {
  const pubs = await fetchNotionDataSource(process.env.PUB_ID as string, [
    {
      property: "Year",
      direction: "descending"
    },
  ]);
  console.log(pubs);

  return (
    <>
      {pubs.map((item, index) => (
        <div key={index} className="bg-gray-50 w-full rounded-lg p-5">
          <InlineParagraph richText={item.properties.Authors as RichText[]} />, &nbsp;
          <InlineParagraph richText={item.properties.Title as RichText[]} />, &nbsp;
          <InlineParagraph richText={item.properties.Journal as RichText[]} />
          <div className="w-full flex">
            <Tags tags={item.properties.Tags as MultiSelectObject[]} /> 
          </div> 
        </div>
      ))}
    </>
  );
}


function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        {title}
      </h2>
      <div className="divider"></div>
      <div className="items-center justify-center">
        {children}
      </div>
    </div>
  );
}

async function Honors(){
  const honors = await fetchNotionDataSource(process.env.HONORS_ID as string, [
    {
      property: "Year",
      direction: "descending"
    },
  ]);
  console.log(honors);

  return (
    <>
      <ul className="list-disc list-inside">
        {honors.map((item, index) => (
          <li key={index} className="w-full">
            <InlineParagraph richText={item.properties.Title as RichText[]} />
            <InlineParagraph className="float-right" richText={item.properties.Year as RichText[]} />
          </li>
        ))}
      </ul>
    </>
  ); 
}



export default function Home() {
  return (
    <div>
      <div className="flex flex-col min-h-screen lg:pl-20 lg:pr-20 p-10 pt-20">
        <Section title="Education and Experience">
            <TimeLine />
        </Section>

        <Section title="Honors and Awards">
            <Honors />
        </Section>

        <Section title="Publications">
            <Publications />
        </Section>

        
      </div> 
    </div>
  )
}
