# zippydr - Zippyshare downloader

a simple CLI application to download file from Zippyshare site, you can easily download by typing in command line. This tools have 2 mode for download: single file & batch file

[![npm](https://badge.fury.io/js/zippydr.svg)](http://badge.fury.io/js/zippydr) ![GitHub](https://img.shields.io/github/license/superXdev/zippyshare-downloader.svg) ![npm](https://img.shields.io/npm/dw/zippydr)

![preview](https://github.com/superXdev/zippyshare-downloader/blob/main/preview.png?raw=true)

## Table of Contents
1. [Changelog](#changelog)
2. [Installation](#installation)
   - [NPM](#npm)
   - [Github](#github)
3. [Usage](#usage)
   - [Fetch URL] (#fetch)
   - [Download file](#download-file)
   - [Download batch](#download-batch)
4. [License](#license)

<a name="changelog"></a>
## Changelog
- **2.0.0 - 03 Mei 2022**
  - change main library
  - adding batch mode
- **1.2.3 - 02 Mei 2022**
  - code optimized
  - adding license
  - adding README file
- **1.0.1 - 01 Mei 2022**
  - release to NPM & Github

<a name="installation"></a>
## Installation

<a name="npm"></a>
### NPM
```bash
  npm install -g zippydr
```
<a name="github"></a>
### Github
```bash
  git clone git@github.com:superXdev/zippyshare-downloader.git
  cd zippyshare-downloader/
  npm install
  npm install -g .
```
<a name="usage"></a>
## Usage

### Show help
```bash
   zippydr --help
```
<a name="fetch"></a>
### Fetch URL file
```bash
   zippydr -f <link>
```
<a name="download-file"></a>
### Download file
```bash
   zippydr -u <link>
```

### with output file name
```bash
   zippydr -u <link> -o <filename>
```
<a name="download-batch"></a>
### Download batch
```bash
   zippydr -b <your_file_links>
```

### with output folder
```bash
   zippydr -b <your_file_links> -d <foldername>
```
<a name="license"></a>
## License
Licensed under the MIT license.
