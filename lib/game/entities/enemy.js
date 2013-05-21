ig.module(
	'game.entities.enemy'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityEnemy = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('lib/game/media/enemy.png', 96, 192),
		size: {x: 96, y:192},	
		flip : false,		
		//Does this enemy exist?
		active : false,

		//enemy type, refers to a list
		type : "Small Roamer",
		/*
		"Small Roamer"
		"Corrupted Scout"
		"Suicidal Drone"
		"MediBot"
		"NavGuide"
		"Crew Autotron"
		"Bionic Zombie"
		"PeaceWater"
		"Planetside Miner"
		"Rampant Walker"
		"NanoBots"
		"Cleanser"
		"Security Droid"
		*/

		// portrait image, images for pawn facing directions
		portrait: new ig.AnimationSheet('lib/game/media/enemyPortrait.png', 240, 240),

		//Room location, and tile inside that room
		room : {x: 0, y:0},
		tile : {x: 0, y:0},

		facing_direction : "downRight",

		//HP and other stats
		hp_max : 1,
		hp : 1,

		// Enemy attack accuracy, damage, possible defense value for evasion, and damage reducing armor
		attack : 20,
		attack_dmg : 1,
		defense : 10,
		armor : 0,

		// Enemy strength for game logic
		threatLevel : 0,

		
		//special status effects

		//Constructor and initialization functions
		init : function(x, y, settings, type) {
			this.parent( x, y, settings );
			this.type = type;
			// Add the animations, assumes down-right facing is default
			this.addAnim( 'upIdle', 1, [0] );
			this.addAnim( 'upWalk', 1, [1] );
			this.addAnim( 'upAttack', 1, [2] );
			this.addAnim( 'downIdle', 1, [3] );
			this.addAnim( 'downWalk', 1, [4] );
			this.addAnim( 'downAttack', 1, [5] );
			//this.addAnim( 'run', 0.7, [0,1,2,3,4,5] );

		},

		update : function() {
			this.currentAnim.flip.x = this.flip;
			this.parent();			
		},

		// Possible enemy actions
		moveRooms : function(direction, targetRoom){

			this.facing_direction = direction;
			
			switch(direction){
				case ('upLeft'):
					this.room.x -= 1;
					this.currentAnim = this.anims.UpIdle;
					this.flip = true;
					break;
				case ('upRight'):
					this.room.y -= 1;
					this.currentAnim = this.anims.UpIdle;
					this.flip = false;
					break;
				case ('downLeft'):
					this.room.y += 1;
					this.currentAnim = this.anims.DownIdle;
					this.flip = true;
					break;
				case ('downRight'):
					this.room.x += 1;
					this.currentAnim = this.anims.DownIdle;
					this.flip = false;
					break;														
			};

			this.room.x = targetRoom.x;
			this.room.y = targetRoom.y;
		},
		attack : function(targetEntity){
			//Roll for attack accuracy
			if(Math.floor((Math.random()*20)+1+this.attack) >= targetEntity.defense) {
				targetEntity.hp -= this.attack_dmg;
			}
			//add animation
			

		},

		//use var ability
		ability : function(){

		},

		takeDamage : function(dmgAmount){
			this.hp -= dmgAmount;
			if(this.hp <= 0) this.death();

		},

		death : function(){
			this.active = false;
			//add animation
		},
	});

});