#!/usr/bin/env node

const chalk = require('chalk')
const fs = require('fs')
const Listr = require('listr')
const { Observable } = require('rxjs')
const cluster = require("cluster")
const { getUrlDownload, scanUrls, validateUrl } = require('./utils/url')
const { download, downloadBatch } = require('./utils/download')



async function singleMode(argv) {
	const finalURL = await getUrlDownload(argv.url)

	if(finalURL === null) {
		return console.log(chalk.red('File does not exist on this server'))
	}

	const fileName = (argv.output !== undefined) ? argv.output : finalURL.fileName

	download(finalURL.url, fileName)
}

async function batchMode(argv) {
	let validUrls = null
	const tasks = new Listr([{
		title: 'Scanning all links',
		task: async () => {
			return new Observable(observer => {
                (async () => {
                	observer.next('Please wait..')
	                validUrls = await scanUrls(argv.batch)

	                observer.next(`${validUrls.length} links are valid`)
                })().then(ignored => {
	               observer.complete();
                })
            })
		}
	}])


	tasks.run()
		.then(() => {
			// create directory if configured
			if(argv.d !== undefined) {
				if (!fs.existsSync(argv.d)){
				   fs.mkdirSync(argv.d)
				}
			}

			console.log(`${chalk.yellow(validUrls.length)} file will be downloaded\n`)
			validUrls.map((data) => {
				// append dir data
				data.dir = argv.d

				const worker = cluster.fork()
				worker.send(data)
			})
		})
		.catch(err => {
		    console.error(err);
		})
}


const argv = require('yargs/yargs')(process.argv.slice(2))
	.option('url', {
		alias: 'u',
		desc: 'Zippyshare link you want to download',
		type: 'string'
	})
	.option('batch', {
		alias: 'b',
		desc: 'List file of links',
		type: 'string'
	})
	.option('output', {
		alias: 'o',
		desc: 'File name output',
		type: 'string'
	})
	.option('output-dir', {
		alias: 'd',
		desc: 'Directory for output batch file',
		type: 'string'
	})
	.help()
	.argv

// everything starting here
if(cluster.isMaster) {
	if(argv.url !== undefined) {
		const isValidUrl = validateUrl(argv.url)

		if(!isValidUrl) {
			return console.log(chalk.red('URL is not valid!'))
		}

		singleMode(argv).then()
	}

	if(argv.batch !== undefined) {
		batchMode(argv).then()
	}
}

// worker for batch download
if(cluster.isWorker) {
	process.on('message', (data) => {
		downloadBatch(data.url, data.fileName, data.dir)
			.then()
			.catch((err) => console.log(err))
	})

}