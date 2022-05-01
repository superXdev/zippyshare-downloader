const cheerio = require('cheerio')
const axios = require('axios')
const request = require('request')
const fs = require('fs')
const _cliProgress = require('cli-progress')
const chalk = require('chalk')

function getFileName(html) {
	// parse using cheerio
	const $ = cheerio.load(html.data)

	// get from title and remove other text
	const fileName = $('title').text().replace('Zippyshare.com - ', '')

	return fileName
}


function getUniqueNumber(html, splitUrl, fileName) {
	// regex to find math formula from script tag
	// because the number generated from that formula
	const re = new RegExp(`(?<=${splitUrl[4]})(.*)(?=${fileName})`, 'gm')
	let uniqueNumber = html.data.match(re)[0].replace('/" + (', '').replace(') + "/', '')
	// calc number from string
	uniqueNumber = eval(uniqueNumber)

	return uniqueNumber
}


function buildURL(splitUrl, uniqueNumber, fileName) {
	// build url file
	const finalURL = `${splitUrl[0]}//${splitUrl[2]}/d/${splitUrl[4]}/${uniqueNumber}/${fileName}`

	return finalURL
}


async function getUrlDownload(url) {
	// get html data
	const html = await axios.get(url)

	// split url into array
	const splitUrl = url.split('/')

	// get file name & unique number
	const fileName = getFileName(html)
	const uniqueNumber = getUniqueNumber(html, splitUrl, fileName)

	// final URL
	const finalURL = buildURL(splitUrl, uniqueNumber, fileName)

	return {
		url: finalURL,
		fileName: fileName
	}
}


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


async function main(argv) {
	const finalURL = await getUrlDownload(argv.url)
	const fileName = (argv.output !== undefined) ? argv.output : finalURL.fileName

	download(finalURL.url, fileName, () => console.log)
}


const argv = require('yargs/yargs')(process.argv.slice(2))
	.option('url', {
		alias: 'u',
		desc: 'Zippyshare link you want to download',
		type: 'string',
		demand: true
	})
	.option('output', {
		alias: 'o',
		desc: 'File name output',
		type: 'string'
	})
	.help()
	.argv

if(argv.url !== undefined) {
	main(argv).then()
}