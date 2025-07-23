import { NextResponse } from "next/server";

export async function POST (request) {
    const {stoppointId} = await request.json();

    try {
        const res = await fetch(
        `https://api.tfl.gov.uk/StopPoint/${stoppointId}/Arrivals?app_key=${process.env.STOPPOINT_API_KEY}`
        );
        if (!res.ok) {
            throw new Error(`TFL API responded with status: ${res.status}`);
        }
        const data = await res.json();
        return NextResponse.json(data, { status: 200 });


    } catch (error) {
        console.error('Error in POST request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}