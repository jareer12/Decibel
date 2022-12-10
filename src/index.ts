import "dotenv/config";
import express from "express";
import body from "body-parser";
import Database from "../database/index";
import Document from "../routes/document";

const port = parseInt(process.env.PORT || "3000");
const app = express();

app.use(body.json());
app.use(body.urlencoded({ extended: true }));

app.use("/document", Document);
app.get("/", (req: any, res: any) => {
  res.send(Database.fetchRaw());
});

app.listen(port, () => {
  console.log(`Server listening on http://127.0.0.1:${port}`);
});
