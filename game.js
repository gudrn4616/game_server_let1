import chalk from "chalk";
import readlineSync from "readline-sync";
import Player from "./class/play.js";
import Monster from "./class/moster.js";
import enterShop from "./Area/enterShop.js";
// 현재 상태를 출력하는 함수
function displayStatus(stage, player, monster) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
      chalk.blueBright(
        `| {플레이어} 정보 체력: ${player.hp} 공격력: ${player.ATK} 방어력: ${player.df} 골드: ${player.gold}`
      ) +
      chalk.redBright(
        `\n| Stage: ${stage} | {몬스터} 정보 체력: ${monster.hp} 공격력: ${monster.ATK}`
      )
  );
  console.log(chalk.magentaBright(`=====================\n`));
}

// 전투를 진행하는 함수
const battle = async (stage, player, monster) => {
  let logs = [];

  while (player.hp > 0 && monster.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(
      chalk.green(
        `\n1. 공격한다 2. 연속공격(${player.doubleAttackChance}%) 3. 방어(${player.slideChance}%) 4. 도망친다(${player.runChance}%) 5. 인벤토리`
      )
    );
    const choice = readlineSync.question("당신의 선택은? ");

    switch (choice) {
      case "1":
        logs.push(
          chalk.green(`${player.Attack(monster)}의 데미지를 주었습니다.`)
        );
        break;

      case "2":
        if (Math.random() * 100 > 100 - player.doubleAttackChance)
          logs.push(
            chalk.yellow(
              `연속 공격에 성공하였습니다. 총 ${player.dubuleAttack(monster)}의 데미지를 주었습니다.`
            )
          );
        else logs.push(chalk.red("연속공격에 실패했습니다."));
        break;

      case "3": // 방어 부분 구현
        if (Math.random() * 100 > 100 - player.slideChance) {
          let counterdamage = monster.Attack(player, "3");
          logs.push(chalk.yellow("방어에 성공했습니다."));
          logs.push(
            chalk.yellow(`몬스터에게 ${counterdamage}의 데미지를 주었습니다.`)
          );
        } else {
          logs.push(chalk.red("방어에 실패했습니다."));
          logs.push(
            chalk.red(
              `몬스터가 ${monster.Attack(player)}의 데미지를 주었습니다.`
            )
          );
        }
        break;

      case "4": // 도망
        if (Math.random() * 100 > 100 - player.runChance) {
          return "escaped"; // 도망치면 다음 스테이지로 넘어가기 위해 'escaped' 반환
        } else {
          logs.push(chalk.red("도망에 실패했습니다."));
        }
        break;

      case "5": // 인벤토리
        if (Object.keys(player.inventory).length === 0) {
          logs.push(chalk.red("인벤토리가 비어있습니다."));
        } 
        else 
        {
          console.log(chalk.green("사용할 아이템을 선택하세요:"));
          const items = Object.keys(player.inventory);

          items.forEach((item, index) => {
            console.log(chalk.green(`${index + 1}. ${item} (${player.inventory[item]})`));
          });

          const itemChoice = readlineSync.question("아이템 번호를 입력하세요: ");
          const selectedItem = items[itemChoice - 1];

          if (selectedItem) {
            player.removeItem(selectedItem);
            logs.push(chalk.green(`${selectedItem}을(를) 사용했습니다.`));
            // 아이템 사용 효과 구현
            switch (selectedItem) {
              case "체력 포션":
                player.hp = Math.min(player.maxHp, player.hp + 50);
                logs.push(chalk.green("체력이 50 회복되었습니다."));
                break;
              case "공격력 포션":
                player.ATK += 10;
                logs.push(chalk.green("공격력이 10 증가했습니다."));
                break;
              default:
                logs.push(chalk.red("알 수 없는 아이템입니다."));
                break;
            }
          } else {
            logs.push(chalk.red("올바른 아이템 번호를 입력하세요."));
          }
        }
        break;

      default:
        logs.push(chalk.red("올바른 선택을 하세요."));
        continue;
    }

    if (monster.hp > 0) {
      if (choice !== "3") {
        logs.push(
          chalk.red(`몬스터가 ${monster.Attack(player)}의 데미지를 주었습니다.`)
        );
      }
    }
    if (logs.length > 10) {
      // logs 길이가 10이 넘어가면 처음 두개 삭제, 너무 길어서 화면이 보기 좋지 않음
      logs.shift();
      logs.shift();
    }
  }
};

// 게임을 시작하는 함수
export async function startGame() {
  console.clear();
  const player = new Player();
  let stage = 1;

  while (stage <= 10) {
    const monster = new Monster(stage);
    const result = await battle(stage, player, monster);

    // 스테이지 클리어 및 게임 종료 조건
    if (player.hp <= 0) 
    {
      // 플레이어 체력이 0이면 게임 종료
      console.log(chalk.red("패배했습니다."));
      break;
    }
    else if (result === "escaped") 
    {
      // 도망 간 경우 스테이지 1로 이동
      console.log(chalk.green("도망쳤습니다."));
      stage = 1;
      await new Promise((resolve) => setTimeout(resolve, 2000));
      continue;
    } 
    else if (monster.hp <= 0) 
    {
      // 몬스터 체력이 0이면 스테이지 클리어
      console.log(chalk.green("스테이지 클리어"));
      let getgold = stage * Math.floor(Math.random() * 10) + 10;
      player.gold += getgold;
      console.log(chalk.green(`${getgold}의 골드를 획득했습니다.`));

      const reward = Math.floor(Math.random() * 4);

      switch (reward) {
        case 0:
          player.maxHp += Math.floor((Math.random() * 31) % 30) + 20; // 최대 체력 최대 50까지 추가됨
          break;
        case 1:
          player.ATK += Math.floor(Math.random() * 16) + 5; // 공격력 최대 20까지 추가됨
          break;
        case 2:
          player.df = Math.min(player.df + Math.floor(Math.random() * 5) + 3,60); // 방어력 최대 60
          player.slideChance = Math.min(player.slideChance + Math.floor(Math.random() * 9) + 3,40); // 방어 확률 최대 40%
          break;
        case 3:
          player.runChance = Math.min(player.runChance+Math.floor(Math.random() * 3) + 1, 40); // 도망 확률 최대 40%
          break;
      }

      player.hp = Math.min(player.maxHp, player.hp + 30); // 피 회복

      if (reward !== 1) player.ATK += 1;
      // 스테이지 마다 공격력이 아닌 다른 스텟이 올라 가는 경우
      // 게임에 지장이 너무 큼으로 매 스테이지마다 공격력이 1씩 올라가는 것으로 수정

      if( stage === 10)
      {
        
        console.log(chalk.green("게임 클리어"));
        await new Promise((resolve) => setTimeout(resolve, 2000));
        break;
      }
      if (stage % 5 === 0) 
      {
        player.hp = player.maxHp;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await enterShop(player, stage);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    stage++;
  }
}
