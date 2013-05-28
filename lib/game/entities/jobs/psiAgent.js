ig.module(
	'game.entities.jobs.psiAgent'
)
.requires(
	'impact.entity',
	'game.entities.player',
	'game.entities.item'
)
.defines(function(){
	EntityPlayerPsiAgent = EntityPlayer.extend({
		animSheet: new ig.AnimationSheet('lib/game/media/player.png', 96, 192),
		size: {x: 96, y:192},	
		flip : false,		
		//Is this player still alive?
		alive : true,

		//player job, refers to a list
		job : "Psi Agent",

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
		hp_max : 7,
		hp : 7,

		actions_max : 2,
		actions : 2,

		// Player attack accuracy, damage, possible defense value for evasion, and damage reducing armor
		attack : 2,
		attack_dmg : 1,
		defense : 0,
		armor : 0,

		// number of item slots, and array of item slots
		inventory_max : 3,
		inventory_held : 3,
		inventory : new Array(),
		
		//special status effects
		//Psi Agent has no special abilities
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
			this.parent();
		},

		update : function() {
			this.parent();			
		},

		//Functions for events at beginning and end of this player's turn 
		onTurnStart : function() {
			this.parent();
		},
		onTurnEnd : function() {
			this.parent();
		},

		// Possible player actions
		moveRooms : function(direction, targetRoom){
			this.parent();
		},
		attack : function(targetEntity){
			this.parent();
		},
		loot : function() {
			this.parent();
		},

		//use var ability
		ability : function(){
			this.parent();
		},
		//use item
		useItem : function(targetEntity, itemSlotNum){
			this.parent();
		},

		tradeItem : function(targetPlayer, itemSlotNum) {
			this.parent();
		},

		takeDamage : function(dmgAmount){
			this.parent();
		},

		death : function(){
			this.parent();
		},
	});

});