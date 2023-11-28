import {Connection, query} from "stardog";
import {config} from "../config";
import {useEffect, useState} from "react";

const stardogConnection = new Connection({
    username: config.api_username || '',
    password: config.api_password || '',
    endpoint: config.api_endpoint || '',
});

export function useStardog<R>(queryString: string, pageSize = 50) {
    const [error, setError] = useState<any>(null);
    const [hasMore, setHasMore] = useState<any>(true);
    const [page, setPage] = useState<any>(0);
    const [results, setResults] = useState<Array<R>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const doQuery = () => {
        setLoading(true);
        query.execute(
            stardogConnection,
            config.api_database || '',
            queryString,
            'application/sparql-results+json',
            {
                limit: pageSize,
                reasoning: true,
                offset: page,
            }
        )
            .then((r) => {
                if (r.status !== 200) {
                    return setError(r);
                }

                if (r.body.results.bindings.length === false) {
                    hasMore(false);
                }

                setResults([...results, ...r.body.results.bindings]);
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
            setPage(page + 1);
            doQuery();
        }
    };

    useEffect(() => {
        setResults([]);
        setHasMore(true);
        setError(null);
        setPage(0);
        doQuery();
    }, [queryString, pageSize]);

    return {
        results,
        loading,
        error,
        currentPage: (page + 1),
        lastPage: hasMore ? (page + 2) : (page + 1),
        getNextPage
    };
}
