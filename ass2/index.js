const path = require("path");
const fs = require("fs");

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];

switch (operation) {
  case "readFile":
    try {
      const filePath = path.resolve(process.cwd(), file);
      console.log("cwd",process.cwd());
      const data = fs.readFileSync(filePath, "utf8");
      console.log(data);
    } catch (error) {
      console.error(`Error reading file: ${error.message}`);
    }
    break;
    case "appendFile":
        try {
      const filePath = path.resolve(process.cwd(), file);
      fs.appendFileSync(filePath, `\n${content}`, { flag: "a" });
      console.log("Content appended successfully");
    } catch (error) {
      console.error(`Error appending content to file: ${error.message}`);
    }
    break;

    case "delete":
        try {
      const filePath = path.resolve(process.cwd(), file);
      fs.unlinkSync(filePath);
      console.log("File deleted successfully");
      } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
    }
    break;

  case "createFile":
    try {
      const filePath = path.resolve(process.cwd(), file);
      fs.writeFileSync(filePath, content);
      console.log("File created successfully");
    } catch (error) {
      console.error(`Error creating file: ${error.message}`);
    }
    break;
    case "renameFile":
        try {
      const oldFilePath = path.resolve(process.cwd(), file);
      const newFilePath = path.resolve(process.cwd(), content);
      fs.renameSync(oldFilePath, newFilePath);
      console.log("File renamed successfully"); 
      } catch (error) {
      console.error(`Error renaming file: ${error.message}`);
    }
    break;
    case "listFiles":
        try {
      const files = fs.readdirSync(process.cwd());
      console.log("Files in current directory:");
      files.forEach((file) => console.log(file));   
      } catch (error) {
      console.error(`Error listing files: ${error.message}`);
    }
    break;


  default:
    console.log(`Invalid operation '${operation}'`);
}
