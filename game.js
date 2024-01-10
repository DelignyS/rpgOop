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
}

class Game {
  constructor() {
    this.turnLeft = 10;
    this.characters = [
      new Fighter(),
      new Paladin(),
      new Monk(),
      new Berzerker(),
      new Assassin(),
    ];
  }

  checkGameState() {
    const aliveCharacters = this.characters.filter(
      (character) => character.status === "playing"
    );
    if (aliveCharacters.length === 1) {
      aliveCharacters[0].status = "winner";
      console.log(`${aliveCharacters[0].name} is the winner!`);
      this.turnLeft = 0;
    } else if (this.turnLeft === 0) {
      console.log("The game is a draw.");
    }
  }

  startGame() {
    let gameStatusDiv = document.getElementById("gameStatusDiv");
    while (this.turnLeft > 0) {
        console.log(`It's turn ${11 - this.turnLeft}`);
        let statusText = `It's turn ${11 - this.turnLeft}\n`;
        for (let character of this.characters) {
            statusText += `${character.name} has ${character.hp} hp\n`;
        }
        gameStatusDiv.textContent = statusText;
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
        console.log(statusText); // Log the status text to the console at the end of each turn
    }
}
}
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("startGameButton").addEventListener("click", function() {
    let game = new Game();
    game.startGame();
  });
});