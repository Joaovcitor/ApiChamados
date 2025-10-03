import rateLimit from "express-rate-limit";
export function rateLimitConfig(max: number, windowMs: number) {
  return rateLimit({
    max,
    windowMs,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Muitas requisições feitas, tente novamente mais tarde.",
  });
}
