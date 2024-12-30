const fs = require('fs');
const data = JSON.parse(fs.readFileSync('input.json', 'utf8'));

const n = data.keys.n;
const k = data.keys.k;

function decodeValue(base, value) {
    return parseInt(value, base);
}

const points = [];
for (const key in data) {
    if (key !== 'keys') {
        const x = parseInt(key);
        const y = decodeValue(parseInt(data[key].base), data[key].value);
        points.push({ x, y });
    }
}

function lagrangeInterpolation(points) {
    let c = 0;

    for (let i = 0; i < points.length; i++) {
        let xi = points[i].x;
        let yi = points[i].y;

        // Calculate Lagrange basis polynomial
        let term = yi;
        for (let j = 0; j < points.length; j++) {
            if (j !== i) {
                let xj = points[j].x;
                // term *= xj / (xj - xi);
                term *= (0 - xj) / (xi - xj);
            }
        }
        c += term;
    }

    return Math.round(c); // Round to integer
}

// Calculate the constant term using only the first k points
const constantTerm = lagrangeInterpolation(points.slice(0, k));


console.log("Constant term (Secret):", constantTerm);
