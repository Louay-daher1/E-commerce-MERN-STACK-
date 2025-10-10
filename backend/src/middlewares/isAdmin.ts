import type { Request, Response, NextFunction } from "express";

interface ExtendedRequest extends Request {
  user?: any;
}

export const isAdmin = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send("User not authenticated");
  }

  if (!req.user.isAdmin) {
    return res.status(403).send("Access denied: Admins only");
  }

  next();
};