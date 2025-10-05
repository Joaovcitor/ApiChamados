import { Request, Response, NextFunction } from "express";

export function verifyRole(role: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole) {
      return res
        .status(403)
        .json({ error: "You do not have permission to access this resource" });
    }
    if (!role.includes(userRole)) {
      return res
        .status(403)
        .json({ error: "You do not have permission to access this resource" });
    }
    next();
  };
}
