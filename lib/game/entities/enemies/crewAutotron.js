ig.module(
	'game.entities.enemies.crewAutotron'
)
.requires(
	'impact.entity',
	'game.entities.enemy'
)
.defines(function(){
	EntityEnemyCrewAutotron = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('lib/game/media/enemies/enemy.png', 96, 192),
		size: {x: 96, y:192},	
		flip : false,		
		//Is this enemy still alive?
		alive : true,

		//enemy type, refers to a list
		type : "Crew Autotron",
		description : "",

		// portrait image, images for pawn facing directions
		portrait: new ig.AnimationSheet('lib/game/media/enemies/enemyPortrait.png', 240, 240),

		//Room location, and tile inside that room
		room : {x: 0, y:0},
		tile : {x: 0, y:0},

		facing_direction : "downRight",

		//HP and other stats
		hp_max : 1,
		hp : 1,

		// Enemy attack accuracy, damage, possible defense value for evasion, and damage reducing armor
		attack : 20,
		attack_dmg : 2,
		defense : 15,
		armor : 0,

		// Enemy data for game logic
		threatRates : {high : 1.0, med : 0.66, low : 0.33},
		threatLevel : 0,

		spawnRates : {high : 1.0, medHigh : 0.75, medLow : 0.5, low : 0.25},
		spawnChance : 0,

		lootDropped : 0,
		
		//special status effects

		//Constructor and initialization functions
		init : function() {
			this.threatLevel = this.threatRates.med;
			this.spawnChance = this.spawnRates.medHigh;
			this.parent();
		},

		update : function() {
			this.parent();			
		},

		// Possible enemy actions
		moveRooms : function(direction, targetRoom){
			this.parent();
		},
		attack : function(targetEntity){
			this.parent();
		},

		//use var ability
		ability : function(){
			this.parent();
		},

		takeDamage : function(dmgAmount){
			this.parent();
		},

		death : function(){
			this.parent();
		},
		onPlayerEnter : function(targetPlayer){
			this.parent();
		},

		onPlayerExit : function(targetPlayer) {
			this.parent();
		},

		onPlayerMisses : function(attackingPlayer) {
			this.parent();
		}		
	});

});