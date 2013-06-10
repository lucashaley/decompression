ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'game.entities.item'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({
		image: new ig.Image('lib/game/media/playerTemp.png'),
		texture: null,


		animSheet: new ig.AnimationSheet('lib/game/media/player.png', 96, 192),
		size: {x: 96, y:192},	
		flip : false,		
		//Is this player still alive?
		alive : true,

		//player job, refers to a list
		job : "PlayerJob",



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
		allyBonus : 1,

		defense : 0,
		armor : 0,

		// number of item slots, and array of item slots
		inventory_max : 4,
		inventory_held : 0,
		inventory : new Array(),
		
		//special status effects
		lootChance : 0,

		hasImplantSensor : false,
		hasImplantDiscovery : false,
		hasImplantDefense : false,
		hasImplantCommand : false,
		hasImplantReflex : false,
		hasImplantQuantum : false,

		hasFriendlyDrone : false,
		hasReflexShield : false,
		hasKeyCard : false,


		//Constructor and initialization functions
		init : function(username) {
			//this.parent( x, y, settings );
			this.username = name;
			// Add the animations
			this.addAnim( 'upIdle', 1, [0] );
			this.addAnim( 'upWalk', 1, [1] );
			this.addAnim( 'upAttack', 1, [2] );
			this.addAnim( 'downIdle', 1, [3] );
			this.addAnim( 'downWalk', 1, [4] );
			this.addAnim( 'downAttack', 1, [5] );
			//this.addAnim( 'run', 0.7, [0,1,2,3,4,5] );

			this.texture = glLoadTexture(this.image.data);
			
			//Not currently initializing inventory
			//for(var n = 0;n < this.inventory_max; n++){
			//	this.inventory[n] = null;
			//}
		},

		update : function() {
			this.currentAnim.flip.x = this.flip;
			if(this.hp > this.hp_max) this.hp = this.hp_max;
			if(this.inventory_held < 0) this.inventory_held = 0;
			this.parent();	
			this.inventory_held = this.inventory.length;		
		},

        draw: function(lightIntensity) {
			glDraw(this.image.width, this.image.height, this.x, this.y, 1.0, this.texture);
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
				targetEntity.takeDamage(this.attack_dmg);
			} else {
				//this.hp -= targetEntity.attack_dmg;
				targetEntity.onPlayerMiss(this);
			}
		},
		loot : function() {
			if(this.inventory_held < this.inventory_max) {
				//Subtract action point
				this.actions -= 1;			
				//Roll to determine if item acquired
				if(Math.floor((Math.random()*20)+1+this.lootChance) >= 11) {
					//Add an item to the character's inventory slot
					var lootedItem = new EntityItem();
					// if item acquired, create item of code 0-99, or name
					lootedItem.generateRandom();
					for(var i = 0; i < this.inventory_max; i++) {
						if(this.inventory[i] != null) {
							this.inventory[i] = lootedItem;
							break;
						}
						
					}
					
				}			
			} else {
				//Return false if player inventory is full
				return false;
			}
		},

		//use var ability
		ability : function(){

		},
		//use item
		useItem : function(targetEntity, itemSlotNum){
			//Use the item
			this.inventory[itemSlotNum].onUse(targetEntity);
			//remove it from inventory if consumed
			if(this.inventory[itemSlotNum].uses <= 0) {
				this.inventory.splice(itemSlotNum, 1);
			}
		},

		tradeItem : function(targetPlayer, itemSlotNum) {
			if(targetPlayer.inventory_held < targetPlayer.inventory_max) {
				//add the item to the target inventory
				targetPlayer.inventory.push(this.inventory[itemSlotNum]);
				this.inventory_held += 1;
				//remove from this inventory
				this.inventory.splice(itemSlotNum, 1);
				this.inventory_held -= 1;
			}
		},

		takeDamage : function(dmgAmount){
			this.hp -= dmgAmount;
			if(this.hp <= 0) this.death();
			//Play hit animation

		},

		death : function(){
			this.alive = false;
			this.actions = 0;
			//Play death animation

		},
	});

});