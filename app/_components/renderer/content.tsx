import { useEffect, useState } from "react";
import Paragraph from "@/app/_components/renderer/paragraph";
import type { Block } from "@/app/_components/utility/types";


export default function Content({API}: {API: string}) {
    const [content, setContent] = useState<Block[]> ([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch(API);
        const data = await res.json();
        setContent(data);
      };
  
      fetchData();
    }, []);
  
    return (
      <>
        {
          content.map((block, i) => {
              if (block.type === "paragraph") {
                return <Paragraph key={i} richText={block.rich_text} />;
              }
              return null;
            })
        }
      </>
    );
  }