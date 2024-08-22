class Player {
  #maxHp;
  #hp;
  #ATK;
  #df;
  #runChance;
  #doubleAttackChance;
  #slideChance;
  #inventory;
  #gold;

  constructor() {
    this.#maxHp = 100;
    this.#hp = this.#maxHp;
    this.#ATK = 10;
    this.#df = 10;
    this.#runChance = 40;
    this.#doubleAttackChance = 20;
    this.#slideChance = 30;
    this.#inventory = {};
    this.#gold = 100;
  }

  get maxHp() {
    return this.#maxHp;
  }
  set maxHp(value) {
    this.#maxHp = value;
  }

  get hp() {
    return this.#hp;
  }

  set hp(value) {
    this.#hp = value;
  }

  get ATK() {
    return this.#ATK;
  }

  set ATK(value) {
    this.#ATK = value;
  }

  get df() {
    return this.#df;
  }

  set df(value) {
    this.#df = value;
  }

  get gold() {
    return this.#gold;
  }

  set gold(value) {
    this.#gold = value;
  }

  get slideChance() {
    return this.#slideChance;
  }

  set slideChance(value) {
    this.#slideChance = value;
  }

  get runChance() {
    return this.#runChance;
  }

  set runChance(value) {
    this.#runChance = value;
  }

  get doubleAttackChance() {
    return this.#doubleAttackChance;
  }

  set doubleAttackChance(value) {
    this.#doubleAttackChance = value;
  }

  get inventory() {
    return this.#inventory;
  }

  Attack(monster) {
    let damage = this.#ATK + Math.floor(Math.random() * this.#ATK);
    monster.hp -= damage;
    return damage;
  }

  dubuleAttack(monster) {
    let resultdamage = 0;
    for (let i = 0; i < 2; i++) {
      let damage = this.#ATK + Math.floor(Math.random() * this.#ATK);
      monster.hp -= damage;
      resultdamage += damage;
    }
    return resultdamage;
  }

  addItem(item) {
    if (this.#inventory[item]) {
      this.#inventory[item] += 1;
    } else {
      this.#inventory[item] = 1;
    }
  }

  removeItem(item) {
    if (this.#inventory[item]) {
      this.#inventory[item] -= 1;
      if (this.#inventory[item] === 0) {
        delete this.#inventory[item];
      }
    }
  }
}

export default Player;
