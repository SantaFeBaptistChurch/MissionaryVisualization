// Missionary location data
// Gabriel Gutiérrez

let mapimg

let clon = 0
let clat = 0

let ww = 1280
let hh = 800

let zoom = 1
let missionaries

function preload() {
    mapimg = loadImage(`https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/${clon},${clat},${zoom}/${ww}x${hh}?access_token=pk.eyJ1IjoiZ2FldGd1IiwiYSI6ImNrbDc3MDlsejA0Zmsydm12dGZxYTJpYzMifQ.fRl_t2MAF3FFSAaXFrrFpw`)
    // missionaries = loadStrings('missionary_data.csv')
    missionaries = loadStrings('https://raw.githubusercontent.com/SantaFeBaptistChurch/MissionaryVisualization/main/missionary_data.csv')
}

function mercX(lon) {
    lon = radians(lon)
    var a = (256 / PI) * pow(2, zoom)
    var b = lon + PI
    return a * b
}

function mercY(lat) {
    lat = radians(lat)
    var a = (256 / PI) * pow(2, zoom)
    var b = tan(PI / 4 + lat / 2)
    var c = PI - log(b)
    return a * c
}


function setup() {
    createCanvas(ww, hh)
    translate(width / 2, height / 2)
    imageMode(CENTER)
    image(mapimg, 0, 0)

    var cx = mercX(clon)
    var cy = mercY(clat)

    for (var i = 1; i < missionaries.length; i++) {
        var data = missionaries[i].split(/,/)
        var lat = data[1]
        var lon = data[2]
        var amt = data[3]
        var x = mercX(lon) - cx
        var y = mercY(lat) - cy

        if (x < -width / 2) {
            x += width
        } else if (x > width / 2) {
            x -= width
        }

        amt = pow(10, amt)
        amt = sqrt(amt)
        var amtmax = sqrt(pow(10, 10))
        var d = map(amt, 0, amtmax, 5, 80)
        stroke(255, 0, 255)
        fill(255, 0, 255, 200)
        ellipse(x, y, d, d)
    }

}