const Units = require( 'convert-units' )

module.exports = {

  distance: async ( entry ) => {
    if( entry.value.raw > 0 ) {
      const value = parseInt( entry.value.raw )
      const convert = Units( value / 16 ).from( 'm' ).toBest()

      entry.value.formatted = {
        value: parseFloat( convert.val.toFixed(2) ),
        unit: convert.unit,
        singular: convert.singular,
        plural: convert.plural
      }
    }

    return entry
  },

  ticks: async ( entry ) => {
    if( entry.value.raw > 0 ) {
      const value = parseInt( entry.value.raw ) / 20
      const convert = Units( value ).from( 's' ).toBest()

      entry.value.formatted = {
        value: parseFloat( convert.val.toFixed(2) ),
        unit: convert.unit,
        singular: convert.singular,
        plural: convert.plural
      }
    }

    return entry
  },

  number: async ( entry ) => {
    return entry
  }

}
