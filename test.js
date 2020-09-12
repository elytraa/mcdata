const Stats = require('./src/keys')

async function init() {
  try {

    // Load statistics
    await Stats.init({
      language: 'nb_NO',
      languages: [
        'nb_NO'
      ]
    })

    // Check some keys
    const distance = await Stats.get('fly_one_cm', 16)
    const ticks = await Stats.get('play_one_minute', 982382)
    const number = await Stats.get('damage_taken', 982382)

    // Console.logs
    console.log(distance)
    console.log(ticks)
    console.log(number)

  } catch(error) {

    console.log(error)

  }
}

init()
