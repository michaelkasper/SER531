import fs from 'fs';
import {AsyncParser} from '@json2csv/node';
import {processCSVFile} from "./processCSVFile";
import kleur from 'kleur';
import {logError, logHeader, logInfo, logThinking} from "./utils/log";
import {formatElapsedTime} from "./utils/formatElapsedTime";
import {Config} from "./types/Config";

async function main(config: Config) {
    logHeader('Script Execution Started');
    const startTime = new Date().getTime();
    let results = [];
    let totalErrorCount = 0;
    let totalCount = 0;

    try {
        logHeader('Process CSV File');
        const {data, processedCount, errorCount} = await processCSVFile(config);

        results = data;
        totalErrorCount += errorCount;
        totalCount += processedCount;

        logHeader('Saving Results');
        const {startThinking, stopThinking} = logThinking('  ');
        startThinking()
        if (fs.existsSync(config.outputFilePath)) {
            fs.unlinkSync(config.outputFilePath);
        }
        const csv = await new AsyncParser().parse(results).promise();
        fs.writeFileSync(config.outputFilePath, csv);
        stopThinking()

    } catch (error: any) {
        logError(`Error: ${error.message}`);
    }
    const endTime = new Date().getTime();

    logHeader('Script Execution Complete');
    logHeader('Summary:');
    logInfo(`Total URLs processed: ${kleur.blue(totalCount)}`);
    logInfo(`Successful retrievals: ${kleur.green(results.length)}`);
    logInfo(`Errors encountered: ${kleur.red(totalErrorCount)}`);
    logInfo(`Total Elapsed Time: ${kleur.yellow(`${formatElapsedTime(endTime - startTime)}`)}`);

}

main({
    inputFilePath: __dirname + '/resources/post_processed_met_objects.csv',
    outputFilePath: __dirname + '/resources/output.csv',
    cacheFilePath: __dirname + '/resources/processed_urls.txt',
    processCount: 10000
});
