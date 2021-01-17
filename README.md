# MCStats
MCStats is a simple library with a sole purpose of providing simple details around Minecraft blocks and entities. It's original use case was in combination with Minecraft's internal stats tracker, needing additional information when showcasing said data on an external website.

It will provide you with friendly names, descriptions and if available, a texture for the said entity.

## Features
* Find block and entities by ID
* Returns friendly name, description and texture
* Converts Minecraft statistics values to humanly friendly formats

  * **Distance**  
  Will return the distance of value in the most appropriate manner, that be centimeters, meters, kilometers or miles.
    * `fly_one_cm` with a value of `98232` will return `982.32` meters. One meter
    is the same as one block.

  * **Time / Ticks**  
  Will convert time (Ticks) to a humanly friendly format, that be minutes, hours, days, weeks or months.
    * `play_one_minute` with a value of `982382` will return `13.64` hours

  * **Units**  
  Regular plain units will be converted to a comma-seperated number.
    * `bone_meal` with a value of `982382` will return `982,382` units

## Get started
The library loads all language files on first load, and stores them in memory. You need to initialize the library before you can start fetching entries.

```js
const Mcdata = require( 'mcdata' )

try {

  // Load statistics
  await Stats.init({
    language: 'nb_NO',
    languages: [
      'en_US',
      'nb_NO'
    ]
  })

  // Get info on a key
  const fly_one_cm = await Stats.get('fly_one_cm')
  console.log(fly_one_cm)

  // Get info on a key AND convert a value
  const play_one_minute = await Stats.get('play_one_minute', 9823)
  console.log(play_one_minute)

  // Get info on a key AND convert a value AND specify the language
  const deaths = await Stats.get('deaths', 271, 'nb_NO')
  console.log(deaths)

} catch(error) {

  // Handle errors, like unknown key, unknown language etc.

}
```

Options are optional, the default language is `en_US`, if no array of languages if defined, then it will load all available languages into memory. The footprint is extremely low, and unless you're an absolute control freak :O, then it shouldn't be necessary to specify the languages.

Languages can be defined on the go, the language specified in `init` is the language used if no language is defined when fetching an entry.

## Get
```js
const default = stats.get('fly_one_cm', 98232) // Returns the default language
const norwegian = stats.get('fly_one_cm', 98232, 'nb_NO') // Returns norwegian
const norwegian = stats.get('fly_one_cm', 98232, 'en_US') // Returns english
```

Returns

```javascript
{
	id: "fly_one_cm",
	entity: {
		name: "Avstand flydd",
		description: "Distanse i antall blokker for hvor langt det er flydd.",
		texture: null
	},
	value: {
		raw: 16,
		type: "distance",
		formatted: {
			value: 16,
			unit: "cm",
			singular: "centimeter",
			plural: "centimeters"
		}
	}
}
```

**Arguement 1:** The unique ID from Minecraft stats  
**Arguement 2:** The value you have for that stat, which will be converted.  
**Arguement 3:** The language you want the text represented in, if no language is defined, the default one is used.

Only the first arguement is required, the second and third arguement can be excluded entirely depending on the result you want in return.
