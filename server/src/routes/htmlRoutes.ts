import { Request, Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// DONE: Define route to serve index.html
router.get('/index.html', (req: Request, res: Response) => {
    console.info(`${req.method} request received to serve index.html`);
    const indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath);
});

export default router;
