'use client'
import Image from 'next/image';

function Bio(){
  return (
    <div className="flex flex-col mb-10">
      <h1 className="text-3xl font-bold mb-3">👋Hi, I'm Eugene Lin</h1>
      <p className="text-lg">
        I am a first-year Ph.D. student in Computer Sciences at the University of Wisconsin-Madison. 
        I am very fortunate to be advised by Dr. Swamit Tannu, focusing on quantum computer architecture. 
        In addition to this, my research interests encompass optimization and computer architecture.

        Before joining UW-Madison, I obtained my M.S. in Computer Science from Texas A&M University, 
        where I worked with Dr. Andreas Klappenecker on quantum algorithms and fault-tolerant quantum computing. 
      </p>
    </div>
  ); 
}

function NewsItem({title, date, description}: {title: string, date: string, description: string}){
  return (
    <div className="flex flex-col mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-gray-500">{date}</p>
      <p className="text-lg">{description}</p>
    </div>
  );
}

function News(){
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">📰News</h1>
      
      <p className="text-lg"></p>
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
        <Bio />
        <Background />
        <News />
      </div>
    </div>
  );
}
