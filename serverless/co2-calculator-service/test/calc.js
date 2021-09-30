class CalcCbio {
  constructor(tanks, country, blendPercent) {
    this.litre = tanks * 60
    this.tanks = tanks
    this.country = country
    this.blendPercent =
      blendPercent === -1 ? countryBlend(country) : blendPercent
    this.parametros = {
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
      preco_cbio: Math.round((30 / 5.35) * 100) / 100
    }

    this.calculos = {
      emissao_gasolina_origem: 0,
      emissao_gasolina_brasil: 0,
      emissao_hidratado_brasil: 0,
      gasolina_etanol_idratag_eq: 0
    }

    this.res_cbios_custos = {
      nro_cbios: 0,
      gasto_usdolar: 0
    }

    this.resultado_padrao_brasileiro = {
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
    }
  }

  getResults() {
    this.calculos.emissao_gasolina_origem =
      ((this.parametros.gasolina.itensidade_carbono *
        this.parametros.gasolina.conteudo_energetico *
        this.litre *
        (1 - this.blendPercent) +
        this.parametros.etanol_anidro.conteudo_energetico *
          this.parametros.etanol_anidro.conteudo_energetico *
          this.litre *
          this.blendPercent) *
        12) /
      1000000

    this.calculos.emissao_gasolina_brasil =
      ((this.parametros.gasolina.itensidade_carbono *
        this.parametros.gasolina.conteudo_energetico *
        this.litre *
        0.73 +
        this.parametros.etanol_anidro.itensidade_carbono *
          this.parametros.etanol_anidro.conteudo_energetico *
          this.litre *
          0.27) *
        12) /
      1000000

    if (this.country == 'Brazil') {
      this.calculos.emissao_gasolina_origem =
        this.calculos.emissao_gasolina_brasil
    }

    this.calculos.gasolina_etanol_idratag_eq = this.litre / 0.7

    this.calculos.emissao_hidratado_brasil =
      (this.parametros.etanol_hidratado.itensidade_carbono *
        this.parametros.etanol_hidratado.conteudo_energetico *
        this.calculos.gasolina_etanol_idratag_eq *
        12) /
      1000000

    this.res_cbios_custos.nro_cbios = this.calculos.emissao_gasolina_origem

    this.res_cbios_custos.gasto_usdolar =
      this.res_cbios_custos.nro_cbios * this.parametros.preco_cbio

    this.resultado_padrao_brasileiro.emissao_gasolina_brasil_27.reducao = -(
      this.calculos.emissao_gasolina_origem /
        this.calculos.emissao_gasolina_brasil -
      1
    )

    this.resultado_padrao_brasileiro.emissao_gasolina_brasil_27.tco2_ano =
      this.calculos.emissao_gasolina_origem -
      this.calculos.emissao_gasolina_brasil

    this.resultado_padrao_brasileiro.emissao_gasolina_brasil_27.nro_arvores =
      +this.resultado_padrao_brasileiro.emissao_gasolina_brasil_27.tco2_ano *
      7.14

    this.resultado_padrao_brasileiro.hidratado_brasil.reducao = -(
      this.calculos.emissao_hidratado_brasil /
        this.calculos.emissao_gasolina_origem -
      1
    )

    this.resultado_padrao_brasileiro.hidratado_brasil.tco2_ano =
      this.calculos.emissao_gasolina_origem -
      this.calculos.emissao_hidratado_brasil

    this.resultado_padrao_brasileiro.hidratado_brasil.nro_arvores =
      +this.resultado_padrao_brasileiro.hidratado_brasil.tco2_ano * 7.14

    if (this.country == 'Brazil') {
      this.calculos.emissao_gasolina_origem =
        this.calculos.emissao_gasolina_brasil
      this.resultado_padrao_brasileiro.emissao_gasolina_brasil_27.reducao = 0
      this.resultado_padrao_brasileiro.emissao_gasolina_brasil_27.tco2_ano = 0
      this.resultado_padrao_brasileiro.emissao_gasolina_brasil_27.nro_arvores = 0
    }

    return {
      input: {
        utilizacao_gasolina: this.litre,
        numero_tanques: this.tanks,
        pais: this.country,
        blendPercent: this.blendPercent
      },
      calculos: this.calculos,
      cbios_custos: this.cbios_custos,
      resultado_padrao_brasileiro: this.resultado_padrao_brasileiro,
      parametros: this.parametros
    }
  }
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

const teste = () => {
  const calc = new CalcCbio(10, 'Brazil', -1)

  console.log(calc.getResults())
  process.exit()
}

teste()
