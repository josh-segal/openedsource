import { Router, Request, Response } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({data: "List of bookmarks"});
});

router.get("/:id", (req: Request, res: Response) => {
    res.json({data: `Bookmark: ${req.params.id}`});
});

export default router;