var SVG = (function () {

  function calculateDeCasteljauPoint(r, i, t, points) {
    if (r === 0) {
      return points[i];
    }
    var point0 = SVG.calculateDeCasteljauPoint(r - 1, i, t, points);
    var point1 = SVG.calculateDeCasteljauPoint(r - 1, i + 1, t, points);
    var x, y;

    x = (1 - t) * point0.x + t * point1.x;
    y = (1 - t) * point0.y + t * point1.y;

    return new DRAFTMAN.Point2D(x, y);
  }

  function calculateDeCasteljau(points) {
    var t = 0.0;
    var temporalPoint;
    var resultPoints = [];
    var totalPoints = points.length;
    while (t <= 1) {
      t += SVG.changeFactor;
      //console.log('current t: ', t);
      temporalPoint = SVG.calculateDeCasteljauPoint(totalPoints - 1, 0, t, points);
      resultPoints.push(temporalPoint);
      //console.log('Current list: ', resultPoints);
    }
    return resultPoints;
  }

  function SVG(changeFactor) {
  }

  SVG.changeFactor = 0.04;

  SVG.calculateDeCasteljauPoint = calculateDeCasteljauPoint;

  SVG.calculateDeCasteljau = calculateDeCasteljau;

  SVG.prototype = {
    constructor: SVG
  }

  var SVG = SVG || {};

  return SVG;

})();


window.onload = function () {
  var points = [
    new DRAFTMAN.Point2D(14.270481, 282.29694),
    new DRAFTMAN.Point2D(3.9297998, 274.69121),
    new DRAFTMAN.Point2D(0.74775866, 260.1491),
    new DRAFTMAN.Point2D(0.068879591, 247.89146)
  ];
  //
  var pointsPath = SVG.calculateDeCasteljau(points);
  //
  console.log('points: ', points);
  console.log(pointsPath);

  var puntosRutaCompleta;

  //$('#canvasCode').click(function(){
  //  alert('The paragraph was clicked.');
  //});


};

