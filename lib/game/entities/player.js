ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'game.entities.item'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('lib/game/media/player.png', 96, 192),
		size: {x: 96, y:192},	
		flip : false,		
		//Is this player still alive?
		alive : true,

		//player job, refers to a list
		job : "Frontman",
		/*
		"Engineer"
		"Dector"
		*/


		// name, portrait image, images for 4 pawn facing directions
		username : "Space Guy",
		portrait: new ig.AnimationSheet('lib/game/media/playerPortrait.png', 240, 240),

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
		inventory_held : 0,
		inventory : new Array(),
		
		//special status effects
		lootChance : 0,
		hasSensorImplant : false,
		hasReflexShield : false,
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
			this.turn = true;
			this.actions = this.actions_max;
		},
		onTurnEnd : function() {
			this.turn = false;
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
			//Subtract action point
			this.actions -= 1;			
			//Try to hit, take damage on miss
			if(Math.floor((Math.random()*20)+1+this.attack) >= targetEntity.defense) {
				targetEntity.hp -= this.attack_dmg;
			} else {
				this.hp -= targetEntity.attack_dmg;
			}

			//Check for end of turn
			if(this.actions >= 0) {
				this.onTurnEnd();
			};

		},
		loot : function() {
			//Subtract action point
			this.actions -= 1;			
			//Roll to determine if item acquired
			if(Math.floor((Math.random()*20)+1+this.lootChance) >= 11) {
				//Add an item to the character's inventory slot
				var lootedItem = new EntityItem();
				// if item acquired, create item of code 0-99, or name
				lootedItem.init(0);
				for(var i = 0; i < this.inventory_max; i++) {
					if(this.inventory[i] != NULL) {
						this.inventory[i] = lootedItem;
						this.inventory_held += 1;
						break;
					}
					
				}
				
			}			

			//Check for end of turn
			if(this.actions <= 0) {
				this.onTurnEnd();
			};
		},

		//use var ability
		ability : function(){

		},
		//use item
		useItem : function(targetEntity, itemSlotNum){
			this.inventory[itemSlotNum].onUse(targetEntity);
			
		},

		tradeItem : function(targetPlayer, itemSlotNum) {

		},

		takeDamage : function(dmgAmount){
			this.hp -= dmgAmount;
			if(this.hp <= 0) this.death();
		},

		death : function(){
			this.alive = false;
			//Play death animation

		},
	});

});