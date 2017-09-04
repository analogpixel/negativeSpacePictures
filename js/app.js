var hide = new Group( { insert: false});
var display = new Group();
var pixelWidth = 15;
var pixelHeight = 15;
var overlap = 3;
var subPercent=0;
var invert=true;
var flatEdges =true;

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function pixelData(x,y) {
	return canvas.getContext('2d').getImageData(x, y, 1, 1).data;
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

$(  function() { 


	img = document.getElementById('my-image');
	canvas = document.createElement('canvas');
	canvas.width = img.width*pixelWidth;
	canvas.height = img.height*pixelHeight;
	canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

	view.viewSize = [canvas.width, canvas.height];

	for (var x=0; x < img.width; x++) {

		// rectangle to subtract from
		var rectWidth = pixelWidth- (pixelWidth*.8);
		
		var sideRect = new Path.Rectangle(x*pixelWidth, 0, rectWidth , canvas.height, { insert: false });
		sideRect.fillColor = 'black';

		for (var y=0; y < img.height;y++) {

			if (invert) {
			var pw = map_range( pixelData(x,y)[0], 0, 255, pixelWidth-(pixelWidth*subPercent),0 );
			} else {
			var pw = map_range( pixelData(x,y)[0], 0, 255, 0,pixelWidth-(pixelWidth*subPercent));
			}
			
			
			var tmp2 = new Path.Rectangle((x * pixelWidth)+rectWidth,0, 10, canvas.height )
			tmp2.fillColor='red';

			if (flatEdges) {
			  var tmp1 = new Path.Ellipse( {center: [x*pixelWidth, y*pixelHeight-overlap], size: [pw, pixelHeight+(overlap*2)]} ).subtract(tmp2);
			} else {
			  var tmp1 = new Path.Ellipse( {center: [x*pixelWidth, y*pixelHeight-overlap], size: [pw, pixelHeight+(overlap*2)]} );
			}

			tmp1.fillColor='green';
			
			

			sideRect = sideRect.unite( tmp1 );
			tmp1.remove();
			tmp2.remove();
		}
		
		sideRect.simplify(.2);
	}
 } );


