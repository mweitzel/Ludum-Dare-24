#pragma strict

function Start () {

}

var stats : Stats;

var tileMaker : triTileMaker;

var beingControlled = false;
var showAsOther = 0.0;

function OnTriggerStay(other : Collider){
	showAsOther = Time.time + 0.2;
}
function shouldShowAsOther() : boolean {
	return showAsOther > Time.time;
}

function FixedUpdate () {

	var speed = 1.0;
	
	
	
		// if(
			// (Input.GetKey(KeyCode.W) && Input.GetKey(KeyCode.D))
		// ||	(Input.GetKey(KeyCode.W) && Input.GetKey(KeyCode.A))
		// ||	(Input.GetKey(KeyCode.S) && Input.GetKey(KeyCode.D))
		// ||	(Input.GetKey(KeyCode.S) && Input.GetKey(KeyCode.A))
		// )
			// speed = 1/Mathf.Sqrt(2);
		
		
	var direc  = Vector2(0,0);

	if(beingControlled){	
		if(Input.GetKey(KeyCode.W)){
			direc.y += 1;
			}
		else if(Input.GetKey(KeyCode.S)){
			direc.y -= 1;
			}
		else if(Input.GetKey(KeyCode.A)){
			direc.x -= 1;
			}
		else if(Input.GetKey(KeyCode.D)){
			direc.x += 1;
			}
	}
	else{
		if(toLocation == null || toLocation == Vector2(0,0))
			toLocation = transform.position;
	
		if(shouldWalk())
			direc = aiDirection;
		else
			maybePickAnotherSpot();
	
	}
	
	if(direc != Vector2(0,0)){
		previous = direc;
		Mover.move(transform, direc, stats, tileMaker, previous);
	}
		
	
}
private var previous : Vector3;
var walkUntil = 0.0;
var aiDirection = Vector2(0,0);
private function shouldWalk(){
	return Time.time < walkUntil;
}

private function maybePickAnotherSpot(){
	
	var value = Random.value;
	
	if(value < 0.1){
		value = Random.value;
	if(value < 0.5){
		walkUntil = Time.time + Random.value;
			
		if(value < 0.4)
			aiDirection = Vector2(1,0);
		if(value < 0.3)
			aiDirection = Vector2(0,1);
		if(value < 0.2)
			aiDirection = Vector2(-1,0);
		if(value < 0.1)
			aiDirection = Vector2(0,-1);
	}	
	}
}

var toLocation : Vector2;// = transform.position;

class Mover {
	static function move(transform : Transform, direction : Vector2, stats : Stats, tile : triTileMaker, lastDirection : Vector3){
	
		var speed = 0.5;
		
		var type = "";
	type = tile.getTileType(tile, transform.position.x+5, transform.position.y-5);
	if(type == "l")
		speed *= stats.waterSpeed;
	if(type == "m")
		speed *= stats.landSpeed;
	if(type == "h")
		speed *= stats.mountainSpeed;
		
		if(type == "x")
			direction = -10*direction;//lastDirection;
		
		transform.position += direction * speed;
		
		if(direction.y > 0){
			transform.rotation.z = 0;
			}
		else if(direction.y < 0){
			transform.rotation.z = 100;
			}
		else if(direction.x < 0){
			transform.rotation.z = 0;
			transform.rotation.z = 0.72;
			transform.rotation.z = 0.72;
			transform.rotation.z = 0.72;
			transform.rotation.z = 0.72;
			}
		else if(direction.x > 0){
			transform.rotation.z = 0;
			transform.rotation.z = -0.72;
			transform.rotation.z = -0.72;
			transform.rotation.z = -0.72;
			transform.rotation.z = -0.72;
			}
	}
	
}