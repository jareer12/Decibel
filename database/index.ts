import fs from "fs";
import { AnyMap } from "../types/database";
import color_console from "../utils/color_console";
import ByteFormatter from "../utils/byte_formatter";

class Database {
  // Private path
  private path: string;
  // Private database
  private database: {
    [key: string]: AnyMap;
  } = {};

  // Constructor
  constructor(path: string) {
    this.path = path;

    const getDocuments = fs.readdirSync(this.path);
    const toLoad: AnyMap = {};

    for (const document of getDocuments) {
      const docPath = `${this.path}/${document}`;

      fs.readFile.bind(this)(docPath, "utf-8", function (err, data) {
        if (err) throw err;

        toLoad[document] = JSON.parse(data);

        color_console.success(
          `Loaded ${color_console.bold(
            ByteFormatter(data.length)
          )} of Data for Document: ${color_console.bold(document)}`
        );
      });
    }

    this.database = toLoad;
  }

  initialize() {
    return this;
  }

  // Helper function to return a success response
  success(
    message: string | undefined = undefined,
    statusCode: number = 200,
    data?: AnyMap
  ) {
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  }

  fetchRaw() {
    return this.success("Database fetched", 200, this.database);
  }

  createDocument(name: string, data?: AnyMap) {
    // Check if document already exists
    if (this.database[name] != null)
      return this.success("Document already exists", 403);

    // Create document if it doesn't exist
    this.database[name] = data || {};

    this.save();
    return this.success("Document created", 201, this.readDocument(name).data);
  }

  readDocument(name: string) {
    // Check if document exists
    if (this.database[name] == null)
      return this.success("Document does not exist", 404);

    // Return document if it exists
    return this.success("Document found", 200, this.database[name]);
  }

  updateRecord(document: string, key: string, data: AnyMap) {
    // Check if document exists
    if (this.database[document] == null)
      return this.success("Document does not exist", 404);

    // Check if record exists
    if (this.database[document][key] == null)
      return this.success("Record does not exist", 404);

    // Update record if it exists
    this.database[document][key] = data;

    this.save();
    return this.success("Record updated", 200);
  }

  createRecord(document: string, key: string, data: AnyMap) {
    // Check if document exists
    if (this.database[document] == null)
      return this.success("Document does not exist", 404);

    // Check if record already exists
    if (this.database[document][key] != null)
      return this.success("Record already exists", 403);

    // Create record if it doesn't exist
    this.database[document][key] = data;

    this.save();
    return this.success("Record created", 201);
  }

  save() {
    const documents = Object.keys(this.database);

    for (let x = 0; x < documents.length; x++) {
      const element = documents[x];
      const docPath = `${this.path}/${element}`;

      fs.writeFile(docPath, JSON.stringify(this.database[element]), (err) => {
        if (err) throw err;
      });
    }
  }
}

export default new Database(process.env.DB_PATH || "./storage");
