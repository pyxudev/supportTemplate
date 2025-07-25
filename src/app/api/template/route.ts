export async function POST() {
    const dbUrl = process.env.TEMPLATE_LIST_AWS_LAMBDA as string;
    const response = await fetch(dbUrl);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
