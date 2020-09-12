const Fs      = require( 'fs' ).promises,
      Path    = require( 'path' ),
      Convert = require( './src/convert' )

const config = {
  language: 'nb_NO',
  languages: [
    'nb_NO'
  ]
}

const data = {}

async function loadFile( file ) {
  const p = Path.join( __dirname, file )

  if( Fs.access( p ) ) {
    const result = await Fs.readFile( p, 'utf8' )
    return JSON.parse( new Buffer.from( result ) )
  }

  return null
}

module.exports = {

  init: async ( options ) => {

    if( options && options.language ) {
      config.language = options.language
    }

    if( options && options.languages ) {
      config.languages = options.languages
    }

    const category = await loadFile( `./data/category.json` )
    const custom = await loadFile( `./data/custom.json` )
    const blocks = await loadFile( `./data/blocks.json` )
    const food = await loadFile( `./data/food.json` )
    const items = await loadFile( `./data/items.json` )
    const mobs = await loadFile( `./data/mobs.json` )
    const tools = await loadFile( `./data/tools.json` )
    const animals = await loadFile( `./data/animals.json` )

    for( const language of config.languages ) {
      const l_category = await loadFile( `./data/${language}/category.json` )
      const l_custom = await loadFile( `./data/${language}/custom.json` )
      const l_blocks = await loadFile( `./data/${language}/blocks.json` )
      const l_food = await loadFile( `./data/${language}/food.json` )
      const l_items = await loadFile( `./data/${language}/items.json` )
      const l_mobs = await loadFile( `./data/${language}/mobs.json` )
      const l_tools = await loadFile( `./data/${language}/tools.json` )
      const l_animals = await loadFile( `./data/${language}/animals.json` )

      data[language] = [
        ...l_category.map( ( i_category, i ) => Object.assign( {}, i_category, category[i] ) ),
        ...l_custom.map( ( i_custom, i ) => Object.assign( {}, i_custom, custom[i] ) ),
        ...l_blocks.map( ( i_block, i ) => Object.assign( {}, i_block, blocks[i] ) ),
        ...l_food.map( ( i_food, i ) => Object.assign( {}, i_food, food[i] ) ),
        ...l_items.map( ( i_item, i ) => Object.assign( {}, i_item, items[i] ) ),
        ...l_mobs.map( ( i_mob, i ) => Object.assign( {}, i_mob, mobs[i] ) ),
        ...l_tools.map( ( i_tool, i ) => Object.assign( {}, i_tool, tools[i] ) ),
        ...l_animals.map( ( i_animal, i ) => Object.assign( {}, i_animal, animals[i] ) )
      ]
    }

  },

  get: async ( id, value = 0, language = null ) => {
    id = id.toLowerCase()
    if( !language ) language = config.language

    const block = data[language].find( d => d.id === id ) || {}
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

    if( !block.type || !Convert[block.type] ) return entry

    return await Convert[block.type]( entry )
  }

}
