import {Connection, query} from "stardog";
import {config} from "../config";
import {useEffect, useState} from "react";

const stardogConnection = new Connection({
    username: config.api_username || '',
    password: config.api_password || '',
    endpoint: config.api_endpoint || '',
});


export function useStardog<R>(queryString: string) {
    const [error, setError] = useState<any>(null);
    const [results, setResults] = useState<Array<R>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        query.execute(
            stardogConnection,
            config.api_database || '',
            queryString,
            'application/sparql-results+json',
            {
                limit: 10,
                reasoning: true,
                offset: 0,
            }
        )
            .then((r) => {
                if (r.status !== 200) {
                    return setError(r);
                }

                setResults(r.body.results.bindings);

            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [queryString]);

    return {results, loading, error};
}
