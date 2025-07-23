import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { location, mode = 'tube,dlr,overground,elizabeth-line,tram' } = await request.json();
        
        if (!location) {
            return NextResponse.json({ error: 'Location is required' }, { status: 400 });
        }
        
        const res = await fetch(
            `https://api.tfl.gov.uk/Stoppoint/Search/${encodeURIComponent(location)}?modes=${mode}`
        );

        if (!res.ok) {
            throw new Error(`TFL API responded with status: ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('Error fetching search location:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch search location', 
            message: error.message 
        }, { status: 500 });
    }
}