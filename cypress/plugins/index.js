const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')
const tesseract = require("tesseract.js")
const fs = require("fs")
module.exports = (on, config) => {
  on('task', {
    downloadFile: downloadFile,
    getImageText: getImageText
  })
  return config;
}

const getImageText = async (obj) => {
  let { fileName, lang, logger } = obj
  let recognizeResult = null
  try {
    if (fs.existsSync(fileName)) {
      if (logger) {
        const myLogger = {
          logger: m => console.log(m)
        }
        recognizeResult = await tesseract.recognize(fileName, lang, myLogger)
      } else {
        recognizeResult = await tesseract.recognize(fileName, lang)
      }
      if (recognizeResult) {
        return recognizeResult.data.text
      }
    }
  } catch (error) {
    return error.message
  }
}