# zippydr - Zippyshare downloader

a simple CLI application to download file from Zippyshare site, you can easily download by typing in command line.

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

### Download file with custom output
```bash
   zippydr -u <link> -o <filename>
```