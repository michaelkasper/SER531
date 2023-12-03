import {useEffect, useState} from "react";
import {stardogQueryExecute} from "../utils/stardogQueryExecute";
import {stardogQueryExplain} from "../utils/stardogQueryExplain";
import {StardogExplained} from "../types/StardogExplained";
import {StardogResponse} from "../types/StardogResponse";

export function useStardog<R>(queryString: string | null, pageSize = 50) {
    const [error, setError] = useState<any>(null);
    const [hasMore, setHasMore] = useState<any>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [requestLatency, setRequestLatency] = useState<number>(0);
    const [lastPage, setLastPage] = useState<number>(0);
    const [results, setResults] = useState<Array<R>>([]);
    const [explained, setExplained] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const doQueryExecute = async (pageNumber = 0): Promise<StardogResponse<R>> => {
        if (!queryString) {
            return {results: [], requestLatency: 0};
        }

        try {
            const {response, requestLatency} = await stardogQueryExecute(queryString, {
                limit: pageSize,
                reasoning: false,
                offset: pageNumber * pageSize
            });

            setCurrentPage(pageNumber);
            setLastPage(pageNumber + 1);

            if (response.body.results.bindings.length < pageSize) {
                setHasMore(false);
                setLastPage(pageNumber);
            }
            return {results: response.body.results.bindings, requestLatency}
        } catch (err) {
            setError(err)
        }
        return {results: [], requestLatency: 0};
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
            const {results: newResults} = await doQueryExecute(currentPage + 1);
            setResults([...results, ...newResults]);
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            setHasMore(true);
            setError(null);
            const [{results: newResults, requestLatency}, newExplain] = await Promise.all([
                await doQueryExecute(0),
                await doQueryExplain(0)
            ]);
            setResults([...newResults]);
            setExplained(newExplain);
            setRequestLatency(requestLatency);
            setLoading(false);
        })()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryString, pageSize]);

    return {
        results,
        explained: {
            queryString,
            requestLatency,
            details: explained,
        } as StardogExplained,
        loading,
        error,
        currentPage: (currentPage + 1),
        lastPage: (lastPage + 1),
        currentIsLastPage: currentPage === lastPage,
        getNextPage
    };
}
