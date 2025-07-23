const fetchSearch = async (location, mode = 'tube,dlr,overground,elizabeth-line,tram') => {
    try {
        const res = await fetch(`/api/searchLocation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                location: location,
                mode: mode
            })
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
}

export default fetchSearch;