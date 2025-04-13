'use client'

import { useEffect, useState } from "react";
import Content from "@/app/_components/renderer/content";
import Paragraph from "@/app/_components/renderer/paragraph";

function Bio(){
  
  return (
    <div className="flex flex-col mb-10">
      <h1 className="text-3xl font-bold mb-3">👋Hi, I'm Eugene Lin</h1>
        <Content API="/api/content/1d0fc1f89ce3800cb65cf1b7970d6048" />
    </div>
  ); 
}

function NewsItem({date, rich_text}: {date: string, rich_text: any}){
  console.log("rich_text", rich_text);
  return (
    <div className="mb-4">
      <div className="text-sm text-gray-500">{date} </div>
      <div className="text-lg">
        <Paragraph richText={rich_text} />
      </div>
    </div>
  );
}

function News(){
  // const newsItems = []
  // const regex = /-\s*\*\*(\d{4}\/\d{1,2}\/\d{1,2})\*\*:\s*(.*)/g;

  // let match;
  // while((match = regex.exec(content)) !== null) {
  //   newsItems.push({
  //     date: marked.parse(match[1], { async: false }),
  //     description: marked.parse(match[2], { async: false })
  //   });
  // }

  // console.log(content);
  const [newsData, setNewsData] = useState<{ date: string; description: any }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/database/1d0fc1f89ce380ac9d99fde7060ea551");
      const data = await res.json();
      console.log("data", data);
      const news = data.map((item: any) => {
        return {
          date: item.properties.Date,
          description: item.properties.Description
        } 
      });
      console.log("news", news);
      setNewsData(news);
    };
    fetchData();
  }, []);
 
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">📰News</h1>
      <div className="flex flex-col mb-10">
        {newsData.map((item, index) => (
            <NewsItem key={index} date={item.date} rich_text={item.description} />
          ))
        }
      </div>
    </div>
  ); 
}

function Background (){
    return (
      <div className="flex item-center justify-center flex-col md:flex-row">
        <div className="flex-2 mb-10">
          <h2 className="text-3xl font-bold mb-3 ">Interests</h2>
          <ul className="rounded-base-100">

            <li className="text-lg mb-3">
              <img src="/quantum-computing.svg" alt="quantum-computing" className="h-8 w-8 inline-block mr-2" />
              Fault-tolerant Quantum Computing
            </li>
            <li className="text-lg mb-3">
              <img src="/optimization.svg" alt="optimization" className="h-8 w-8 inline-block mr-2" />
              Optimization
            </li>
            <li className="text-lg mb-3">
              <img src="/chip.svg" alt="computer-architecture" className="h-8 w-8 inline-block mr-2" />   
              Computer Architecture
            </li>
          </ul>
        </div> 

        <div className="flex-3 mb-10">
          <h2 className="text-3xl font-bold mb-3 ">Education</h2>
          <ul className="list-inside list-image-[url(/book.svg)]">
            <li className="text-lg mb-3">
              {/* <img src="/book.svg" alt="book" className="h-5 w-5 inline-block mr-2" /> */}
              Ph.D. in Computer Sciences, <br />University of Wisconsin-Madison (2025-present)
            </li>
            <li className="text-lg mb-3">M.S. in Computer Science <br /> Texas A&M University (2023-2025)</li>
            <li className="text-lg mb-3">B.S. in Computer Science and Information Engineering <br /> National Cheng Kung University (2017-2022)</li>
          </ul>
        </div> 

      </div>
    )
}


export default function Home() {

  return (
    <div className="relative">
      {/* <BubbleAnimation /> */}
      <div className="items-center min-h-screen bg-gray-100/30 lg:pl-40 lg:pr-40 p-10 pt-20">
        <Bio/>
        <Background />
        <News/>
      </div>
    </div>
  );
}
