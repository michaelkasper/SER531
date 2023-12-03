import {config} from "../config";
import {Connection} from "stardog";

export const stardogConnection = new Connection({
    username: config.api_username || '',
    password: config.api_password || '',
    endpoint: config.api_endpoint || '',
});
