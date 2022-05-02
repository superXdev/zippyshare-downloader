
const cheerio = require('cheerio')
const axios = require('axios')

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

	if(html.data.includes('File does not exist on this server')) {
		return null
	}

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

module.exports = { getUrlDownload }