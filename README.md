1. Test the last module                 DONE
2. Code the unifying thing up
3. Readme (done already)

# Mini Git

This project implements a very basic version of git. The source code is written in typescript and compiled to javascript. The project is organised as follows:

- `src/`: contains the source code
- `test/`: contains the tests
- `./`: contains the compiled javascript code

## Getting started
To set everything up, just run `npm install`, which will install tools to compile and test the code:

```bash
npm install
```
Here are other commands you'll use : 
```bash
npm run compile
npm run test
npm run ct # compile and test both
```

You can try experimenting the code on this repository itself (much like git). Run `node ./main.js .`, and it will create
a `./backups` folder with a current snapshot of the repository. This snapshot is stored as a json file. The '.ignore' file is used to ignore files and folders.