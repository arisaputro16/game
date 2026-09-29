const readline = require('readline-sync');

const MAX_HIT_POINT = 100;
const MIN_ACTION_VALUE = 1;
const MAX_ACTION_VALUE = 20;
const TOTAL_DRAGON_ACTION = 3;
const HEAL_VALUE = 5;


console.log(`========================`);
console.log(`      DRAGON SLAYER      `);
console.log(`========================`);

const name = readline.question(`\nState your name soldier: `);

console.log(`\nHi ${name}, today is the day to defeat the dragon.`);

const startTheGame = readline.question(`If you are ready type battle: `);

if (startTheGame === 'battle') {
  console.log(`\nBattle Started!`);

  const player = {
    name: name,
    hitPoint: MAX_HIT_POINT,
  };

  const dragon = {
    name: 'Dragon',
    hitPoint: MAX_HIT_POINT,
  };

  function getRandomActionValue() {
    return Math.floor(
      Math.random() * (MAX_ACTION_VALUE - MIN_ACTION_VALUE + 1)) + MIN_ACTION_VALUE;
  }

  function showHitPoint() {
    console.log(`\n${player.name} HP: ${player.hitPoint}`);
    console.log(`${dragon.name} HP: ${dragon.hitPoint}`);
  }

  function playerAction() {
    console.log(`\nChoose your action:`);
    console.log(`1. Attack`);
    console.log(`2. Defense`);
    console.log(`3. Heal`);

    const yourAction = Number(readline.question(`\nEnter your action: `));

    return yourAction;
  }

  function dragonAction() {
    const dragonPossibleAction = Math.floor(Math.random() * TOTAL_DRAGON_ACTION) + 1;

    return dragonPossibleAction;
  }

  function attackVsAttack(playerValue, dragonValue) {
    player.hitPoint -= dragonValue;
    dragon.hitPoint -= playerValue;

    console.log(`\nBoth attacks hit! ${player.name} deals ${playerValue} damage and ${dragon.name} deals ${dragonValue} damage.`);
  }

  function attackVsDefense(playerValue, dragonValue) {
    if (playerValue > dragonValue) {
      const damage = playerValue - dragonValue;

      dragon.hitPoint -= damage;

      console.log(`\n${player.name} attack (${playerValue}) is stronger than ${dragon.name} defense (${dragonValue}).`);
      console.log(`${dragon.name} takes ${damage} damage!`);
    } else if (playerValue < dragonValue) {
      const damage = dragonValue - playerValue;

      player.hitPoint -= damage;

      console.log(`\n${dragon.name} defense (${dragonValue}) is stronger than ${player.name} attack (${playerValue}).`);
      console.log(`${player.name} takes ${damage} damage!`);
    } else {
      console.log(`\n${player.name} attack (${playerValue}) equals to ${dragon.name} defense (${dragonValue}).`);
      console.log(`Nothing happens!`);
    }
  }

  function attackVsHeal(playerValue) {
    if (playerValue > HEAL_VALUE) {
      const damage = playerValue - HEAL_VALUE;

      dragon.hitPoint -= damage;

      console.log(`\n${player.name} attack (${playerValue}) is stronger than ${dragon.name} heal (${HEAL_VALUE}).`);
      console.log(`${dragon.name} takes ${damage} damage!`);
    } else if (playerValue < HEAL_VALUE) {
      const heal = HEAL_VALUE - playerValue;

      dragon.hitPoint += heal;

      console.log(`\n${dragon.name} heal (${HEAL_VALUE}) is stronger than ${player.name} attack (${playerValue}).`);
      console.log(`${dragon.name} gains ${heal} HP!`);
    } else {
      console.log(`\n${player.name} attack (${playerValue}) equals to ${dragon.name} heal (${HEAL_VALUE}).`);
      console.log(`Nothing happens!`);
    }
  }

  function defenseVsAttack(playerValue, dragonValue) {
    if (playerValue > dragonValue) {
      const damage = playerValue - dragonValue;

      dragon.hitPoint -= damage;

      console.log(`\n${player.name} defense (${playerValue}) is stronger than ${dragon.name} attack (${dragonValue}).`);
      console.log(`${dragon.name} takes ${damage} damage!`);
    } else if (playerValue < dragonValue) {
      const damage = dragonValue - playerValue;

      player.hitPoint -= damage;

      console.log(`\n${dragon.name} attack (${dragonValue}) is stronger than ${player.name} defense (${playerValue}).`);
      console.log(`${player.name} takes ${damage} damage!`);
    } else {
      console.log(`\n${player.name} defense (${playerValue}) equals to ${dragon.name} attack (${dragonValue}).`);
      console.log(`Nothing happens!`);
    }
  }

  function defenseVsDefense() {
    console.log(`\nBoth player and dragon choose defense.`);
    console.log(`Nothing happens!`);
  }

  function defenseVsHeal() {
    dragon.hitPoint += HEAL_VALUE;

    console.log(`\n${player.name} chooses defense while ${dragon.name} chooses heal.`);
    console.log(`${dragon.name} gains ${HEAL_VALUE} HP!`);
  }

  function healVsAttack(dragonValue) {
    if (HEAL_VALUE > dragonValue) {
      const heal = HEAL_VALUE - dragonValue;

      player.hitPoint += heal;

      console.log(`\n${player.name} heal (${HEAL_VALUE}) is stronger than ${dragon.name} attack (${dragonValue}).`);
      console.log(`${player.name} gains ${heal} HP!`);
    } else if (HEAL_VALUE < dragonValue) {
      const damage = dragonValue - HEAL_VALUE;

      player.hitPoint -= damage;

      console.log(`\n${dragon.name} attack (${dragonValue}) is stronger than ${player.name} heal (${HEAL_VALUE}).`);
      console.log(`${player.name} takes ${damage} damage!`);
    } else {
      console.log(`\n${player.name} heal (${HEAL_VALUE}) equals to ${dragon.name} attack (${dragonValue}).`);
      console.log(`Nothing happens!`);
    }
  }

  function healVsDefense() {
    player.hitPoint += HEAL_VALUE;

    console.log(`\n${player.name} chooses heal while ${dragon.name} chooses defense.`);
    console.log(`${player.name} gains ${HEAL_VALUE} HP!`);
  }

  function healVsHeal() {
    player.hitPoint += HEAL_VALUE;
    dragon.hitPoint += HEAL_VALUE;

    console.log(`\nBoth player and dragon choose heal.`);
    console.log(`Both recover ${HEAL_VALUE} HP!`);
  }

  function limitHitPoint() {
    if (player.hitPoint < 0) {
      player.hitPoint = 0;
    }

    if (dragon.hitPoint < 0) {
      dragon.hitPoint = 0;
    }

    if (player.hitPoint > MAX_HIT_POINT) {
      player.hitPoint = MAX_HIT_POINT;
    }

    if (dragon.hitPoint > MAX_HIT_POINT) {
      dragon.hitPoint = MAX_HIT_POINT;
    }
  }

  showHitPoint();

  while (player.hitPoint > 0 && dragon.hitPoint > 0) {
    const playerChoice = playerAction();
    const dragonChoice = dragonAction();

    console.log(`\n------------------------`);
    console.log(`${player.name}'s action: ${playerChoice}`);
    console.log(`${dragon.name}'s action: ${dragonChoice}`);
    console.log(`------------------------`);

    if (playerChoice === 1) {
      const playerAttack = getRandomActionValue();

      console.log(`\n${player.name} chooses ATTACK with ${playerAttack} point.`);

      if (dragonChoice === 1) {
        const dragonAttack = getRandomActionValue();

        console.log(`${dragon.name} chooses ATTACK with ${dragonAttack} point.`);

        attackVsAttack(playerAttack, dragonAttack);
      } else if (dragonChoice === 2) {
        const dragonDefense = getRandomActionValue();

        console.log(`${dragon.name} chooses DEFENSE with ${dragonDefense} point.`);

        attackVsDefense(playerAttack, dragonDefense);
      } else {
        console.log(`${dragon.name} chooses HEAL with ${HEAL_VALUE} HP.`);

        attackVsHeal(playerAttack);
      }
    } else if (playerChoice === 2) {
      const playerDefense = getRandomActionValue();

      console.log(`\n${player.name} chooses DEFENSE with ${playerDefense} point.`);

      if (dragonChoice === 1) {
        const dragonAttack = getRandomActionValue();

        console.log(`${dragon.name} chooses ATTACK with ${dragonAttack} point.`);

        defenseVsAttack(playerDefense, dragonAttack);
      } else if (dragonChoice === 2) {
        const dragonDefense = getRandomActionValue();

        console.log(`${dragon.name} chooses DEFENSE with ${dragonDefense} point.`);

        defenseVsDefense();
      } else {
        console.log(`${dragon.name} chooses HEAL with ${HEAL_VALUE} HP.`);

        defenseVsHeal();
      }
    } else if (playerChoice === 3) {
      console.log(`\n${player.name} chooses HEAL with ${HEAL_VALUE} HP.`);

      if (dragonChoice === 1) {
        const dragonAttack = getRandomActionValue();

        console.log(`${dragon.name} chooses ATTACK with ${dragonAttack} point.`);

        healVsAttack(dragonAttack);
      } else if (dragonChoice === 2) {
        const dragonDefense = getRandomActionValue();

        console.log(`${dragon.name} chooses DEFENSE with ${dragonDefense} point.`);

        healVsDefense();
      } else {
        console.log(`${dragon.name} chooses HEAL with ${HEAL_VALUE} HP.`);

        healVsHeal();
      }
    } else {
      console.log(`\nYou have to choose between number 1 to 3 to make action.`);

      continue;
    }

    limitHitPoint();
    showHitPoint();
  }

  if (dragon.hitPoint <= 0) {
    console.log(`\n${dragon.name} has been defeated!`);
    console.log(`You win soldier, now you are a hero!`);
  } else if (player.hitPoint <= 0) {
    console.log(`\n${player.name} has been defeated!`);
    console.log(`${dragon.name} wins!`);
  }
} else {
  console.log(`\nYou are not ready soldier.`);
}