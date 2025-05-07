import { notion } from "@/lib/notion";
import { cache } from 'react';
import { processRichText, processProperties } from '@/lib/utils';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

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

export const fetchNotionDataBase = cache(async (id: string, sort?: any)  => {
    const res = await notion.databases.query({
        database_id: id,
        sorts: sort,
    });

    const data = await res.results.map((block) => {
        const page = block as PageObjectResponse;
        return {
            id: page.id,
            properties: processProperties(page.properties),
        }
    });

    return data;
});