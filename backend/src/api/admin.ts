import { Router, Request, Response } from 'express';
import { scrapeStartupRepos } from '../scraper/startupScraper';

const router = Router();

router.post('/scrape-repos', async (req: Request, res: Response) => {
    const { mainPageUrl } = req.body;

    if (!mainPageUrl) {
        return res.status(400).json({ error: 'mainPageUrl is required' });
    }

    try {
        const result = await scrapeStartupRepos(mainPageUrl);
        
        if (result.error) {
            return res.status(500).json({ error: result.error });
        }

        return res.json({ repos: result.repos });
    } catch (error) {
        console.error('Error in scrape-repos route:', error);
        return res.status(500).json({ 
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});

export default router; 