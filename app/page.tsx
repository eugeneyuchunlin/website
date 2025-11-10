import Content from "@/app/_components/renderer/content";
import { Suspense } from "react";
import {LoadingBio, LoadingMisc, LoadingNews} from "./_components/home/loading";
import News from "@/app/_components/home/news";
import Misc from "@/app/_components/home/misc";
import Image from "next/image";

// export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 60; // 1 minute

async function Bio(){
  
  return (
    <div className="flex flex-col mb-10">
      <h1 className="text-3xl font-bold mb-3">👋Hi, I&apos;m Eugene Lin</h1>
        <Content API={process.env.BIO_ID}/>
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
              <Image src="/quantum-computing.svg" alt="quantum-computing" className="h-8 w-8 inline-block mr-2" width={0} height={0}/>
              Fault-tolerant Quantum Computing
            </li>
            <li className="text-lg mb-3">
              <Image src="/optimization.svg" alt="optimization" className="h-8 w-8 inline-block mr-2" width={0} height={0}/>
              Optimization
            </li>
            <li className="text-lg mb-3">
              <Image src="/chip.svg" alt="computer-architecture" className="h-8 w-8 inline-block mr-2" width={0} height={0}/>   
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

export default async function Home() {
  return (
    <div className="relative">
      <div className="items-center min-h-screen bg-gray-100/30 lg:pl-40 lg:pr-40 p-10 pt-20">
        <Suspense  fallback={<LoadingBio />}>
          <Bio/>
        </Suspense>
        <Background />

        

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">📰News</h1>
          <div className="flex flex-col mb-10 h-96 overflow-y-scroll">
            <Suspense fallback={<LoadingNews />}>
              <News/>
            </Suspense>
          </div>
        </div>

        <div className="flex flex-col mb-10">
          <h1 className="text-3xl font-bold mb-3">🎶Misc</h1>
          <Suspense fallback={<LoadingMisc />}>
            <Misc />
          </Suspense>
        </div>
      </div>
        
    </div>
  );
}
