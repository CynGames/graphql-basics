import { useState, useCallback } from 'react';

export const useNotification = () => {
    const [message, setMessage] = useState<string | null>(null);

    const notify = useCallback((message: string) => {
        setMessage(message);
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    }, []);

    return { message, notify };
};
