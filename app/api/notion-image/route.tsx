export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) return new Response("Missing URL", { status: 400 });

  const res = await fetch(imageUrl);
  const blob = await res.blob();
  
  return new Response(blob, {
    headers: { "Content-Type": res.headers.get("Content-Type") || "image/jpeg" }
  });
}