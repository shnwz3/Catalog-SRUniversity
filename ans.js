//rough
const fs = require('fs');

function readInput(filename) {
    if (!fs.existsSync(filename)) {
        console.error(`File not found: ${filename}`);
        process.exit(1);
    }
    const data = fs.readFileSync(filename);
    return JSON.parse(data);
}

function decodeValue(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points) {
    const k = points.length;
    let constantTerm = 0;

    for (let i = 0; i < k; i++) {
        let term = points[i].y;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (0 - points[j].x) / (points[i].x - points[j].x);
            }
        }
        constantTerm += term;
    }
    return constantTerm;
}

function processFile(filename) {
    const input = readInput(filename);
    const n = input.keys.n;
    const k = input.keys.k;

    const points = [];

    // Collect the first k points
    for (let i = 1; i <= n; i++) {
        if (points.length < k) {
            const base = parseInt(input[i.toString()]["base"]);
            const value = input[i.toString()]["value"];
            const x = i;
            const y = decodeValue(base, value);
            points.push({ x, y });
        }
    }

    const constantTerm = lagrangeInterpolation(points);
    console.log(`The constant term (c) for file "${filename}" is:`, constantTerm);
}

function main() {
    // List of JSON files
    const files = ['input1.json', 'input2.json'];

    files.forEach(processFile);
}

main();
// The constant term (c) for file "input1.json" is: 3
// The constant term (c) for file "input2.json" is: 28735619723864