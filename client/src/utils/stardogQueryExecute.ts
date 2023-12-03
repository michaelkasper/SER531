import {config} from "../config";
import {stardogConnection} from "./stardogConnection";
import {query} from "stardog";

export const stardogQueryExecute = (queryString: string, params: object) => (
    query.execute(
        stardogConnection,
        config.api_database || '',
        queryString,
        'application/sparql-results+json',
        {
            reasoning: true,
            ...params
        }
    ).then((response) => {
        if (response.status !== 200) {
            console.error('response', response);
            throw(response.body);
        }
        return response;
    })

)
