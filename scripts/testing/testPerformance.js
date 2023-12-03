const fs = require('fs');
const path = require('path');

const { stardogQueryExecute } = require('../../client/src/utils/stardogQueryExecute');
const { stardogArtistArtworksQuery, stardogArtworkQuery, stardogArtworksSearchQuery, stardogLocationArtworksQuery } = require('../../../client/src/api');

// Sample parameters for queries
const sampleArtistURI = 'http://example.org/artist/1'; 
const sampleArtworkURI = 'http://example.org/artwork/1';
const sampleSearchString = 'Monet';
const sampleLocationURI = 'http://example.org/location/1';

const queries = [
    { query: stardogArtworkQuery, params: { artworkURI: sampleArtworkURI } },
    { query: stardogArtistArtworksQuery, params: { artistURI: sampleArtistURI } },
    { query: stardogArtworksSearchQuery, params: { searchString: sampleSearchString } },
    { query: stardogLocationArtworksQuery, params: { locationURI: sampleLocationURI } },
];

async function executeQuery(query, params) {
    const startTime = process.hrtime.bigint();
    await stardogQueryExecute(query, params);
    const endTime = process.hrtime.bigint();
    return Number(endTime - startTime) / 1e6; // convert to milliseconds
}

function generateHTML(results) {
    let htmlContent = '<!DOCTYPE html><html><head><title>Query Performance Results</title></head><body>';
    htmlContent += '<h1>Stardog Query Performance Results</h1>';
    htmlContent += '<table border="1"><tr><th>Query</th><th>Execution Time (ms)</th></tr>';

    results.forEach(result => {
        htmlContent += `<tr><td>${result.query}</td><td>${result.time}</td></tr>`;
    });

    htmlContent += '</table>';
    htmlContent += '</body></html>';
    return htmlContent;
}

async function measurePerformance() {
    let totalTime = 0;
    let totalQueries = 0;
    let results = [];

    for (let { query, params } of queries) {
        const execTime = await executeQuery(query, params);
        results.push({ query: query.name, time: execTime });
        totalTime += execTime;
        totalQueries++;
    }

    const throughput = totalQueries / (totalTime / 1000); // queries per second
    results.push({ query: 'Throughput', time: `${throughput} queries/second` });

    const htmlFilePath = path.join(__dirname, '../../', 'performanceResults.html');
    const htmlContent = generateHTML(results);
    fs.writeFileSync(htmlFilePath, htmlContent); // Write results to HTML file
    console.log(`Performance results written to ${htmlFilePath}`);
}

measurePerformance();
