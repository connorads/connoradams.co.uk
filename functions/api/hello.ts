export async function onRequestPost(context: { request: Request }) {
  const { request } = context;

  const json = await request.json();
  console.log(JSON.stringify(json, null, 2));
  return new Response(JSON.stringify(json));
}
