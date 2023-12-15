
const fs = require('fs');
const CsvReadableStream = require('csv-reader');

let inputStream = fs.createReadStream('data.csv', 'utf8');

const rows = []
inputStream
	.pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
	.on('data', function (row) {
	    rows.push(row)
	})
	.on('end', function () {
	    console.log('No more rows!');
        const result = rows.slice(1).map(row=>row.pop())
        fs.writeFileSync("data.js",JSON.stringify(result))
	});
