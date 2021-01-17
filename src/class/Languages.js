const Fs    = require('fs'),
      Util  = require('util'),
      Path  = require('path'),
      Read  = Util.promisify(Fs.readFile)

class Languages {

  constructor() {
    this._data = []
    this._languages = {}
    this._config = {}
    this._files = [
      "animals",
      "blocks",
      "category",
      "custom",
      "food",
      "items",
      "mobs",
      "tools"
    ]
  }

  async load(languages) {
    if (!languages) throw new Error('No languages selected for load.')
    this._languages = languages

    await this._load('en_US')

    for await (const language of languages) {
      if (language != 'en_US') {
        await this._load(language)
      }
    }
  }

  get(key, language) {
    if (!key || !language) return null

    const data_us = this._data['en_US'].find(k => k.id === key)

    if (language && language != 'en_US' && this._languages.includes('en_US') && (!this._data[language] || !data_us)) {
      return data_us
    }

    const data = this._data[language].find(k => k.id === key)
    if (!this._data[language] || !data) return null

    return data
  }

  async _load(language) {
    const result = []

    for await (const file of this._files) {
      const data = JSON.parse(await Read(Path.join(__dirname, `../json/${language}/${file}.json`), 'utf8'))
      if (!data) continue

      if (!this._data[language]) this._data[language] = []

      if (language == 'en_US') {
        this._data['en_US'] = this._data['en_US'].concat(data)
      }

      if (language != 'en_US') {
        for await (const o_key of this._data['en_US']) {
          const key = data.find(k => k.id === o_key.id)
          this._data[language].push(Object.assign(o_key, key))
        }
      }
    }
  }

}

module.exports = Languages
