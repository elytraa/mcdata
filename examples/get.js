const Stats = require('../src/Stats')

async function init() {
  try {

    // Load statistics
    await Stats.init({
      language: 'nb_NO',
      languages: [
        'nb_NO'
      ],
      textures: true
    })

    const fly_one_cm = await Stats.get('fly_one_cm', 25000000)
    console.log(fly_one_cm)

    const play_one_minute = await Stats.get('play_one_minute')
    console.log(play_one_minute)

    const deaths = await Stats.get('deaths', 12000)
    console.log(deaths)

    const blocks_placed = await Stats.get('bone_meal')
    console.log(blocks_placed)

  } catch(error) {

    console.log(error)

  }
}

init()
