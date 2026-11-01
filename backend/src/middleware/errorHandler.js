import { Prisma } from "@prisma/client";

export function notFound(req, res) {
  res.status(404).json({ error: "Not found" });
}

function errorHandler(err, req, res, _next) {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Malformed JSON body" });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Value already taken" });
    }
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Not found" });
    }
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}

export default errorHandler;
