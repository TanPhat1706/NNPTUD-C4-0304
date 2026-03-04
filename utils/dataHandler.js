const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.js');

const writeDataToFile = (data, dataName) => {
  let fileContent = fs.readFileSync(dataFilePath, 'utf8');
  const regex = new RegExp(`let ${dataName} = \\[(.|\\n)*?\\n\\]`);
  const newContent = `let ${dataName} = ${JSON.stringify(data, null, 2)}`;
  fileContent = fileContent.replace(regex, newContent);
  fs.writeFileSync(dataFilePath, fileContent, 'utf8');
};

module.exports = { writeDataToFile };
