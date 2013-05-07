ig.module(
	'game.entities.zombie'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/player.png', 96, 192),
		size: {x: 8, y:14},	
		flip : false,		
		//Does this player exist?
		active : false,

		//player job, refers to a list
		job : "Frontman",


		// name, portrait image, images for 4 pawn facing directions
		username : "Space Guy",
		portrait: new ig.AnimationSheet('media/playerPortrait.png', 240, 240),

		//Room location, and tile inside that room
		room : {x: 0, y:0},
		tile : {x: 0, y:0},

		facing_direction : "DownRight"

		//is this player's turn active?
		turn : false,

		//HP and other stats
		hp_max : 6,
		hp : 6,

		actions_max : 2,
		actions : 2,

		// Player attack accuracy, damage, possible defense value for evasion, and damage reducing armor
		attack : 0,
		attack_dmg : 1,
		defense : 0,
		armor : 0,

		// number of item slots, and array of item slots
		inventory_max : 2,
		inventory : {slot0: 'NULL', slot1: "NULL", slot2: "NULL", slot3: "NULL", slot4: "NULL", slot5: "NULL",},
		//Constructor and initialization functions
		init : function(x, y, settings, username, job) {
			this.parent( x, y, settings );
			this.username = name;
			this.job = job;
			// Add the animations
			this.addAnim( 'UpIdle', 1, [0] );
			this.addAnim( 'UpWalk', 1, [1] );
			this.addAnim( 'UpAttack', 1, [2] );
			this.addAnim( 'DownIdle', 1, [3] );
			this.addAnim( 'DownWalk', 1, [4] );
			this.addAnim( 'DownAttack', 1, [5] );
			//this.addAnim( 'run', 0.7, [0,1,2,3,4,5] );
		},

		update : function() {
			this.currentAnim.flip.x = this.flip;
			this.parent();			
		},

		//Functions for events at beginning and end of this player's turn 
		onTurnStart : function() {
			this.actions = this.actions_max;
		},
		onTurnEnd : function() {
			this.active = false;
		},

		// Possible player actions
		moveRooms : function(direction, targetRoom){

			this.facing_direction = direction;
			this.currentAnim
			switch(direction){
				case ('UpLeft'):
					this.room.x -= 1;
					this.currentAnim = this.anims.UpIdle;
					this.flip = true;
					break;
				case ('UpRight'):
					this.room.y -= 1;
					this.currentAnim = this.anims.UpIdle;
					this.flip = false;
					break;
				case ('DownLeft'):
					this.room.y += 1;
					this.currentAnim = this.anims.DownIdle;
					this.flip = true;
					break;
				case ('DownRight'):
					this.room.x += 1;
					this.currentAnim = this.anims.DownIdle;
					this.flip = false;
					break;														
			}
		},
		attack : function(targetEntity){
			this.actions -= 1;
			if(this.actions >= 0) {
				this.onTurnEnd();
			}
		},
		loot : function() {
			this.actions -= 1;
			if(this.actions >= 0) {
				this.onTurnEnd();
			}
		},

		//use var ability
		ability : function(){

		},

		death : function(){
			this.active = false;
		},
	});
});