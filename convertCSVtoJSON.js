const csv=require('csvtojson')
const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1')

const csvFilePath='./customer-data.csv'

const convertCSVtoJSON = (pathY=csvFilePath) => {
  console.log('converting ', pathY)
  const convertFile = (pathX, callback) => {
    csv().fromFile(pathX)
    .on('end_parsed',(jsonArObj)=>{
       callback(null, jsonArObj)
    })
    .on('error', (error) => {
      console.error(`Got error: ${error.message}`)
      callback(error)
    })
  }

  const folderName = uuidv1()
  fs.mkdirSync(folderName)

  convertFile(pathY, (error, data)=>{
    if (error) return console.log(error)

    let humanReadabledata = JSON.stringify(data, null, 2)
    fs.writeFileSync(path.join(__dirname, folderName, 'customer-data.json'), humanReadabledata)
    console.log('conversion is done in folder ', folderName)
  })
}

convertCSVtoJSON(process.argv[2])

