import { Client } from '@notionhq/client';
import { cache } from 'react';
import type { NextRequest } from 'next/server';
import { processProperties } from '@/lib/utils';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
export const revalidate = 3600; // 1 hour

const fetchNotionDatabase = cache(async (id: string) => {
    const response = await notion.databases.query({
        database_id: id,
    });

    const data = await response.results.map((block: any) => {
        return {
            id: block.id,
            properties: processProperties(block.properties)
        }
    })
    return data;
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await fetchNotionDatabase(id);

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}