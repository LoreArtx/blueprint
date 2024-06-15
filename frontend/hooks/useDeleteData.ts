import { useState } from 'react';

interface DeleteDataResult {
    error: string | null;
    // eslint-disable-next-line no-unused-vars
    deleteData: (body: any) => Promise<void>;
}

const useDeleteData = (url: string): DeleteDataResult => {
    const [error, setError] = useState<string | null>(null);

    const deleteData = async (body: any) => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_SERVER_API_URL + url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    Object.entries(body).reduce((acc, [key, value]) => {
                        const titleCaseKey = key.replace(/\b\w/g, (char) => char.toUpperCase());
                        acc[titleCaseKey] = value;
                        return acc;
                    }, {} as Record<string, any>)
                ),
            });

            if (!response.ok) {
                throw new Error('Failed to delete data!');
            }

        } catch (error: any) {
            setError(error.message || 'An error occurred');
        }
    };

    return { error, deleteData };
};

export default useDeleteData;
