import {config} from "../config";
import {stardogConnection} from "./stardogConnection";
import {query} from "stardog";

export const stardogQueryExecute = (queryString: string, params: object) => {
    const startTime = new Date().getTime();
    return query.execute(
        stardogConnection,
        config.api_database || '',
        queryString,
        'application/sparql-results+json',
        {
            reasoning: true,
            ...params
        }
    ).then((response) => {
        const endTime = new Date().getTime();
        if (response.status !== 200) {
            console.error('response', response);
            throw(response.body);
        }
        return {response, requestLatency: endTime - startTime};
    });
}
