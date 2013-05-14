ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/player.png', 96, 192),
		size: {x: 96, y:192},	
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

		facing_direction : "downRight",

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
		inventory_max : 4,
		inventory[],
		
		//special status effects
		hasSensorImplant : false,
		hasKeyCard : false,

		//Constructor and initialization functions
		init : function(x, y, settings, username, job) {
			this.parent( x, y, settings );
			this.username = name;
			this.job = job;
			// Add the animations
			this.addAnim( 'upIdle', 1, [0] );
			this.addAnim( 'upWalk', 1, [1] );
			this.addAnim( 'upAttack', 1, [2] );
			this.addAnim( 'downIdle', 1, [3] );
			this.addAnim( 'downWalk', 1, [4] );
			this.addAnim( 'downAttack', 1, [5] );
			//this.addAnim( 'run', 0.7, [0,1,2,3,4,5] );
			for(var n = 0;n < 6; n++){
				this.inventory[n] = "NULL";
			}
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
			//Subtract action point, check for end of turn
			this.actions -= 1;
			if(this.actions >= 0) {
				this.onTurnEnd();
			};

		},
		loot : function() {
			//Roll to determine item acquired

			//Subtract action point, check for end of turn
			this.actions -= 1;
			if(this.actions >= 0) {
				this.onTurnEnd();
			};
		},

		//use var ability
		ability : function(){

		},
		//use item
		useItem : function(targetEntity, itemSlotNum){

		},

		takeDamage : function(dmgAmount){
			this.hp -= dmgAmount;
		},

		death : function(){
			this.active = false;
		},
	});

});