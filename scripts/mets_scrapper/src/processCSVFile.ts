import fs from "fs";
import csv from "csv-parser";
import {Config} from "./types/Config";
import {CACHE_DELIMITER} from "./constants/cacheDelimiter";
import {loadCache} from "./utils/loadCache";
import {scrapeWebpage} from "./scrapeWebpage";
import {CsvData} from "./types/CsvData";
import {logInfo, logThinking} from "./utils/log";
import {formatNumber} from "./utils/formatNumber";
import kleur from "kleur";


type Response = { data: Array<CsvData>, processedCount: number, errorCount: number };

export async function processCSVFile(config: Config): Promise<Response> {
    const {startThinking, stopThinking} = logThinking();
    const validRows = [];
    const processedUrls = await loadCache(config.cacheFilePath);
    const csvStream = fs.createReadStream(config.inputFilePath).pipe(csv());
    let processedCount = 0;
    let errorCount = 0;

    function getThinkingMessage() {
        return kleur.yellow(`     Processed ${formatNumber(processedCount)} rows, Found ${formatNumber(validRows.length)} images`);
    }

    logInfo('Reading CSV Rows');
    startThinking(getThinkingMessage);
    for await (const row of csvStream) {
        if (validRows.length == config.processCount) {
            break;
        }

        processedCount++;

        const url = row['Link Resource'].trim();
        if (url in processedUrls) {
            if (processedUrls[url] !== 'null') {
                row.artUrl = processedUrls[url];
                validRows.push(row);
            }
            continue;
        }


        const [foundImage, hasError] = await scrapeWebpage(url);
        if (foundImage !== 'null') {
            row.artUrl = foundImage;
            validRows.push(row);
        }

        if (hasError) {
            errorCount++;
        }

        fs.appendFileSync(config.cacheFilePath, `${url}${CACHE_DELIMITER}${foundImage}\n`);
    }
    stopThinking();
    logInfo('Done Reading CSV Rows');

    return {data: validRows, processedCount, errorCount};
}
