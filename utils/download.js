
const request = require('request')
const fs = require('fs')
const _cliProgress = require('cli-progress')
const chalk = require('chalk')


function download(url, fileName, callback) {
    const progressBar = new _cliProgress.SingleBar({
        format: '{bar} {percentage}% | ETA: {eta}s'
    }, _cliProgress.Presets.shades_classic);

    const file = fs.createWriteStream(fileName);
    let receivedBytes = 0
    

    request.get(url)
	    .on('response', (response) => {
	        if (response.statusCode !== 200) {
	            return callback('Response status was ' + response.statusCode);
	        }

	        const totalBytes = response.headers['content-length'];

	        console.log(`File name : ${chalk.green.bold(fileName)}`)
	        console.log(`Size      : ${chalk.yellow((totalBytes / 1024 / 1024).toFixed(2) )} MB\n`)

	        progressBar.start(totalBytes, 0);
	    })
	    .on('data', (chunk) => {
	        receivedBytes += chunk.length;
	        progressBar.update(receivedBytes);
	    })
	    .pipe(file)
	    .on('error', (err) => {
	        fs.unlink(fileName);
	        progressBar.stop();
	        return callback(err.message);
	    });

	file
		.on('finish', () => {
	        progressBar.stop();
	        file.close(callback);
	    });

	file
		.on('error', (err) => {
	        fs.unlink(fileName); 
	        progressBar.stop();
	        return callback(err.message);
	    });
}

module.exports = { download }