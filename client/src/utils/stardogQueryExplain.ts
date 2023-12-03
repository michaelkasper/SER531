import {config} from "../config";
import {stardogConnection} from "./stardogConnection";
import {query} from "stardog";

export const stardogQueryExplain = (queryString: string, params: object) => (
    query.explain(
        stardogConnection,
        config.api_database || '',
        queryString,
        'text/plain',
        {
            reasoning: true,
            ...params
        }
    ).then((response) => {
        if (response.status !== 200) {
            throw(response);
        }
        return response;
    })

)
