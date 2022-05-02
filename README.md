# zippydr - Zippyshare downloader

a simple CLI application to download file from Zippyshare site, you can easily download by typing in command line.

![preview](https://github.com/superXdev/zippyshare-downloader/blob/main/preview.png?raw=true)

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