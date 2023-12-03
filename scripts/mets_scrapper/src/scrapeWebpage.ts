import * as cheerio from "cheerio";
import {logError} from "./utils/log";

type HasError = boolean;
type Response = [string | null, HasError];

export async function scrapeWebpage(url: string): Promise<Response> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            logError(`HTTP error! Status: ${response.status}`);
            return ['null', true];
        }

        const html = await response.text();
        const $ = cheerio.load(html);
        const imgSrc = $('img.artwork__image').attr('src');
        return [imgSrc || 'null', false];
    } catch (error: any) {
        logError(`Error scraping ${url}: ${error.message}`);
        return ['null', true];
    }
}
