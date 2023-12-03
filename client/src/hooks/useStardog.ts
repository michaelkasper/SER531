import {Connection, query} from "stardog";
import {config} from "../config";
import {useEffect, useState} from "react";

const stardogConnection = new Connection({
    username: config.api_username || '',
    password: config.api_password || '',
    endpoint: config.api_endpoint || '',
});

export function useStardog<R>(queryString: string | null, pageSize = 50) {
    const [error, setError] = useState<any>(null);
    const [hasMore, setHasMore] = useState<any>(true);
    const [currentPage, setCurrentPage] = useState<any>(0);
    const [lastPage, setLastPage] = useState<any>(0);
    const [results, setResults] = useState<Array<R>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const doQuery = (pageNumber = 0, appendResults = false) => {
        if (!queryString) {
            return;
        }
        setLoading(true);
        query.execute(
            stardogConnection,
            config.api_database || '',
            queryString,
            'application/sparql-results+json',
            {
                limit: pageSize,
                reasoning: true,
                offset: pageNumber * pageSize
            }
        )
            .then((r) => {
                if (r.status !== 200) {
                    return setError(r);
                }

                if (r.body.results.bindings.length < pageSize) {
                    setHasMore(false);
                    setLastPage(pageNumber);
                } else {
                    setLastPage(pageNumber + 1);
                }

                setCurrentPage(pageNumber);
                setResults([...(appendResults ? results : []), ...r.body.results.bindings]);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getNextPage = () => {
        if (hasMore) {
            doQuery(currentPage + 1, true);
        }
    };

    useEffect(() => {
        setHasMore(true);
        setError(null);
        doQuery(0, false);
    }, [queryString, pageSize]);

    return {
        results,
        loading,
        error,
        currentPage: (currentPage + 1),
        lastPage: (lastPage + 1),
        currentIsLastPage: currentPage === lastPage,
        getNextPage
    };
}
