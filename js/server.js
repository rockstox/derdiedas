const fs = require('fs');
const readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('../german-nouns.txt'),
  output: process.stdout,
  console: false
});

rd.on('line', function(line) {
    JSONIFYNouns(line)
})

var nounsObject = {
  "nouns": {}
};

function JSONIFYNouns(line) {
  if (line === "end") {
    writeToJSONFile();
  }
  var stringLine = line.toLowerCase();
  var stringArray = stringLine.split(" ");
  var nounKey = "noun" + stringArray[0];
  nounsObject[nounKey] = {};
  nounsObject[nounKey]["englisch"] = stringArray[1];
  nounsObject[nounKey]["artikel"] = stringArray[2];
  nounsObject[nounKey]["deutsch"] = stringArray[3];
}

function writeToJSONFile() {
  let JSONdata = JSON.stringify(nounsObject, null, 2);
  fs.writeFile('nouns.json', JSONdata, (err) => {
    if (err) throw err;
    console.log('Noun File Created!');
  })
}
