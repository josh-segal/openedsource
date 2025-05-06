import { Router, Request, Response } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({data: "List of issues"});
});

router.get("/:id", (req: Request, res: Response) => {
    res.json({data: `Issue: ${req.params.id}`});
});

export default router;