# SillyTavern Office Parser

Server plugin to extract text from Office documents using the [officeparser](https://www.npmjs.com/package/officeparser) library.

Supported formats:

* docx
* pptx
* xlsx
* odt
* odp
* ods
* pdf

## How to install

1. Before you begin, make sure you set a config `enableServerPlugins` to `true` in the config.yaml file of SillyTavern.

2. Open a terminal in your SillyTavern directory, then run the following:

```bash
cd plugins
git clone https://github.com/SillyTavern/SillyTavern-Office-Parser
```

3. Restart the SillyTavern server.

## How to build

Clone the repository, then run `npm install`.

```bash
# Debug build
npm run build:dev
# Prod build
npm run build
```

## License

AGPLv3
