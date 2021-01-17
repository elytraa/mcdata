const Fs    = require('fs'),
      Util  = require('util'),
      Path  = require('path'),
      Read  = Util.promisify(Fs.readFile)

class Config {

  constructor() {
    this._data = []
    this._languages = {}
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
    if (!this._data[language][key]) return null
    return this._data[language][key]
  }

  async _load(language) {
    if (!language) return
    const config_data = JSON.parse(await Read(Path.join(__dirname, `../json/${language}.json`), 'utf8'))
    if (config_data) this._data[language] = config_data
  }

}

module.exports = Config
