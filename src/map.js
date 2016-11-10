var map;
var markers = [];
var polygons = [];

/** Show a map of Sierra Leone. */
export function initMap() {
    map = new google.maps.Map(document.getElementById('theMap'), {
        center: { lat: 8.5, lng: -12 },
        zoom: 8
    });
}

/** Add markers. places is an array of { lat: n, lng: n, title: s } objects. */
export function mapAddMarkers(places) {
    var newMarkers = places.map(p =>
        new google.maps.Marker({
            map: map,
            position: {lat: p.lat, lng: p.lng},
            title: p.title
        })
    );
    markers.concat(newMarkers);
}

/** Remove all markers from the map.*/
export function mapClearMarkers() {
    markers.forEach(m => m.setMap(null));
    markers.length = 0;
}

/**
 * Draw a polygon on the map. area is a coordinates value of type POLYGON
 * from the DHIS API.
 */
export function mapAddPolygon(area) {
    // Convert to an array of LatLng objects
    var coords = area[0][0].map(a => ({lat: a[1], lng: a[0]}));
    var poly = new google.maps.Polygon({
        map: map,
        paths: coords,
        strokeColor: '#0000B0',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0
    });

    google.maps.event.addListener(poly, "click", (event) => {
        console.log("Click in polygon:");
        console.log(poly);
    });

    polygons.push(poly);
}

/** Remove all polygons from the map. */
export function mapClearPolygons() {
    polygons.forEach(p => p.setMap(null));
    polygons.length = 0;
}

/** Load the Google Maps API, call a function when it's done. */
export function loadGoogleMaps(callback) {
    var script = document.createElement('script');
    script.onload = callback;
    script.src = "https://maps.googleapis.com/maps/api/js";
    document.body.appendChild(script);
}
