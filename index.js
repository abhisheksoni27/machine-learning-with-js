const ml = require('ml-regression');
const csv = require('csvtojson');
const SLR = ml.SLR; // Simple Linear Regression

const csvFilePath = 'advertising.csv'; // Data
let csvData = [], // parsed Data
    X = [], // Input
    y = []; // Output

var regressionModel;

const readline = require('readline'); // For user prompt to allow predictions

const rl = readline.createInterface({input: process.stdin, output: process.stdout});

csv()
    .fromFile(csvFilePath)
    .on('json', (jsonObj) => {
        csvData.push(jsonObj);
    })
    .on('done', () => {
        dressData(performRegression); // To get data points from JSON Objects
    });

function performRegression() {
    regressionModel = new SLR(X, y); // Train the model on training data
    console.log(regressionModel.toString(3));
    predictOutput();
}

function dressData(resolve) {
    /**
     * One row of the data object looks like:
     * {
     *   TV: "10",
     *   Radio: "100",
     *   Newspaper: "20",
     *   "Sales": "1000"
     * }
     * 
     * Hence, while adding the data points, 
     * we need to parse the String value as a Float.
     */
    csvData.forEach((row) => {
        X.push(f(row.Radio));
        y.push(f(row.Sales));
    });

    return new Promise(resolve, function () {
        throw new Error('Cannot process csv Data');
    });
}

function f(s) {
    return parseFloat(s);
}

function predictOutput() {
    rl.question('Enter input X for prediction: ', (answer) => {
        console.log(`At X = ${answer}, y =  ${regressionModel.predict(parseFloat(answer))}`);
        predictOutput();
    });
}