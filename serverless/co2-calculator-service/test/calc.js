const { ComputeOptimizer } = require('aws-sdk')

const countryBlend = (country) => {
  const blends = require('../calculator/dbEtanolMandate.json')

  let blendPercent = 0
  blends.forEach((element) => {
    if (element.Country === country) {
      console.log(element)
      blendPercent = element.Blend
    }
  })
  return blendPercent
}

console.log(countryBlend('Argentina'))
process.exit()
