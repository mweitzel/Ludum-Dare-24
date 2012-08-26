#pragma strict

var atlas : Atlas;
var myAnimation : AnimationStruct;
private var sprite : SpriteAnimation;

function Start () {
//	CalmSpritesFactory.newSpriteAnimation(atlas, myAnimation);
	var thing = CalmSpritesFactory.newSpriteAnimation(atlas, myAnimation);
	var gObject : GameObject = thing.gameObject;
	gObject.transform.parent = this.gameObject.transform;
	sprite = thing;
	sprite.updateThisShit = true;
}

function Update () {
}

