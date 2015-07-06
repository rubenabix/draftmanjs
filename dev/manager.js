var manager = (function () {
  var manager;
  var firstPoint = new DRAFTMAN.Point2D(0.0, 0.0);
  var lastPoint = new DRAFTMAN.Point2D(0.0 , 0.0);
  var originPathPoint = new DRAFTMAN.Point2D(0.0, 0.0);
  var instructionPoints = {
    points: []
  };
  var currentPath = [];
  var paths = [];

  function addCurrentPathToPaths() {
    if (currentPath.length !== 0) {
      paths.push(currentPath.slice(0));
    }
    currentPath = [];
  }

  function addToCurrentPath(points){
    currentPath = currentPath.concat(points);
  }

  function getText() {
    return document.querySelector('#canvasCode').value;
  }

  function parseInstructions(instructions) {
    var formattedInstructions = instructions.replace(/\n/g, '');
    formattedInstructions = formattedInstructions.split(';');
    if (formattedInstructions) {
      formattedInstructions.pop();
    }
    return formattedInstructions;
  }

  function setInstructionPoints(instruction) {
    var start = instruction.indexOf('(');
    var end = instruction.indexOf(')');
    //console.log('setInstructionPoints(): ', instruction);
    instructionPoints.points = (instruction.substring(start + 1, end)).split(',');
    //console.log('setInstructionPoints(): points: ', instructionPoints.points);
    return instructionPoints.points;
  }


  function matchLastPointToOriginPathPoint(){
    lastPoint.x = originPathPoint.x;
    lastPoint.y = originPathPoint.y;
  }

  function matchOriginPathPointToFirstPoint(){
    originPathPoint.x = firstPoint.x;
    originPathPoint.y = firstPoint.y;
  }

  function matchFirstPoint(points){
    firstPoint.x = parseFloat(points[0]);
    firstPoint.y = parseFloat(points[1]);
  }

  function matchLastPoint(points){
    lastPoint.x = parseFloat(points[0]);
    lastPoint.y = parseFloat(points[1]);
  }

  function matchFirstToLastPoint(){
    firstPoint.x = lastPoint.x;
    firstPoint.y = lastPoint.y;
  }

  function classify(instruction) {

    var points;
    var tempPoints;
    var casteljauPoints;

    if (instruction.indexOf('translate') !== -1) {
      console.log('Instruction: ', instruction);
    } else if (instruction.indexOf('beginPath') !== -1) {
      // TODO: make function
      console.log('Instruction: ', instruction);
    } else if (instruction.indexOf('closePath') !== -1) {
      console.log('Instruction: ', instruction);
      tempPoints = [
        lastPoint,
        originPathPoint
      ];
      casteljauPoints = SVG.calculateDeCasteljau(tempPoints);
      addToCurrentPath(casteljauPoints);
      matchLastPointToOriginPathPoint();

      console.log('DEBUG: closePath');
      console.log(casteljauPoints);
      console.log('subPath:');
      console.log(currentPath);
    } else if (instruction.indexOf('moveTo') !== -1) {
      console.log('Instruction: ', instruction);
      addCurrentPathToPaths();
      points = setInstructionPoints(instruction);
      matchFirstPoint(points);
      matchLastPoint(points);
      matchOriginPathPointToFirstPoint();
      addToCurrentPath(firstPoint.clone());
    } else if (instruction.indexOf('lineTo') !== -1) {
      console.log('Instruction: ', instruction);
      points = setInstructionPoints(instruction);
      matchFirstToLastPoint();
      matchLastPoint(points);
      tempPoints = [
        firstPoint,
        lastPoint
      ];
      casteljauPoints = SVG.calculateDeCasteljau(tempPoints);
      addToCurrentPath(casteljauPoints);
    } else if (instruction.indexOf('scale') !== -1) {
      // TODO: make function
      console.log('Instruction: ', instruction);
    } else if (instruction.indexOf('strokeStyle') !== -1) {
      // TODO: make function
      console.log('Instruction: ', instruction);
    } else if (instruction.indexOf('lineCap') !== -1) {
      // TODO: make function
      console.log('Instruction: ', instruction);
    } else if (instruction.indexOf('lineJoin') !== -1) {
      // TODO: make function
      console.log('Instruction: ', instruction);
    } else if (instruction.indexOf('miterLimit') !== -1) {
      // TODO: make function
      console.log('Instruction: ', instruction);
    } else if (instruction.indexOf('fillStyle') !== -1) {
      // TODO: make function
      console.log('Instruction: ', instruction);
    } else if (instruction.indexOf('bezierCurveTo') !== -1) {
      console.log('Instruction: ', instruction);
      points = setInstructionPoints(instruction);
      var cp1x, cp1y, cp2x, cp2y, x, y;
      cp1x = parseFloat(points[0]);
      cp1y = parseFloat(points[1]);
      cp2x = parseFloat(points[2]);
      cp2y = parseFloat(points[3]);
      x = parseFloat(points[4]);
      y = parseFloat(points[5]);
      matchFirstToLastPoint();
      tempPoints = [
        firstPoint,
        new DRAFTMAN.Point2D(cp1x, cp1y),
        new DRAFTMAN.Point2D(cp2x, cp2y),
        new DRAFTMAN.Point2D(x, y)
      ];
      casteljauPoints = SVG.calculateDeCasteljau(tempPoints);
      addToCurrentPath(casteljauPoints);
      lastPoint.x = x;
      lastPoint.y = y;
    } else {
      // TODO: make function
      console.log('Undefined instruction: ', instruction);
    }
  }

  function getPoints() {
    var canvasText;
    canvasText = getText().trim();
    if (canvasText) {
      var formattedInstructions = parseInstructions(canvasText);
      //console.log(formattedInstructions);
      if (formattedInstructions) {
        for (var i = 0, length = formattedInstructions.length;
             i < length; ++i) {
          classify(formattedInstructions[i]);
        }
        addCurrentPathToPaths();
      }
    }
    console.log('Path generated: ', paths);
    return paths.slice(1);
  }

  manager = {
    getPoints: getPoints
  };

  return manager;
})(document);
