import hereMapJS from '@limistah/here-map-js'

const _mapEvents = [
  'pointerdown',
  'pointerup',
  'pointermove',
  'pointerenter',
  'pointerleave',
  'pointercancel',
  'dragstart',
  'drag',
  'dragend',
  'tab',
  'dbltap'
]

const options = {
  VERSION: 'v3/3.1',
  MAP_TYPE: 'normal.map',
  mapTypes: {
    normal: [
      'xbase',
      'xbasenight',
      'base',
      'basenight',
      'map',
      'mapnight',
      'traffic',
      'trafficnight',
      'transit',
      'panorama',
      'panoramanight',
      'labels',
      'metaInfo'
    ],
    satellite: ['xbase', 'base', 'map', 'traffic', 'panorama', 'labels'],
    terrain: ['xbase', 'base', 'map', 'traffic', 'panorama', 'labels'],
    incidents: true,
    venues: true
  },
  mapOptions: {
    zoom: 8,
    center: {
      lat: 6.5243793,
      lng: 3.3792057
    }
  },
  useEvents: true,
  interactive: true,
  includeUI: true,
  containerId: 'HERE_MAP_CONTAINER',
  defaultClassName: 'here-map-container',
  includePlaces: true,
  mapEvents: {},
  apikey: process.env.REACT_APP_HERE_API_KEY,
  app_id: process.env.REACT_APP_HERE_APP_ID
}
// Function that does really nothing, still it is a function, and has its right!
const noop = () => {}
_mapEvents.forEach((name) => {
  options.mapEvents[name] = noop
})

/**
 * Script initialization, bootstraps needed utils for successful running of the library
 * @property {string} options.version Version of the api to load. Defaults to v3
 * @property {string} options.interactive Adds interactive scripts
 * @property {object} options.includeUI Should add the UI scripts
 * @property {string} options.includePlaces Include the places script
 */

let platform

const loadMap = () => {
  const { VERSION, version, interactive, includeUI, includePlaces } = options
  // Returns async loading of the component
  // First load the core, to save us reference error if all of the libraries are loaded asynchronously due to race conditions

  if (platform) {
    return Promise.resolve(platform)
  }

  return hereMapJS({
    includeUI,
    includePlaces,
    interactive,
    version: version || VERSION
  }).then(() => initPlatform(options))
}

const initPlatform = (options) => {
  const { app_id, app_code, apikey } = options
  if ((!app_id || !app_code) && !apikey) {
    throw new Error('Options must include appId and appCode OR an apiKey')
  }
  if (typeof window.H === 'undefined' || !window.H.service) {
    throw new Error('Here Map JavaScripts is not loaded.')
  }
  platform = new window.H.service.Platform(options)
  return platform
}

export default loadMap
