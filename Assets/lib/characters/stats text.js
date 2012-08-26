#pragma strict

var player : Player;

function Start () {

}

function Update () {

}

function OnGUI () {
	if(player.beingControlled){
		var stats = player.stats;
		  GUI.backgroundColor = Color.yellow;
//		GUILayout.Box("water, land, mountain: " + stats.waterSpeed + " "+ stats.landSpeed + " "+ stats.mountainSpeed + " ");	
		
		var height = 0.05 * Screen.height;
		var width = 0.3 * Screen.width/2;
		var index = 0;
		GUI.Box(Rect(0,index*height,width,height),"health");
		index++;index++;
		GUI.Box(Rect(0,index*height,width*stats.waterSpeed,height),"water");
		index++;index++;
		GUI.Box(Rect(0,index*height,width*stats.landSpeed,height),"land");
		index++;index++;
		GUI.Box(Rect(0,index*height,width*stats.mountainSpeed,height),"mountain");
	}
	
	if(player.shouldShowAsOther()){
		var stats = player.stats;
		GUI.backgroundColor = Color.yellow;
//		GUILayout.Box("water, land, mountain: " + stats.waterSpeed + " "+ stats.landSpeed + " "+ stats.mountainSpeed + " ");	
		
		var height = 0.05 * Screen.height;
		var width = 0.3 * Screen.width/2;
		var index = 0;
		index++;
		GUI.Box(Rect(0,index*height,width,height),"health");
		index++;index++;
		GUI.Box(Rect(0,index*height,width*stats.waterSpeed,height),"water");
		index++;index++;
		GUI.Box(Rect(0,index*height,width*stats.landSpeed,height),"land");
		index++;index++;
		GUI.Box(Rect(0,index*height,width*stats.mountainSpeed,height),"mountain");
	}
}

