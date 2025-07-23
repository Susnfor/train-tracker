const fetchDisruption = async () => {
    try {
        const res = await fetch (`/api/allDisruptions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching disruptions:', error);
        throw error;
    }
}
export default fetchDisruption;