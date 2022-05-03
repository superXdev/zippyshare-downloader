# zippydr - Zippyshare downloader

a simple CLI application to download file from Zippyshare site, you can easily download by typing in command line. This tools have 2 mode for download: single file & batch file

[![NPM](https://nodei.co/npm/zippydr.png?compact=true)](https://nodei.co/npm/zippydr/)

![GitHub package.json version](https://img.shields.io/github/package-json/v/superXdev/zippyshare-downloader.svg) ![GitHub](https://img.shields.io/github/license/superXdev/zippyshare-downloader.svg)

![preview](https://github.com/superXdev/zippyshare-downloader/blob/main/preview.png?raw=true)


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

## Installation

### NPM
```bash
  npm install -g zippydr
```

### Github
```bash
  git clone git@github.com:superXdev/zippyshare-downloader.git
  cd zippyshare-downloader/
  npm install
  npm install -g .
```

## Usage

### Show help
```bash
   zippydr --help
```

### Download file
```bash
   zippydr -u <link>
```

### with output file name
```bash
   zippydr -u <link> -o <filename>
```

### Download batch
```bash
   zippydr -b <your_file_links>
```

### with output folder
```bash
   zippydr -b <your_file_links> -d <foldername>
```