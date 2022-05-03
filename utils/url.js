
const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')

function getFileName(html) {
	// parse using cheerio
	const $ = cheerio.load(html.data)

	// get from title and remove other text
	const fileName = $('title').text().replace('Zippyshare.com - ', '')

	return fileName
}


function getFileUrl(html) {
	// regex to find math formula from script tag
	// because the number generated from that formula
	const re = new RegExp(`(?<=dlbutton)(.*)(?=;)`, 'gm')
	let result = html.data.match(re)[0].replace("').href = ", "")
	result = eval(result)

	return result
}


function buildURL(splitUrl, fileUrl) {
	// build url file
	const finalURL = `${splitUrl[0]}//${splitUrl[2]}${fileUrl}`

	return finalURL
}

function validateUrl(url) {
	return url.match(/(https?:\/\/(.+?\.)?zippyshare\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/gm)
}

async function getUrlDownload(url) {
	// get html data
	const html = await axios.get(url)

	if(html.data.includes('File does not exist on this server')) {
		return null
	}

	// split url into array
	const splitUrl = url.split('/')

	// get file name & unique number
	const fileName = getFileName(html)
	const fileUrl = getFileUrl(html)

	// final URL
	const finalURL = buildURL(splitUrl, fileUrl)

	return {
		url: finalURL,
		fileName: fileName
	}
}

async function scanUrls(file) {
	let validUrls = []
	const lists = fs.readFileSync(file, 'utf-8').split(/\r?\n/)

	for(let i = 0; i < lists.length; i++) {
		if(validateUrl(lists[i])) {
			const finalURL = await getUrlDownload(lists[i])
			if(finalURL !== null) {
				validUrls.push(finalURL)
			}
		}
	}

	return validUrls
}

module.exports = { 
	getUrlDownload,
	scanUrls,
	validateUrl
}