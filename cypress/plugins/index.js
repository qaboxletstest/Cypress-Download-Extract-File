const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')
const tesseract = require("tesseract.js")
const fs = require("fs")
const Jimp = require("jimp");
module.exports = (on, config) => {
  on('task', {
    downloadFile: downloadFile,
    getImageText: getImageText,
    compareImages: compareImages
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

const compareImages = async (obj) => {
  const { fileName1, fileName2 } = obj
  const example1 = await Jimp.read(fileName1)
  const example2 = await Jimp.read(fileName2)
  const example1Hash = example1.hash()
  const example2Hash = example2.hash()
  const distance = Jimp.distance(example1, example2)
  const diff = Jimp.diff(example1, example2)

  if (example1Hash !== example2Hash || distance > 0.15 || diff > 0.15) {
    return false
  } else {
    return true
  }
}