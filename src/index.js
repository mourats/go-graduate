const fs = require("fs");
const csv = require("csv-parser");
const dataPath = "./data/";
const configPath = "./config/";

let rawdata = fs.readFileSync(configPath + "dictionary.json");
var dictionaryData = JSON.parse(rawdata);

const readCsvFileAndGo = (file, callback) => {
  let data = [];
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", row => {
      obj = { disciplina: row.disciplina, horario: row.horario };
      data.push(obj);
    })
    .on("end", () => {
      console.log(`CSV file ${file} successfully processed`);
      callback(data);
    });
};

const processFunction = data => {
  let goingToPay = dictionaryData.goingToPay;
  //   console.log(goingToPay.filter(item => item.key === "proj1"));
  //   console.log(data.filter(item => item.disciplina.includes("proj1")));
  data.forEach(elem => {
    const array = goingToPay.filter(item =>
      elem.disciplina.includes(item.key + "-")
    );
    if (array.length > 0) {
      const index = goingToPay.indexOf(array[0]);
      goingToPay.splice(index, 1);
      console.table(array);
    }
  });
  //   let goingToPay = dictionaryData.goingToPay;
  //   const result = data.reduce((accum, elem) => {
  //     const array = goingToPay.filter(item => elem.disciplina.includes(item.key + '-'));
  //     array.e > 0 ? accum.push(array[0]) : null;
  //     return accum;
  //   }, []);
  //   console.table(result);
};

readCsvFileAndGo(dataPath + "20192.csv", processFunction);
readCsvFileAndGo(dataPath + "20191.csv", processFunction);
readCsvFileAndGo(dataPath + "20182.csv", processFunction);
