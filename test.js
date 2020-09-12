const Stats = require( './index' )

Stats.init()

async function init() {

  const distance = await Stats.get( 'fly_one_cm', 98232 )
  const ticks = await Stats.get( 'play_one_minute', 982382 )
  const number = await Stats.get( 'bone_meal', 982382 )

  console.log( distance )
  console.log( ticks )
  console.log( number )

}

setTimeout( () => init(), 500 )
