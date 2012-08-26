#pragma strict

var player : Player;

function Start () {

}

function Update () {

}

function OnGUI () {
	showYourStuff();
	showTheirStuff();
}

function showYourStuff(){
	if(player.beingControlled){
		var stats = player.stats;
		  GUI.backgroundColor = Color.yellow;
//		GUILayout.Box("water, land, mountain: " + stats.waterSpeed + " "+ stats.landSpeed + " "+ stats.mountainSpeed + " ");	
		
		var height = 0.05 * Screen.height;
		var width = 0.3 * Screen.width/2;
		var index = 0;
		GUI.Box(Rect(0,index*height,width,height),"health");
		index++;
		GUI.Box(Rect(0,index*height,width*stats.waterSpeed,height),"water");
		index++;
		GUI.Box(Rect(0,index*height,width*stats.landSpeed,height),"land");
		index++;
		GUI.Box(Rect(0,index*height,width*stats.mountainSpeed,height),"mountain");
	}

}

function showTheirStuff(){
	if(!player.beingControlled && shouldShowAsOther()){
		var stats = player.stats;
		GUI.backgroundColor = Color.yellow;
//		GUILayout.Box("water, land, mountain: " + stats.waterSpeed + " "+ stats.landSpeed + " "+ stats.mountainSpeed + " ");	
		
		var height = 0.05 * Screen.height;
		var width = 0.3 * Screen.width/2;
		var index = 0;
		GUI.Box(Rect(Screen.width-width,index*height,width,height),"health");
		index++;
		GUI.Box(Rect(Screen.width-width*stats.waterSpeed,index*height,width*stats.waterSpeed,height),"water");
		index++;
		GUI.Box(Rect(Screen.width-width*stats.landSpeed,index*height,width*stats.landSpeed,height),"land");
		index++;
		GUI.Box(Rect(Screen.width-width*stats.mountainSpeed,index*height,width*stats.mountainSpeed,height),"mountain");
	}

}

var showAsOther = 0.0;

private var nextCheck = 0.0;
function OnTriggerStay(other : Collider){
	
	if(Time.time > nextCheck && other.transform.gameObject.GetComponent(Player).beingControlled){
		showAsOther = Time.time + 0.2;
		nextCheck = Time.time+0.199;
	}
}
function shouldShowAsOther() : boolean {
	return showAsOther > Time.time;
}

