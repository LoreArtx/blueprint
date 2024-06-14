const asyncFetchData = async <T>(url: string): Promise<T | null> => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_API_URL + url);
        if (!response.ok) throw new Error("Failed to fetch data!");
        const fetchedData: T = await response.json();
        return fetchedData;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export default asyncFetchData;
