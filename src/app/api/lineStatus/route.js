import { NextResponse } from 'next/server';

export async function GET () {
    try {
        const res = await fetch(
        `https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground,elizabeth-line,tram/Status?detail=true&app_key=${process.env.DISRUPTIONS_API_KEY}` 
        );
        if (!res.ok) {
            throw new Error(`TFL API responded with status: ${res.status}`);
        }
        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
    }
    catch (error) {
        console.error('Error fetching line status:', error);
        return NextResponse.json({ error: 'Failed to fetch line status', message: error.message }, { status: 500 });
    }
}