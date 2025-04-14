import { cache } from 'react';
import { notion } from "@/lib/notion";
import { processRichText } from '@/lib/utils';

export const fetchNotionBlock = cache(async (id: string | undefined) => {
    const response = await notion.blocks.children.list({
        block_id: id ?? '',
        page_size: 100,
    });
  
    const data = await response.results.map((block) => {
        if ('type' in block) {
            return {
                id: block.id,
                type: block.type,
                rich_text: 'paragraph' in block ? processRichText(block.paragraph.rich_text || []) : [],
            };
        }
        return null;
    })
    return data;
  });