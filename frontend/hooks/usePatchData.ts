import { useState } from 'react';

interface PatchDataResult<T> {
    error: string | null;
    patchData: (body: any) => Promise<void>;
}

const usePatchData = <T>(url: string): PatchDataResult<T> => {
    const [error, setError] = useState<string | null>(null);

    const patchData = async (body: any) => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_SERVER_API_URL +  url, {
                method: 'PATCH',
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
                throw new Error('Failed to patch data!');
            }

        } catch (error: any) {
            setError(error.message || 'An error occurred');
        }
    }

    return { error, patchData };
};

export default usePatchData;
