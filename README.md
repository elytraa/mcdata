# MCStats
MCStats is a simple library with a sole purpose of providing simple details around
Minecraft blocks and entities. It's original use case was in combination with
Minecraft's internal stats tracker, needing additional information when showcasing
said data on an external website.

It will provide you with friendly names, descriptions and if available, a texture
for the said entity.

## Features
* Find block and entities by ID
* Returns friendly name, description and texture
* Converts Minecraft statistics values to humanly friendly formats

  * **Distance**  
  Will return the distance of value in the most appropriate manner, that be meters, kilometers or miles.
    * `fly_one_cm` with a value of `98232` will return `982.32` meters.

  * **Time / Ticks**  
  Will convert time (Ticks) to a humanly friendly format, that be minutes, hours, days, weeks or months.
    * `play_one_minute` with a value of `982382` will return `13.64` hours

  * **Numbers**  
  Regular plain numbers will be converted to a comma-seperated number.
    * `bone_meal` with a value of `982382` will return `982,382`

## Get started
The library loads all language files on first load, and stores them in memory. You need to initialize the library before you can start fetching entries.

```js
const mcstats = require( 'mcstats' )
mcstats.init( {
    language: 'en_US',
    languages: [
        'en_US',
        'nb_NO'
    ]
} )
```

Options are optional, the default language is `en_US`, if no array of languages if defined, then it will load all available languages into memory. The footprint is extremely low, and unless you're an absolute control freak :O, then it shouldn't be necessary to specify the languages.

Languages can be defined on the go, the language specified in `init` is the language used if no language is defined when fetching an entry.

## Get
```js
const data = stats.get( 'fly_one_cm', 98232, 'nb_NO' )
```

Returns

```JSON
{
  "id": "fly_one_cm",
  "value": 98232,
  "name": "Dyr reprodusert",
  "description": "",
  "type": "distance",
  "converted": {
    "val": 982.32,
    "unit": "m",
    "singular": "Meter",
    "plural": "Meters"
  }
}
```

**Arguement 1:** The unique ID from Minecraft stats  
**Arguement 2:** The value you have for that stat, which will be converted.  
**Arguement 3:** The language you want the text represented in, if no language is defined, the default one is used.

Only the first arguement is required, the second and third arguement can be excluded entirely depending on the result you want in return.
