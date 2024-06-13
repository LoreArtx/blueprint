import { useEffect, useState } from 'react';

interface PostDataResult<T> {
    error: string | null;
    postData: (body:any)=>Promise<void>
}

const usePostData = <T>(url: string): PostDataResult<T> => {
    const [error, setError] = useState<string | null>(null);

    const postData = async(body: any)=>{
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_SERVER_API_URL + url, {
                method: 'POST',
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
                throw new Error('Failed to post data!');
            }

        } catch (error: any) {
            setError(error.message || 'An error occurred');
        }
        }

    return { error, postData };
};

export default usePostData;
