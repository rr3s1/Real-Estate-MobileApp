import { Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";

// Defines the options for the useAppwrite hook, including the async function, its parameters, and a skip condition.
interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
    fn: (params: P) => Promise<T>;
    params?: P;
    skip?: boolean;
}

// Defines the return structure of the hook.
interface UseAppwriteReturn<T, P> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: (newParams: P) => Promise<void>;
}

// Custom hook to abstract away API call logic, including loading, error, and data states.
export const useAppwrite = <T, P extends Record<string, string | number>>({
                                                                              fn,
                                                                              params = {} as P,
                                                                              skip = false,
                                                                          }: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(!skip);
    const [error, setError] = useState<string | null>(null);

    // useCallback hook to memoize the data fetching function.
    const fetchData = useCallback(
        async (fetchParams: P) => {
            setLoading(true);
            setError(null);

            try {
                // Execute the provided async function.
                const result = await fn(fetchParams);
                setData(result);
            } catch (err: unknown) {
                const errorMessage =
                    err instanceof Error ? err.message : "An unknown error occurred";
                setError(errorMessage);
                Alert.alert("Error", errorMessage);
            } finally {
                setLoading(false);
            }
        },
        [fn]
    );

    // useEffect to run the fetch function on component mount or when dependencies change.
    useEffect(() => {
        if (!skip) {
            fetchData(params);
        }
    }, [skip, JSON.stringify(params)]);

    // Function to manually re-trigger the data fetch.
    const refetch = async (newParams: P) => await fetchData(newParams);

    return { data, loading, error, refetch };
};