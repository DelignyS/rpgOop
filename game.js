class Character {
  constructor(name, hp, dmg, mana) {
    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.status = "playing";
  }

  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.status = "loser";
    }
  }

  dealDamage(victim) {
    victim.takeDamage(this.dmg);
    if (victim.hp === 0) {
      this.mana += 20;
    }
  }
  describe() {
    return `${this.name} has ${this.hp} health points, ${this.dmg} as damage and ${this.mana} mana points.`;
  }
  // To be overridden by subclasses
  specialAttack(victim) {}
}

class Fighter extends Character {
  constructor(name = "Grace", hp = 12, dmg = 4, mana = 40) {
    super(name, hp, dmg, mana);
  }

  specialAttack(victim) {
    if (this.mana >= 20) {
      console.log(`${this.name} uses Dark Vision on ${victim.name}`);
      victim.takeDamage(this.dmg + 5);
      this.mana -= 20;
      this.dmgReduction = 2; // This will reduce damage taken by 2 on the next turn
    }
  }
  describe() {
    return super.describe() + ' This is a Fighter.';
  }
}

class Paladin extends Character {
  constructor(name = "Ulder", hp = 16, dmg = 3, mana = 160) {
    super(name, hp, dmg, mana);
  }

  specialAttack(victim) {
    if (this.mana >= 40) {
      console.log(`${this.name} uses Healing Lighting on ${victim.name}`);
      victim.takeDamage(this.dmg + 4);
      this.hp += 5;
      this.mana -= 40;
    }
  }
  describe() {
    return super.describe() + ' This is a Paladin.';
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

      this.turnLeft--;
      this.checkGameState();

      // Wait for 3 seconds before the next turn
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("startGameButton").addEventListener("click", function() {
    let game = new Game();
    game.startGame();
  });
});