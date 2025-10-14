import React, { useCallback, useEffect, useState } from 'react'

function useFetch(url = `https://v6.exchangerate-api.com/v6/d336b54a7f3a1fe937ed26c7/codes`) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()
    const [data, setData] = useState()

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const json = await res.json();
            console.log(json)
            setData(json);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }, []);


    useEffect(() => {
        fetchData();
    }, [fetchData]);
    // console.log(data)
    return { data, fetchData, isLoading, error }

}

export default useFetch
