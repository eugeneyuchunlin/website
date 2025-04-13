'use client';
import { useEffect, useState } from "react";
import Paragraph from "../_components/renderer/paragraph";

export default function Home() {
  const [content, setContent] = useState<any[]> ([]);

  useEffect(() => {
    const fetchContent = async () => {
      const res = await fetch('/api/content/1d0fc1f89ce3800cb65cf1b7970d6048');
      setContent(await res.json());
      console.log("res", res.json());
      console.log("content", content);
    };

    fetchContent();
  }, []);

  return (
    <>
      {
        content.map((block, i) => {
            if (block.type === "paragraph") {
              return <Paragraph key={i} richText={block.paragraph.rich_text} />;
            }
            return null;
          })
      }
    </>
      
  );
}