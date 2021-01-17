const Languages = require('./class/Languages'),
      Config    = require('./class/Config'),
      Convert   = require('./class/Convert')

class Keys {

  constructor() {
    this._language = 'en_US'
    this._languages = [
      'en_US',
      'nb_NO'
    ]

    this.languages = new Languages()
    this.config = new Config()
  }

  async init(opt = {}) {
    if (opt.language) this._language = opt.language
    if (opt.languages) this._languages = opt.languages
    if (!this._languages.includes(this._language)) {
      throw new Error(`The language '${this._language}' is not part of the
        'languages' array provided in options. Cannot set a default language that
        is not loaded into memory.`)
    }

    await this.languages.load(this._languages)
    await this.config.load(this._languages)
  }

  async get(key, value = 0, language = null) {
    const lang = language || this._language
    const data = this.languages.get(key, lang)

    if (!data) throw new Error(`No match found for the key '${key}' and language
      '${lang}'`)
    if (isNaN(value)) throw new Error(`The provided value is not a valid number,
      you provided ${value}`)

    const result = {
      id: data.id,
      item: {
        name: data.name,
        description: data.description,
        texture: data.texture || null
      }
    }

    if (value > 0) {
      const convert = await Convert[data.type](value, lang, this.config)

      result.unit = {
        type: data.type,
        name: {
          short: convert.unit,
          singular: convert.singular,
          plural: convert.plural
        }
      }

      result.value = {
        original: value,
        friendly: convert.value,
        short: convert.value_short
      }
    }

    return result
  }

}

module.exports = new Keys()
