const Units = require( 'convert-units' )

module.exports = {

  distance: async ( entry ) => {
    if( entry.value.raw > 0 ) {
      const value = parseInt( entry.value.raw )
      const convert = Units( value / 100 ).from( 'm' ).toBest()

      entry.value.formatted = {
        value: parseFloat( convert.val.toFixed(2) ),
        unit: convert.unit,
        singular: convert.singular.toLowerCase(),
        plural: convert.plural.toLowerCase()
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
        singular: convert.singular.toLowerCase(),
        plural: convert.plural.toLowerCase()
      }
    }

    return entry
  },

  unit: async ( entry ) => {
    if( entry.value.raw > 0 ) {
      entry.value.formatted = {
        value: entry.value.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        unit: 'u',
        singular: 'unit',
        plural: 'units'
      }
    }

    return entry
  }

}
