#pragma strict

var toClone : GameObject;
var atlas : Atlas;
var tileMaker : triTileMaker;
var follower : CharacterFollower;

function Start () {
	var character = makeCharacter();
	character.GetComponent(Player).beingControlled = true;
	follower.toFollow = character.transform;
	arr = new Array();
}

var arr : Array;

function Update () {

	if(arr.length < 5){
		var object = makeCharacter();
		arr.unshift(object);
	}
	
	if(0.001 < Random.value){
		var newArr = new Array();
		for( var thing in arr)
			if(thing != null)
				newArr.Add(thing);
		arr = newArr;
	}	
}


function makeCharacter() : GameObject{
	var newThing = Instantiate(toClone);
	var spot = getRandomSpot();
	
	newThing.transform.position = spot;
	newThing.GetComponent(Player).tileMaker = tileMaker;
	newThing.GetComponentInChildren(spriteloader).atlas = atlas;
	
	return newThing;
	
}
static function getRandomSpot(){
	
	var x = 220;
	var y = -180;
	
	return Vector2(Random.value * x, Random.value * y);
}