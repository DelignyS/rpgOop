class Character { // This is the parent class for all characters in the game (Fighter, Paladin, Monk, Berzerker, Assassin, Wizard, Rogue)
  constructor(name, hp, dmg, mana) { // The constructor is called when we create a new instance of a class
    this.name = name; // The name of the character
    this.hp = hp; // The health points of the character
    this.dmg = dmg; // The damage of the character
    this.mana = mana; // The mana points of the character
    this.status = "playing"; // The status of the character (playing, loser, winner)
  }

  takeDamage(damage) { // This method is called when the character takes damage
    this.hp -= damage; // We remove the damage gived by the attacker from the health points of the character
    if (this.hp <= 0) { // If the health points of the character are below or equal to 0
      this.hp = 0; // We set the health points of the character to 0
      this.status = "loser"; // We set the status of the character to loser
    }
  }

  dealDamage(victim) { // This method is called when the character deals damage to another character
    victim.takeDamage(this.dmg);  // We call the takeDamage method of the victim to deal damage to him
    if (victim.hp === 0) { // If the health points of the victim are equal to 0
      this.mana += 20; // We add 20 mana points to the character
    }
  }
  describe() { // This method is called when we want to describe the character
    return `${this.name} has ${this.hp} health points, ${this.dmg} as damage and ${this.mana} mana points.`; // We return a string describing the character
  }
  // To be overridden by subclasses
  specialAttack(victim) {} // This method is called when the character uses his special attack
}

class Fighter extends Character { // This is the subclass of Character
  constructor(name = "Grace", hp = 12, dmg = 4, mana = 40) { // The constructor is called when we create a new instance of a class
    super(name, hp, dmg, mana); // We call the constructor of the parent class
  }

  specialAttack(victim) { // This method is called when the character uses his special attack
    if (this.mana >= 20) {
      console.log(`${this.name} uses Dark Vision on ${victim.name}`); // We display a message to the player
      victim.takeDamage(this.dmg + 5); // We call the takeDamage method of the victim to deal damage to him
      this.mana -= 20; // We remove 20 mana points from the character
      this.dmgReduction = 2; // This will reduce damage taken by 2 on the next turn
    }
  }
  describe() {
    return super.describe() + ' This is a Fighter.';
  }
}

class Paladin extends Character { // cf Fighter
  constructor(name = "Ulder", hp = 16, dmg = 3, mana = 160) { // cf Fighter
    super(name, hp, dmg, mana); // cf Fighter
  }

  specialAttack(victim) { // cf Fighter
    if (this.mana >= 40) {  // cf Fighter
      console.log(`${this.name} uses Healing Lighting on ${victim.name}`);    // cf Fighter
      victim.takeDamage(this.dmg + 4); // cf Fighter
      this.hp += 5; // cf Fighter
      this.mana -= 40; // cf Fighter
    }
  }
  describe() { // cf Fighter
    return super.describe() + ' This is a Paladin.'; // cf Fighter
  }
}

class Monk extends Character {
  constructor(name = "Moana", hp = 8, dmg = 2, mana = 200) {
    super(name, hp, dmg, mana);
  }

  specialAttack(victim) {
    if (this.mana >= 25) {
      console.log(`${this.name} uses Heal on self`);
      this.hp += 8;
      this.mana -= 25;
    }
  }
  describe() {
    return super.describe() + ' This is a Monk.';
  }
}

class Berzerker extends Character {
  constructor(name = "Draven", hp = 8, dmg = 4, mana = 0) {
    super(name, hp, dmg, mana);
  }

  specialAttack(victim) {
    console.log(`${this.name} uses Rage on self`);
    this.dmg += 1;
    this.hp -= 1;
  }
  describe() {
    return super.describe() + ' This is a Berzerker.';
  }
}

class Assassin extends Character {
  constructor(name = "Carl", hp = 6, dmg = 6, mana = 20) {
    super(name, hp, dmg, mana);
  }

  specialAttack(victim) {
    if (this.mana >= 20) {
      console.log(`${this.name} uses Shadow hit on ${victim.name}`);
      victim.takeDamage(this.dmg + 7);
      this.mana -= 20;
      this.shadowHit = true; // This will prevent damage taken on the next turn
    }
  }
  describe() {
    return super.describe() + ' This is an Assassin.';
  }
}
class Wizard extends Character {
  constructor(name = "Merlin", hp = 10, dmg = 2, mana = 200) {
    super(name, hp, dmg, mana);
  }

  specialAttack(victim) {
    if (this.mana >= 25) {
      console.log(`${this.name} uses Fireball on ${victim.name}`);
      victim.takeDamage(7);
      this.mana -= 25;
    }
  }
  describe() {
    return super.describe() + ' This is a Wizard.';
  }
}
class Rogue extends Character {
  constructor(name = "RogueShadow", hp = 6, dmg = 4, mana = 50) {
    super(name, hp, dmg, mana);
  }

  specialAttack(victim) {
    if (this.mana >= 20) {
      console.log(`${this.name} uses Backstab on ${victim.name}`);
      victim.takeDamage(6);
      this.mana -= 20;
    }
  }
  describe() {
    return super.describe() + ' This is a Rogue.';
  }
}

class Game {
  constructor() {
    this.turnLeft = 10;
    this.characters = this.generateCharacters();
  }
  generateCharacters() {
    const characterClasses = [Fighter, Paladin, Monk, Berzerker, Assassin, Wizard, Rogue];
    const characterNames = ["Elysia Luminara", "Thorne Shadowheart", "Zephyr Ironclaw", "Seraphina Stormblade", "Falken Emberforge"];
    let characters = [];
    for (let name of characterNames) {
      let randomIndex = Math.floor(Math.random() * characterClasses.length);
      let CharacterClass = characterClasses[randomIndex];
      characters.push(new CharacterClass(name));
    }
    return characters;
  }

  checkGameState() {
    let aliveCharacters = this.characters.filter(character => character.status === "playing");
    if (aliveCharacters.length === 1) {
      console.log(`${aliveCharacters[0].name} won the game!`);
      document.getElementById("gameStatus").innerText = `${aliveCharacters[0].name} won the game!`;
      this.turnLeft = 0;
    } else if (this.turnLeft === 0) {
      console.log("The game is a draw.");
      document.getElementById("gameStatus").innerText = "The game is a draw.";
    }
  }

  async startGame()
   {
    for (let character of this.characters) {
      console.log(character.describe());
    }

    while (this.turnLeft > 0) {
      console.log(`It's turn ${11 - this.turnLeft}`);
      console.table(this.characters, ["name", "hp", "dmg", "mana", "status"]);

      for (let i = 0; i < this.characters.length; i++) {
        let character = this.characters[i];
        if (character.status === "playing") {
          console.log(`It's time for ${character.name} to play.`);
          let victim = this.characters[(i + 1) % this.characters.length];
          if (character.mana >= 20) {
            character.specialAttack(victim);
            character.mana -= 20;
          } else {
            character.dealDamage(victim);
          }
        }
      }

      this.turnLeft--; // We decrement the number of turn left
      this.checkGameState(); // We check the game state

      // Wait for 3 seconds before the next turn
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
}

document.addEventListener("DOMContentLoaded", function() { // This function is called when the HTML document is loaded
  document.getElementById("startGameButton").addEventListener("click", function() { // We add an event listener on the button
    let game = new Game(); // We create a new instance of the Game class
    game.startGame(); // We call the startGame method of the game
  });
});