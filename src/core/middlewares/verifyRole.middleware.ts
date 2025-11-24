import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/prisma";
export function verifyRole(role: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.id;
    const user = await prisma.user.findUnique({
      where: { id: userRole },
      include: {
        role: {
          select: {
            role: true,
          },
        },
      },
    });
    if (!user) {
      return res
        .status(403)
        .json({ error: "You do not have permission to access this resource" });
    }
    if (!user.role.some((item) => role.includes(item.role))) {
      return res
        .status(403)
        .json({ error: "You do not have permission to access this resource" });
    }
    next();
  };
}
