/**
 *
 * @param {Number} litre
 * @param {Number} `tanks`
 * @param {String} country
 * @param {Number} blendPercent
 * @returns {Promise} promise with results
 */
module.exports.calculator = async (litre, tanks, country, blendPercent) => {
  return new Promise((resolve, reject) => {
    const results = {
      input: {
        utilizacao_gasolina: litre,
        numero_tanques: tanks,
        pais: country,
        blendPercent: blendPercent === -1 ? countryBlend(country) : blendPercent
      },
      calculos: {
        emissao_gasolina_origem: 0,
        emissao_galosina_brasil: 0,
        emissao_hidratado_brasil: 0,
        gasolina_etanol_idratag_eq: 0
      },
      cbios_custos: {
        nro_cbios: 0,
        gasto_usdolar: 0
      },
      resultado_padrao_brasileiro: {
        emissao_gasolina_brasil_27: {
          reducao: 0,
          tco2_ano: 0,
          nro_arvores: 0
        },
        hidratado_brasil: {
          reducao: 0,
          tco2_ano: 0,
          nro_arvores: 0
        }
      },
      parametros: {
        gasolina: {
          itensidade_carbono: 90,
          conteudo_energetico: 32.30869824
        },
        etanol_anidro: {
          itensidade_carbono: 28,
          conteudo_energetico: 22.3543719
        },
        etanol_hidratado: {
          itensidade_carbono: 28,
          conteudo_energetico: 21.34
        },
        preco_cbio: 30 / 5.35
      }
    }
  })
}

const countryBlend = (country) => {
  const blends = require('./dbEtanolMandate.json')
  let blendPercent = 0
  blends.forEach((element) => {
    if (element.Country === country) {
      console.log(element)
      blendPercent = element.Blend
    }
  })
  return blendPercent
}
