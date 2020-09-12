const Fs      = require('fs'),
      Util    = require('util'),
      Path    = require('path'),
      Read    = Util.promisify(Fs.readFile),
      Convert = require('./convert')

const d_languages = [
  'en_US',
  'nb_NO'
]

const d_categories = [
  'animals',
  'blocks',
  'category',
  'custom',
  'food',
  'items',
  'mobs',
  'tools'
]

const data = {}

class Keys {

  constructor() {
  }

  async init(options) {
    await this.setLanguage(options.language)
    await this.setLanguages(options.languages)

    if (!this.language) throw new Error('No language defined.')
    if (!this.languages) throw new Error('No languages defined, loaded no keys.')

    if (!this.languages.includes(this.language)) {
      throw new Error('The selected main language is not part of the languages mcdata should load.')
    }

    for await (const language of this.languages) {
      const l_language = await this._loadLanguage(language)
    }

    return true
  }

  async setLanguage(language) {
    this.language = language || 'en_US'
  }

  async setLanguages(languages) {
    this.languages = languages || d_languages
  }

  async get(id, value = 0, language = null) {
    if(!language) language = this.language
    if (!data[language]) return null

    const block = data[language].find(d => d.id === id.toLowerCase()) || {}

    const entry = {
      id: id,
      entity: {
        name: block.name || null,
        description: block.description || null,
        texture: block.texture || null
      },
      value: {
        raw: value,
        type: block.type || null
      }
    }

    if(!block.type || !Convert[block.type]) return entry
    return await Convert[block.type](entry)
  }

  async _loadLanguage(language) {
    for await (const category of d_categories) {
      const d_keys = JSON.parse(await Read(Path.join(__dirname, `../data/en_US/${category}.json`), 'utf8'))
      if (language === 'en_US') continue

      const l_keys = JSON.parse(await Read(Path.join(__dirname, `../data/${language}/${category}.json`), 'utf8'))
      if (!l_keys.length) continue
      if (!data[language]) data[language] = []

      for await (const key of d_keys) {
        const l_key = l_keys.find(k => k.id === key.id)
        const merged = Object.assign(key, l_key)
        data[language].push(merged)
      }
    }

    return data[language]
  }

}

module.exports = new Keys()
