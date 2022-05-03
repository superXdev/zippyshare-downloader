const axios = require('axios')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ProgressBar = require('progress')


function download(url, fileName) {
	axios({
		url,
		method: 'GET',
		responseType: 'stream'
	}).then(({ headers, data }) => {
		const totalLength = headers['content-length']

		console.log(`File name : ${chalk.green(fileName)}`)
		console.log(`Size      : ${chalk.yellow((totalLength / 1024 / 1024).toFixed(2))} MB\n`)
		
		const progressBar = new ProgressBar('[:bar] :percent :etas', {
			complete: chalk.cyan('='),
			incomplete: ' ',
			width: 40,
			total: parseInt(totalLength)
		})

		const writer = fs.createWriteStream(fileName)

		data.on('data', (chunk) => progressBar.tick(chunk.length))
		data.pipe(writer)
	})
	
}


async function downloadBatch(url, fileName, dir) {
	const { data, headers } = await axios({
		url,
		method: 'GET',
		responseType: 'stream'
	})
	
	const totalLength = headers['content-length']

	console.log(`Downloading : ${chalk.white.bold(fileName)}`)

	const output = (dir === undefined) ? fileName : path.resolve(dir, fileName)
	const writer = fs.createWriteStream(output)

	const w = data.pipe(writer)
    w.on('finish', () => {
		console.log(`Completed : ${chalk.green(fileName)}`)
		process.exit(0)
    })
}

module.exports = {
	download,
	downloadBatch
}