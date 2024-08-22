import chalk from "chalk";
import readlineSync from "readline-sync";
import shopItems from "../data/shopItems.js";

// 상점에 진입하는 함수
async function enterShop(player, stage) {
  console.clear(); // 화면을 지웁니다.

  console.log(
    chalk.blue(
      `${stage}층의 상점 입니다. 5층마다 상점가에 진입합니다. 아이템을 구매할 수 있습니다.`
    )
  ); // 상점 진입 메시지 출력

  let shopping = true; // 쇼핑 상태를 true로 설정

  while (shopping) {
    console.log(chalk.blue("구매할 아이템을 선택하세요:")); // 아이템 선택 메시지 출력
    const items = Object.keys(shopItems); // 상점 아이템 목록 가져오기

    items.forEach((item, index) => {
      console.log(`${index + 1}. ${item} (가격: ${shopItems[item]} 골드)`); // 아이템 목록 출력
    });

    console.log(`${items.length + 1}. 상점 나가기`); // 상점 나가기 옵션 추가

    const itemChoice = readlineSync.question("아이템 번호를 입력하세요: "); // 사용자로부터 아이템 번호 입력 받기
    const selectedItem = items[itemChoice - 1]; // 선택한 아이템 가져오기
    console.clear(); // 화면을 지웁니다.

    if (selectedItem) {
      // 선택한 아이템이 존재하는 경우
      if (player.gold >= shopItems[selectedItem]) {
        // 플레이어의 골드가 충분한지 확인
        player.gold -= shopItems[selectedItem]; // 골드 차감
        player.addItem(selectedItem); // 아이템 추가
        console.log(chalk.green(`${selectedItem}을(를) 구매했습니다.`)); // 구매 성공 메시지 출력
      } else {
        console.log(chalk.red("골드가 부족합니다.")); // 골드 부족 메시지 출력
      }
    } else if (itemChoice == items.length + 1) {
      // 상점 나가기 선택한 경우
      shopping = false; // 쇼핑 상태를 false로 설정
      console.log(chalk.blue("상점가를 떠납니다.")); // 상점 나가기 메시지 출력
    } else {
      console.log(chalk.red("올바른 아이템 번호를 입력하세요.")); // 잘못된 입력 메시지 출력
    }
  }
}

export default enterShop;