import { writeFile } from 'fs';

const quote = 'This is a sample Quote'

const fs = require('fs');

fs.writeFile('./samplefile.html', quote, (err)=>{
    console.log('Complted');
})

const os = require("os");

console.log(os.freemem)