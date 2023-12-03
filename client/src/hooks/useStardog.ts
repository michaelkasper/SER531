import {useEffect, useState} from "react";
import {stardogQueryExecute} from "../utils/stardogQueryExecute";
import {stardogQueryExplain} from "../utils/stardogQueryExplain";
import {StardogExplained} from "../types/StardogExplained";

export function useStardog<R>(queryString: string | null, pageSize = 50) {
    const [error, setError] = useState<any>(null);
    const [hasMore, setHasMore] = useState<any>(true);
    const [currentPage, setCurrentPage] = useState<any>(0);
    const [lastPage, setLastPage] = useState<any>(0);
    const [results, setResults] = useState<Array<R>>([]);
    const [explained, setExplained] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const doQueryExecute = async (pageNumber = 0): Promise<Array<R>> => {
        if (!queryString) {
            return [];
        }

        try {
            const response = await stardogQueryExecute(queryString, {
                limit: pageSize,
                reasoning: true,
                offset: pageNumber * pageSize
            });

            setCurrentPage(pageNumber);
            setLastPage(pageNumber + 1);

            if (response.body.results.bindings.length < pageSize) {
                setHasMore(false);
                setLastPage(pageNumber);
            }
            return response.body.results.bindings
        } catch (err) {
            setError(err)
        }
        return [];
    };

    const doQueryExplain = async (pageNumber = 0): Promise<string | null> => {
        if (!queryString) {
            return null;
        }
        try {
            const response = await stardogQueryExplain(queryString, {
                limit: pageSize,
                reasoning: true,
                offset: pageNumber * pageSize
            });
            return response.body
        } catch (err) {
        }
        return null;
    };

    const getNextPage = async () => {
        if (hasMore) {
            setLoading(true);
            const newResults = await doQueryExecute(currentPage + 1);
            setResults([...results, ...newResults]);
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            setHasMore(true);
            setError(null);
            const [newResults, newExpain] = await Promise.all([
                await doQueryExecute(0),
                await doQueryExplain(0)
            ]);
            setResults([...newResults]);
            setExplained(newExpain);
            setLoading(false);
        })()

    }, [queryString, pageSize]);

    return {
        results,
        explained: {
            queryString,
            details: explained
        } as StardogExplained,
        loading,
        error,
        currentPage: (currentPage + 1),
        lastPage: (lastPage + 1),
        currentIsLastPage: currentPage === lastPage,
        getNextPage
    };
}
