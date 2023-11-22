import fs from "fs";
import es from "event-stream";
import {logError, logInfo} from "./log";
import {CACHE_DELIMITER} from "../constants/cacheDelimiter";

export async function loadCache(cachePath: string): Promise<Record<string, string>> {
    return new Promise((resolve, reject) => {
        logInfo('Loading Cache');
        const cache: Record<string, string> = {};
        try {
            const stream = fs.createReadStream(cachePath, 'utf-8')
                .pipe(es.split())
                .pipe(es.mapSync(function (line: string) {
                        stream.pause();

                        const [url, foundUrl] = line.split(CACHE_DELIMITER);
                        cache[url] = foundUrl;
                        stream.resume();
                    })
                        .on('error', function (error) {
                            logError(`Error while reading file: ${error.message}`);
                        })
                        .on('end', function () {
                            resolve(cache);
                        })
                );
            logInfo('Cache Loaded');
        } catch (error: any) {
            logError(`Error loading cache: ${error.message}`);
            reject(error);
        }
    });
}
