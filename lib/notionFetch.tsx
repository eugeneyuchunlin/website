import { notion } from "@/lib/notion";
import { cache } from 'react';
import { processRichText, processProperties } from '@/lib/utils';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { QueryDataSourceParameters } from "@notionhq/client/build/src/api-endpoints";
import { ImageObject } from "@/app/_components/utility/types";

export const fetchNotionBlock = cache(async (id: string | undefined) => {
    const response = await notion.blocks.children.list({
        block_id: id ?? '',
        page_size: 100,
    });

    const data = response.results.map((block) => {
        if ('type' in block) {
            return {
                id: block.id,
                type: block.type,
                rich_text: 'paragraph' in block ? processRichText(block.paragraph.rich_text || []) : [],
                image: 'image' in block ? block.image as ImageObject : undefined
            };
        }
        return null
    })
    return data;
  });

export const fetchNotionDataSource = cache(async (id: string, sorts?: QueryDataSourceParameters['sorts'], filter?: QueryDataSourceParameters['filter'])  => {
    const res = await notion.dataSources.query({
        data_source_id: id,
        sorts: sorts,
        filter: filter,
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

export const fetchNotionDataBase = cache(async (id: string)  => {
    const res = await notion.databases.retrieve({
        database_id: id,
    });

    return res;
});