class Monster {
    #hp;
    #ATK = 1;
    
  constructor(stage) {
    this.#hp = 80 + (Math.floor(Math.random() * 6 * stage) + stage * 10);
    this.#ATK = this.#ATK + (Math.floor(Math.random() * 4 * stage) + stage);
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

  Attack(player,choice = 0) {
    let damage = this.#ATK + Math.floor(Math.random() * 4);
    let playerDamage = Math.floor(damage * ((100 - player.df) / 100));
    if(choice === "3"){
        playerDamage = Math.floor(playerDamage * (60 / 100));
        this.hp -= playerDamage;
        return playerDamage;
    }
    player.hp -= playerDamage;
    return playerDamage;
    // 몬스터의 공격
  }
}

export default Monster;