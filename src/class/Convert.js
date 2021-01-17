const Units   = require('convert-units'),
      Config  = require('./Config')

class Convert {

  async distance(data, language, config) {
    const value = Math.floor(parseInt(data) / 100)

    return {
      value: value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      value_short: 0,
      unit: config.get('b', language),
      singular: config.get('block', language),
      plural: config.get('blocks', language)
    }
  }

  async ticks(data, language, config) {
    const value = parseInt(data)
    const convert = Units(value).from('s').toBest()

    return {
      value: parseFloat(convert.val.toFixed(2)),
      value_short: 0,
      unit: convert.unit,
      singular: convert.singular.toLowerCase(),
      plural: convert.plural.toLowerCase()
    }
  }

  async unit(data, language, config) {
    return {
      value: data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      value_short: 0,
      unit: config.get('u', language),
      singular: config.get('unit', language),
      plural: config.get('units', language)
    }
  }

}

module.exports = new Convert()
