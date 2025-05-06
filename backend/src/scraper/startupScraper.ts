import axios from 'axios';
import * as cheerio from 'cheerio';

interface ScrapingResult {
    repos: string[];
    error?: string;
}

export async function scrapeStartupRepos(mainPageUrl: string): Promise<ScrapingResult> {
    try {
        // Fetch the main page
        const mainPageResponse = await axios.get(mainPageUrl);
        const $ = cheerio.load(mainPageResponse.data as string);
        
        // Extract all startup detail page links
        const startupLinks: string[] = [];
        $('a[href*="/companies/"]').each((_: number, element) => {
            const href = $(element).attr('href');
            if (href && !href.includes('query=')) {
                startupLinks.push(`https://www.ycombinator.com${href}`);
            }
        });

        // Deduplicate startup links
        const uniqueStartupLinks = [...new Set(startupLinks)];
        
        // Visit each startup page and collect GitHub links
        const allRepos = new Set<string>();
        
        for (const link of uniqueStartupLinks) {
            try {
                const startupResponse = await axios.get(link);
                const startup$ = cheerio.load(startupResponse.data as string);
                
                // Look for GitHub links in various common locations
                startup$('a[href*="github.com"]').each((_: number, element) => {
                    const href = startup$(element).attr('href');
                    if (href) {
                        // Normalize GitHub URLs
                        const normalizedUrl = href
                            .replace(/\/$/, '') // Remove trailing slash
                            .replace(/\/issues$/, '') // Remove /issues
                            .replace(/\/pull$/, '') // Remove /pull
                            .replace(/\/tree\/.*$/, ''); // Remove branch/tree info
                        
                        if (normalizedUrl.includes('github.com/')) {
                            allRepos.add(normalizedUrl);
                        }
                    }
                });
            } catch (error) {
                console.error(`Error scraping startup page ${link}:`, error);
                continue;
            }
        }

        return {
            repos: Array.from(allRepos)
        };
    } catch (error) {
        console.error('Error in scrapeStartupRepos:', error);
        return {
            repos: [],
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
} 