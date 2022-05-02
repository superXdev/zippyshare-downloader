#!/usr/bin/env node

const chalk = require('chalk')
const { getUrlDownload } = require('./utils/url')
const { download } = require('./utils/download')


async function main(argv) {
	const finalURL = await getUrlDownload(argv.url)

	if(finalURL === null) {
		return console.log(chalk.red('File does not exist on this server'))
	}

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
	const isValidUrl = argv.url.match(/(https?:\/\/(.+?\.)?zippyshare\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/gm)

	if(!isValidUrl) {
		return console.log(chalk.red('URL is not valid!'))
	}

	main(argv).then()
}