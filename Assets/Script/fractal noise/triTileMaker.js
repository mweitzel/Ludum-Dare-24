#pragma strict

var atlas : Atlas;
var atlasHigh : Atlas;
var atlasMid : Atlas;
var atlasLow : Atlas;
var noise : NoisePattern;

var bucket : Transform;

function Start () {
}

var yet = false;
var call = false;
var callNext = false;
function Update () {
	

	call = callNext;
	callNext = false;

	if(!yet){
		buildShit();
		yet = true;
		callNext = true;
	}
	
	if(call){
		call = false;
		for(var sprite : SpriteAnimation in sprites)
			sprite.display();
	}
	
//	var thing : GameObject = CalmSpritesFactory.newSpriteAnimation(atlas, "000").gameObject;

}

var sprites = new Array();

function buildShit() {
	sprites.Clear();
	if(bucket != null)
		Destroy(bucket.gameObject);
		
	bucket = new GameObject().transform;
	
	noise.doIt();
	for(var i = 0; i < noise.size-1; i++){
		for(var j = 0; j < noise.size-1; j++){
			var sa : SpriteAnimation;
			if(j%2 == 0){
				sprites.Add(makeUpsideDownTriangleToTheRight(i, j));
				sprites.Add(makeTriangle(i, j));
			}
			else{
				sprites.Add(makeTriangleToTheRight(i,j));
				sprites.Add(makeUpsideDownTriangle(i,j));
			}
		}
	}
//	bucket.localScale.z = 1.1;
	bucket.localScale.z = 1.001;
	bucket.transform.position.z +=1;
}

function makeTriangle(i : int, j : int) : SpriteAnimation {
	var point1 = noise.field[i, j];
	var point2 = noise.field[i+1, j+1];
	var point3 = noise.field[i, j+1];

	setAtlas(Vector3(point1, point2, point3));

	var sprite = prefix+"_";
	sprite += ""+clamp(point1);
	sprite += ""+clamp(point2);
	sprite += ""+clamp(point3);
	var triangle : GameObject = CalmSpritesFactory.newSpriteAnimation(atlas, sprite).gameObject;
	var holder = new GameObject(i + " " + j);
	triangle.transform.parent = holder.transform;
	holder.transform.position = Vector3(12*i, -10*j, 0);

//	triangle.transform.localScale.x = -1;
//	triangle.transform.localScale.y = -1;
	holder.transform.parent = bucket;
	
		triangle.transform.localScale.x = 2;
	triangle.transform.localScale.x = 1;
	
	return triangle.GetComponent(SpriteAnimation);

}

function makeUpsideDownTriangle(i : int, j : int) : SpriteAnimation {
	var point1 = noise.field[i, j+1];
	var point2 = noise.field[i, j];
	var point3 = noise.field[i+1, j];

	setAtlas(Vector3(point1, point2, point3));

	var sprite =prefix+"_";
	sprite += ""+clamp(point1);
	sprite += ""+clamp(point2);
	sprite += ""+clamp(point3);
	var triangle : GameObject = CalmSpritesFactory.newSpriteAnimation(atlas, sprite).gameObject;
	var holder = new GameObject(i + " " + j);
	triangle.transform.parent = holder.transform;
	holder.transform.position = Vector3(12*i, -10*j, 0);
	triangle.transform.localScale.x = -1;
	triangle.transform.localScale.y = -1;
	holder.transform.parent = bucket;
	
		return triangle.GetComponent(SpriteAnimation);

}

static function getTileType(myTileMaker : triTileMaker, i : int, j : int) : String {
	i = i/12;
	j = -j/10;
	
	
	if(i < 0 || i >= myTileMaker.noise.size-1 || j < 0 || j >= myTileMaker.noise.size-1)
		return "x";	
	
	var point1 = myTileMaker.noise.field[i, j+1];
	var point2 = myTileMaker.noise.field[i, j];
	var point3 = myTileMaker.noise.field[i+1, j];
	
	var points = Vector3(point1, point2, point3);
	var prefix = "";
	if((points.x <  myTileMaker.valueLow*2 &&
		points.y <  myTileMaker.valueLow*2 &&
		points.z <  myTileMaker.valueLow*2)
	)	
		prefix = "l";
	else if((points.x >  myTileMaker.valueHigh*2 &&
	points.y >  myTileMaker.valueHigh*2 &&
	points.z >  myTileMaker.valueHigh*2)
//	||
//	(points.x <  valueLow*8 ||
//	points.y <  valueLow*8 ||
//	points.z <  valueLow*8)
	)	
		prefix = "h";
	else
		prefix = "m";
	
	return prefix;
}

function makeTriangleToTheRight(i : int, j : int) : SpriteAnimation {
//	Debug.Log(noise.field.length + " " + noise.field[0].length);
	var point1 = noise.field[i+1, j];
	var point2 = noise.field[i+1, j+1];
	var point3 = noise.field[i, j+1];
	
	setAtlas(Vector3(point1, point2, point3));
	
	var sprite = prefix+"_";
	sprite += ""+clamp(point1);
	sprite += ""+clamp(point2);
	sprite += ""+clamp(point3);
	var triangle : GameObject = CalmSpritesFactory.newSpriteAnimation(atlas, sprite).gameObject;
	var holder = new GameObject(i + " " + j);
	triangle.transform.parent = holder.transform;
	holder.transform.position = Vector3(12*i + 6, -10*j, 0);
//	triangle.transform.localScale.x = -1;
//	triangle.transform.localScale.y = -1;
	holder.transform.parent = bucket;
	triangle.transform.localScale.x = 2;
	triangle.transform.localScale.x = 1;
	
		return triangle.GetComponent(SpriteAnimation);

}

function makeUpsideDownTriangleToTheRight(i : int, j : int) : SpriteAnimation {
	var point1 = noise.field[i+1, j+1];
	var point2 = noise.field[i, j];
	var point3 = noise.field[i+1, j];

	setAtlas(Vector3(point1, point2, point3));

	var sprite = prefix+"_";
	sprite += ""+clamp(point1);
	sprite += ""+clamp(point2);
	sprite += ""+clamp(point3);
	var holder = new GameObject(i + " " + j);
	var triangle : GameObject = CalmSpritesFactory.newSpriteAnimation(atlas, sprite).gameObject;
	triangle.transform.parent = holder.transform;
	holder.transform.position = Vector3(12*i + 6, -10*j, 0);
	triangle.transform.localScale.x = -1;
	triangle.transform.localScale.y = -1;
	holder.transform.parent = bucket;
	
		return triangle.GetComponent(SpriteAnimation);

	
}

var prefix = "";
	
function setAtlas(points : Vector3){
	if((points.x <  valueLow*2 &&
	points.y <  valueLow*2 &&
	points.z <  valueLow*2)
//	||
//	(points.x <  valueLow*8 ||
//	points.y <  valueLow*8 ||
//	points.z <  valueLow*8)
	)	
		prefix = "l";
	else if((points.x >  valueHigh*2 &&
	points.y >  valueHigh*2 &&
	points.z >  valueHigh*2)
//	||
//	(points.x <  valueLow*8 ||
//	points.y <  valueLow*8 ||
//	points.z <  valueLow*8)
	)	
		prefix = "h";
	else
		prefix = "m";

		
		

	// if((points.x <  valueLow*2 &&
	// points.y <  valueLow*2 &&
	// points.z <  valueLow*2)
// //	||
// //	(points.x <  valueLow*8 ||
// //	points.y <  valueLow*8 ||
// //	points.z <  valueLow*8)
	// )
	
		// atlas = atlasLow;
	// else if((points.x >  valueHigh*2 &&
	// points.y >  valueHigh*2 &&
	// points.z >  valueHigh*2)
// //	||
// //	(points.x <  valueLow*8 ||
// //	points.y <  valueLow*8 ||
// //	points.z <  valueLow*8)
	// )
	
		// atlas = atlasHigh;	
	// else
		// atlas = atlasMid;
		
}

var valueLow : int = -1;
var valueHigh : int = 1;

function clamp(number : float) : int {
	// if(atlas == atlasLow)
		// return lowClamp(number);
	// else if(atlas == atlasMid)
		// return midClamp(number);	
	// else
		// return highClamp(number);
	if(prefix == "l")
		return lowClamp(number);
	else if(prefix == "m")
		return midClamp(number);	
	else
		return highClamp(number);
	
	
}

var extra = 2;
// function lowClamp(number : float) : int{
	// // number = (number + (valueHigh-valueLow)) * 0.5;
	// return 0;
	// if(number <= valueLow)
		// return 0;
	// else if(number < valueHigh)
		// return 1;
	// else
		// return 2;
// }

// function midClamp(number : float) : int{
	// if(number <= valueLow)
		// return 0;
	// else if(number < valueHigh)
		// return 1;
	// else
		// return 2;
	
// }

// function highClamp(number : float) : int{
	// // number = (number - (valueHigh-valueLow))* 0.5;
	
	// if(number <= valueLow)
		// return 0;
	// else if(number < valueHigh)
		// return 1;
	// else
		// return 2;
// }


















 function lowClamp(number : float) : int{
	 if(number+extra <= valueLow)
		 return 2;
	 else if(number+0.5*extra < valueHigh)
		 return 1;
	 else
		 return 0;
	
 }

 function midClamp(number : float) : int{
	if(number <= valueLow)
		return 0;
	else if(number < valueHigh)
		return 1;
	else
		return 2;
	
}

function highClamp(number : float) : int{
	if(number-extra <= valueLow)
		return 2;
	else if(number-0.5*extra < valueHigh)
		return 1;
	else
		return 0;
	
}


















