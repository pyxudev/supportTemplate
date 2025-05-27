export async function POST() {
    const dbUrl = "https://pgw4s4ucnbaqq53432jeno4v440ufjpk.lambda-url.ap-northeast-1.on.aws/";
    const response = await fetch(dbUrl);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}