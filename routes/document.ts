import database from "../database";

const router = require("express").Router();

router.post("/create", (req: any, res: any) => {
  const { name, data } = req.body;
  const x = database.createDocument(name, data);

  res.json(x);
});

export default router;
