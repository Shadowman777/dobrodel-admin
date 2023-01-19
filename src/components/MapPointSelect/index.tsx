import React, { FC, useEffect, useRef, useState } from 'react'

import loadMap from 'utils/loadMap'

interface Props {
  onChange: (value: any) => void
}
function addDraggableMarker(
  map: H.Map,
  behavior: H.mapevents.Behavior,
  platform: any,
  onChange: (value: any) => void
) {
  const marker = new H.map.Marker(
    { lat: 55.751244, lng: 37.618423 },
    {
      // mark the object as volatile for the smooth dragging
      volatility: true
    }
  )
  // Ensure that the marker can receive drag events
  marker.draggable = true
  map.addObject(marker)

  // disable the default draggability of the underlying map
  // and calculate the offset between mouse and target's position
  // when starting to drag a marker object:
  map.addEventListener(
    'dragstart',
    function dragstart(ev: any) {
      const { target } = ev
      const pointer = ev!.currentPointer
      if (target instanceof H.map.Marker) {
        const targetPosition = map.geoToScreen(
          target.getGeometry() as H.geo.IPoint
        )
        target.offset = new H.math.Point(
          pointer.viewportX - targetPosition.x,
          pointer.viewportY - targetPosition.y
        )
        behavior.disable()
      }
    },
    false
  )

  // re-enable the default draggability of the underlying map
  // when dragging has completed
  map.addEventListener(
    'dragend',
    function dragend(ev) {
      const { target } = ev
      if (target instanceof H.map.Marker) {
        const geometry = target.getGeometry() as H.geo.Point
        const geocoder = platform.getSearchService()
        geocoder.reverseGeocode(
          {
            at: `${geometry.lat},${geometry.lng}`,
            limit: 1
          },
          (data: any) => {
            onChange(data.items[0])
          }
        )
        behavior.enable()
      }
    },
    false
  )
  //
  // // Listen to the drag event and move the position of the marker
  // // as necessary
  map.addEventListener(
    'drag',
    function drag(ev: any) {
      const { target } = ev
      const pointer = ev.currentPointer
      if (target instanceof H.map.Marker) {
        target.setGeometry(
          map.screenToGeo(
            pointer.viewportX - target.offset.x,
            pointer.viewportY - target.offset.y
          )
        )
      }
    },
    false
  )
}

export const MapPointSelect: FC<Props> = ({ onChange }) => {
  const [platform, setPlatform] = useState<any>()
  const mapRef = useRef(null)

  useEffect(() => {
    loadMap().then((platform: any) => {
      setPlatform(platform)
    })
  }, [])

  useEffect(() => {
    if (platform && mapRef.current) {
      const defaultLayers = platform.createDefaultLayers()
      const map = new H.Map(mapRef.current!, defaultLayers.vector.normal.map, {
        center: { lat: 55.751244, lng: 37.618423 },
        zoom: 12,
        pixelRatio: window.devicePixelRatio || 1
      })

      // Step 3: make the map interactive
      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

      // Step 4: Create the default UI:
      H.ui.UI.createDefault(map, defaultLayers, 'ru-RU')

      // Add the click event listener.
      addDraggableMarker(map, behavior, platform, onChange)
    }
  }, [platform, mapRef])

  return <div id="here-map" style={{ height: 400 }} ref={mapRef} />
}
