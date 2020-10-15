const fs = require('fs')
const distpackagejson = fs.readFileSync('./package_dist.json').toString()
const version = JSON.parse(fs.readFileSync('./package.json').toString()).version
const output = Object.assign(JSON.parse(distpackagejson),{version})
fs.writeFileSync('dist/package.json', JSON.stringify(output));
console.log('成功');