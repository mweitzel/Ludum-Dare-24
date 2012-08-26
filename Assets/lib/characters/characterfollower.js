#pragma strict
var toFollow : Transform;

function Start () {

}

function Update () {
	var overTime = Vector3.Distance( transform.position, toFollow.position) / Time.time;
	if(overTime < 0.01)
		overTime = 0;
	gameObject.transform.position = Vector3.Lerp(transform.position, toFollow.position, overTime);
	
}