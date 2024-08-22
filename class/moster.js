// 몬스터 클래스: 게임에서 몬스터의 속성과 행동을 정의하는 클래스
class Monster {
    #hp; // 몬스터의 체력
    #ATK = 1; // 몬스터의 공격력
    
  constructor(stage) {
    this.#hp = 80 + (Math.floor(Math.random() * 6 * stage) + stage * 10); // 스테이지에 따라 체력 설정
    this.#ATK = this.#ATK + (Math.floor(Math.random() * 4 * stage) + stage); // 스테이지에 따라 공격력 설정
  }

  get hp() {
    return this.#hp; // 체력 반환
  }

  set hp(value) {
    this.#hp = value; // 체력 설정
  }

  get ATK() {
    return this.#ATK; // 공격력 반환
  }

  set ATK(value) {
    this.#ATK = value; // 공격력 설정
  }

  Attack(player, choice = 0) {
    let damage = this.#ATK + Math.floor(Math.random() * 4); // 기본 공격력에 랜덤 요소 추가
    let playerDamage = Math.floor(damage * ((100 - player.df) / 100)); // 플레이어의 방어력에 따른 실제 데미지 계산
    if (choice === "3") {
        playerDamage = Math.floor(playerDamage * (60 / 100)); // 방어 선택 시 데미지 감소
        this.hp -= playerDamage; // 몬스터가 반격 데미지 받음
        return playerDamage; // 반격 데미지 반환
    }
    player.hp -= playerDamage; // 플레이어의 체력 감소
    return playerDamage; // 데미지 반환
    // 몬스터의 공격
  }
}

export default Monster;