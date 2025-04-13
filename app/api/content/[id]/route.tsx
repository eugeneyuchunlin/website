import { cache } from 'react';
import type { NextRequest } from 'next/server';
import { Client } from '@notionhq/client';
import { processRichText } from '@/app/_components/utility/utils';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const revalidate = 3600; // 1 hour

const fetchNotionBlock = cache(async (id: string) => {
    const response = await notion.blocks.children.list({
        block_id: id,
        page_size: 100,
    });

    const data = await response.results.map((block: any) => {
        return {
            id: block.id,
            type: block.type,
            rich_text: processRichText(block.paragraph.rich_text),
        }
    })
    return data;
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await fetchNotionBlock(id);


    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}