import { cache } from 'react';
import { Client } from '@notionhq/client';
import Paragraph from "@/app/_components/renderer/paragraph";
import { processRichText } from '../../../lib/utils';
import { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const fetchNotionBlock = cache(async (id: string | undefined) => {
  const response = await notion.blocks.children.list({
    block_id: id ?? '',
    page_size: 100,
  });

  const data = response.results
    .filter((block): block is ParagraphBlockObjectResponse => 
      'type' in block && block.type === 'paragraph')
    .map((block) => ({
      id: block.id,
      type: block.type,
      rich_text: processRichText(block.paragraph.rich_text),
    }));

  return data;
});


export default async function Content({API}: {API: string | undefined}) {

    const content = await fetchNotionBlock(API);
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