const createClient = require('@supabase/supabase-js').createClient

const supabaseAdmin = createClient(
  'https://fhrvetzsdnxblhupufpp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocnZldHpzZG54YmxodXB1ZnBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE5Mjk2MjAsImV4cCI6MTk2NzUwNTYyMH0.YCX0frjMfZiikIH1ElxABrb_uwEufTQitIzyKPjysEU'
)

const data = [
  {
    name: 'Kevin Canlas',
    username: '@kvncnls',
    href: 'https://twitter.com/kvncnls/status/1471832344986324998',
    imageSrc:
      'https://pbs.twimg.com/media/FGz_t1wXIAIFyT-?format=jpg&name=900x900',
  },
  {
    name: 'Ahmad Awais',
    username: '@MrAhmadAwais',
    href: 'https://twitter.com/MrAhmadAwais/status/1338151679083032577',
    imageSrc:
      'https://pbs.twimg.com/media/EpIR281XIAMUrEM?format=jpg&name=4096x4096',
  },
  {
    name: 'Leandro Soengas',
    username: '@lsoengas',
    href: 'https://twitter.com/lsoengas/status/1352302741339693061',
    imageSrc:
      'https://pbs.twimg.com/media/EsRYK8oWMAEkObV?format=jpg&name=large',
  },
  {
    name: 'Samina',
    username: '@saminacodes',
    href: 'https://twitter.com/saminacodes/status/1466479548837482497',
    imageSrc:
      'https://pbs.twimg.com/media/FFn7X76VgAEVTgs?format=jpg&name=large',
  },
  {
    name: 'lafond.eth',
    username: '@laf0nd',
    href: 'https://twitter.com/laf0nd/status/1464640065615929346',
    imageSrc:
      'https://pbs.twimg.com/media/FFNyYEAXsAMdOhV?format=jpg&name=large',
  },
  {
    name: '山岸和利💛',
    username: '@ykzts',
    href: 'https://twitter.com/ykzts/status/1426358452356407297',
    imageSrc:
      'https://pbs.twimg.com/media/E8txb20VEAIZKlj?format=jpg&name=small',
  },
  {
    name: 'Altngelo',
    username: '@AfterDarkAngelo',
    href: 'https://twitter.com/AfterDarkAngelo/status/1456372859090075648',
    imageSrc:
      'https://pbs.twimg.com/media/FDYTZN1VIAAT-X1?format=jpg&name=large',
  },
  {
    name: 'Matias Baldanza',
    username: '@matiasbaldanza',
    href: 'https://twitter.com/matiasbaldanza/status/1404834163203715073',
    imageSrc:
      'https://pbs.twimg.com/media/E374pyaWEAMCT2R?format=jpg&name=medium',
  },
  {
    name: 'Dami',
    username: '@Dakitianthm',
    href: 'https://twitter.com/Dakitianthm/status/1469757414018883585',
    imageSrc:
      'https://pbs.twimg.com/media/FGWgks9WQAgTxof?format=jpg&name=large',
  },
  {
    name: 'Adithya Sreyaj',
    username: '@AdiSreyaj',
    href: 'https://twitter.com/AdiSreyaj/status/1463165275965169664',
    imageSrc:
      'https://pbs.twimg.com/media/FE41D-TWYB0p42P?format=jpg&name=large',
  },
  {
    name: 'James Edmonston',
    username: '@jamesedmonston',
    href: 'https://twitter.com/jamesedmonston/status/1467089889946705920',
    imageSrc:
      'https://pbs.twimg.com/media/FFwmeOlXoAkPb9R?format=jpg&name=large',
  },
  {
    name: 'geeky Chakri',
    username: '@geekyChakri',
    href: 'https://twitter.com/geekyChakri/status/1373261958934228993',
    imageSrc:
      'https://pbs.twimg.com/media/Ew7OeHqUcAIh2o-?format=jpg&name=medium',
  },
  {
    name: 'Jose Rago',
    username: '@ragojose',
    href: 'https://twitter.com/ragojose/status/1445072986005020676',
    imageSrc:
      'https://pbs.twimg.com/media/FA3uFy7XoAcpA9m?format=jpg&name=large',
  },
  {
    name: 'Sunny Singh',
    username: '@sunnysinghio',
    href: 'https://twitter.com/sunnysinghio/status/1429769868577058817',
    imageSrc:
      'https://pbs.twimg.com/media/E9ePlE-X0AUhFW7?format=jpg&name=small',
  },
  {
    name: 'Domitrius Clark',
    username: '@domitriusclark',
    href: 'https://twitter.com/domitriusclark/status/1467547760761229315',
    imageSrc:
      'https://pbs.twimg.com/media/FF3G6LVWUAYIrzI?format=jpg&name=medium',
  },
  {
    name: 'Ben Seymour',
    username: '@bseymour',
    href: 'https://twitter.com/bseymour/status/1406995772449697792',
    imageSrc:
      'https://pbs.twimg.com/media/E4anMdiXwAgujM1?format=jpg&name=large',
  },
  {
    name: 'Sara Lissette',
    username: '@LissetteIbnz',
    href: 'https://twitter.com/LissetteIbnz/status/1464170050768838657',
    imageSrc:
      'https://pbs.twimg.com/media/FFHGaSDX0BUCS5f?format=jpg&name=large',
  },
  {
    name: 'Daniel Eden',
    username: '@_dte',
    href: 'https://twitter.com/_dte/status/1351431506946895872',
    imageSrc:
      'https://pbs.twimg.com/media/EsE_yeGXcAEhXus?format=jpg&name=large',
  },
  {
    name: 'Diego Gennaro',
    username: '@_nnaro_',
    href: 'https://twitter.com/_nnaro_/status/1366783542412390401',
    imageSrc:
      'https://pbs.twimg.com/media/EvfKYyrXcAwtjOG?format=jpg&name=large',
  },
  {
    name: 'Connor',
    username: '@cnrstvns',
    href: 'https://twitter.com/cnrstvns/status/1470606788399550470',
    imageSrc:
      'https://pbs.twimg.com/media/FGilFGXVQAIsAl0?format=jpg&name=large',
  },
  {
    name: 'Avneesh Agarwal',
    username: '@avneesh0612',
    href: 'https://twitter.com/avneesh0612/status/1453332806101131270',
    imageSrc:
      'https://pbs.twimg.com/media/FCtGdQXUcA4tUYP?format=jpg&name=medium',
  },
  {
    name: 'Vitaly Goncharenko',
    username: '@vgoncharenko',
    href: 'https://twitter.com/vgoncharenko/status/1470765276966883336',
    imageSrc:
      'https://pbs.twimg.com/media/FGk1OBAWYAQfbeI?format=jpg&name=large',
  },
  {
    name: 'Brittney Postma',
    username: '@BrittneyPostma',
    href: 'https://twitter.com/BrittneyPostma/status/1471591143192334346',
    imageSrc:
      'https://pbs.twimg.com/media/FGwkV76XMAIu65J?format=jpg&name=large',
  },
  {
    name: 'Steven Tey',
    username: '@steventey',
    href: 'https://twitter.com/steventey/status/1388604588836626434',
    imageSrc:
      'https://pbs.twimg.com/media/E0UtnC6VoAIQ2DR?format=jpg&name=small',
  },
  {
    name: 'Tiger Abrodi',
    username: '@TAbrodi',
    href: 'https://twitter.com/TAbrodi/status/1471498785092112384',
    imageSrc:
      'https://pbs.twimg.com/media/FGvQVrdVgAI-5IX?format=jpg&name=900x900',
  },
  {
    name: 'Vivaan Verma',
    username: '@doublevcodes',
    href: 'https://twitter.com/doublevcodes/status/1472989524414369800',
    imageSrc:
      'https://pbs.twimg.com/media/FHEcKVOWQAAhS7F?format=jpg&name=medium',
  },
  {
    name: 'Simo',
    username: '@fr3fou',
    href: 'https://twitter.com/fr3fou/status/1337451087440318465',
    imageSrc:
      'https://pbs.twimg.com/media/Eo-UqNRWMAIw3tt?format=jpg&name=medium',
  },
  {
    name: 'Adrián Mato',
    username: '@adrianmg',
    href: 'https://twitter.com/adrianmg/status/1471910576032870400',
    imageSrc:
      'https://pbs.twimg.com/media/FG1G3hgVQAIIiFd?format=jpg&name=900x900',
  },
  {
    name: 'Oliver Lopez',
    username: '@oliverloops',
    href: 'https://twitter.com/oliverloops/status/1471911275219271685',
    imageSrc:
      'https://pbs.twimg.com/media/FG1HfprWYAAYfA_?format=jpg&name=large',
  },
  {
    name: 'Marina Baskova',
    username: '@marina_baskov',
    href: 'https://twitter.com/marina_baskov/status/1471915004592996355',
    imageSrc:
      'https://pbs.twimg.com/media/FG1K5VPUYAcenxK?format=jpg&name=large',
  },
  {
    name: 'Vinnie the Kid',
    username: '@vinniebontempo',
    href: 'https://twitter.com/vinniebontempo/status/1471896578231312386',
    imageSrc:
      'https://pbs.twimg.com/media/FG0565hXMAoZYVy?format=jpg&name=large',
  },
  {
    name: 'Jiachi',
    username: '@huozhi',
    href: 'https://twitter.com/huozhi/status/1471880416458117127',
    imageSrc:
      'https://pbs.twimg.com/media/FG0rb2tWYAcCrDI?format=jpg&name=medium',
  },
]

const result = data.map(d => {
  return {
    ...d,
    imageSrc: d.imageSrc.replace('}', ''),
  }
})

supabaseAdmin
  .from('gallerylee')
  .insert(result)
  .then(res => console.log(res))
  .catch(err => console.log(err))
