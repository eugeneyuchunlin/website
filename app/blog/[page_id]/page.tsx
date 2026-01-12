import { fetchNotionBlock, fetchNotionDataSource, fetchNotionPage } from "@/lib/notionFetch"
import Paragraph from "@/app/_components/renderer/paragraph";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function Title({ text }: { text: string }) {
    return (
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{text}</h1>
    );
}


export default async function Page({
  params,
}: {
  params: Promise<{ page_id: string }>
}) {
  const { page_id } = await params;

  const blocks = await fetchNotionBlock(page_id, 100);
  const page = await fetchNotionPage(page_id);

  return (
    <div className="items-center min-h-screen bg-gray-100/30 lg:pl-40 lg:pr-40 p-10 pt-20">
        <Title text={page.properties.Name as string} />
        <div className="divider mt-5 mb-5"></div>
        {blocks.map((block) => (
          block && block.type === "paragraph" ?
            <Paragraph key={block.id} richText={block.rich_text} /> :
            block && block.type === "image" && block.image ?
            <img 
              key={block.id}
              src={`/api/notion-image?url=${encodeURIComponent(block.image.type === 'external' && block.image.external ? block.image.external.url : 
                    block.image.type === 'file' && block.image.file ? block.image.file.url : '')}`}
              alt="Notion Image"
              className="my-4 rounded-lg shadow-lg object-cover"
            /> :
            null
        )) }
    </div>
  )
  
  
}