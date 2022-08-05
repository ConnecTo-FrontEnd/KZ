// 질문 리스트 객체
// 카페인 - 할인 - 칼로리 - 맛
let obj = {
  questions: [
    ["오늘 달리실 예정이신가요?", 0, 10],
    ["돈이 얼마 남지 않으셨나요?", 1, 9],
    ["칼로리에 예민하신가요?", 2, 8],
    ["맛이 중요한가요?", 3, 7],
  ], // 설문 내용, 가중치 종류, 가중치
  drinks: {
    몬스터: {
      // 칼로리
      name: "몬스터",
      img: `./src/assets/drink_monster.jpg`,
      caffeine: 95, //mg
      event: 0,
      calorie: 1000 - 11, //kcal
      flavor: 3,
    },
    핫식스: {
      // 이벤트
      name: "핫식스",
      img: `./src/assets/drink_hotsix.jpg`,
      caffeine: 60,
      event: 2,
      calorie: 1000 - 115,
      flavor: 4,
    },
    레드불: {
      // 맛
      name: "레드불",
      img: `./src/assets/drink_redbull.jpg`,
      caffeine: 62.5,
      event: 0,
      calorie: 1000 - 160,
      flavor: 5,
    },
    코리안좀비: {
      // 카페인
      name: "코리안좀비",
      img: `./src/assets/drink_KZ.jpg`,
      caffeine: 100,
      event: 1,
      calorie: 1000 - 135,
      flavor: 4,
    },
  },
};

const survey_question = document.querySelector(".machine__survey");
const buttons = document.querySelector(".buttons");
const resetBtn = document.querySelector(".machine__reset");
const soda = document.querySelector("#soda");
const modalback = document.querySelector(".modalback");
const modal = document.querySelector(".modal");
const close = document.querySelector(".modal__close");
const modalImg = document.querySelector(".modal__img");
const modalContent = document.querySelector(".modal__content");
const leftEyebrow = document.querySelector(".left .eyebrow");
const rightEyebrow = document.querySelector(".right .eyebrow");

survey_question.innerHTML = obj.questions[0][0]; // 처음 질문
resetBtn.style.backgroundImage = `url(./src/assets/reset.jpg)`;
let i = 0; // 설문 번호
let weight = [0, 0, 0, 0]; // 가중치 => 카페인: 0, 할인: 1, 칼로리: 2, 맛: 3
let eyebrowDeg = 0;
buttons.addEventListener("click", (e) => {
  if (e.target.classList.contains("buttons__item__btn")) {
    if (i < obj.questions.length) {
      if (e.target.classList.contains("yes")) {
        // 가중치 더해줌
        weight[obj.questions[i][1]] += obj.questions[i][2]; // 가중치 더해줌
        eyebrowDeg += 10;
      } else if (e.target.classList.contains("no")) {
        // 딱히 뭐 안해줘도 될 듯
        eyebrowDeg -= 10;
      }
      leftEyebrow.style.transform = `rotate(${eyebrowDeg}deg)`;
      rightEyebrow.style.transform = `rotate(${-eyebrowDeg}deg)`;
      i++;
      if (i != obj.questions.length) {
        survey_question.innerHTML = obj.questions[i][0];
        console.log(document.querySelector(".machine__survey"));
        document.querySelector(".machine__survey").focus();
      } // 다음 질문 넣어주고
      else if (i == obj.questions.length) {
        // 리셋버튼
        survey_question.innerHTML = "";
        resetBtn.style.display = "block";
        console.log(i);

        let max = 0;
        let w; // 어떤 가중치가 가장 큰지 / 카페인: 0, 할인: 1, 칼로리: 2, 맛: 3
        weight.forEach((e, i) => {
          if (e > max) {
            // 가중치가 가장 큰 카테고리가 무엇인지 구함
            max = e;
            w = i;
          }
        });
        let category;
        if (w == 0) {
          category = "caffeine";
        } else if (w == 1) {
          category = "event";
        } else if (w == 2) {
          category = "calorie";
        } else if (w == 3) {
          category = "flavor";
        }

        max = 0;
        let selectedDrink;
        for (let key in obj["drinks"]) {
          if (obj["drinks"][key][category] > max) {
            max = obj["drinks"][key][category];
            selectedDrink = obj["drinks"][key];
          }
        }
        console.log(selectedDrink);
        modalImg.src = selectedDrink["img"];
        modalImg.alt = selectedDrink["name"] + "이미지";
        modalContent.innerHTML = `
          <li><span>name:</span> <span class="modal__content__item">${
            selectedDrink["name"]
          }</span></li>
          <li><span>caffeine:</span> <span class="modal__content__item">${
            selectedDrink["caffeine"]
          } mg</span></li>
          <li><span>event:</span> <span class="modal__content__item">${
            selectedDrink["event"] == 2
              ? "1 + 1"
              : selectedDrink["event"] == 1
              ? "2 + 1"
              : "할인 상품 아님"
          }</span></li>
          <li><span>calorie:</span> <span class="modal__content__item">${
            1000 - selectedDrink["calorie"]
          } kcal</span></li>
          <li><span>flavor:</span> <span class="modal__content__item">${
            selectedDrink["flavor"]
          } 점</span></li>
          `;
        document.querySelector(".modal__content").focus();
        // 음료 드랍
        soda.style.backgroundImage = `url(${selectedDrink["img"]})`;
        soda.classList.add("drinkDrop");
        setTimeout(() => {
          modalback.style.display = "block";
        }, 1200);
      }
    }

    // document.querySelector(".modal__content__start").focus();
  }
});

resetBtn.addEventListener("click", (e) => {
  eyebrowDeg = 0;
  leftEyebrow.style.transform = `rotate(${eyebrowDeg}deg)`;
  rightEyebrow.style.transform = `rotate(${-eyebrowDeg}deg)`;
  console.log("snfma");
  survey_question.innerHTML = obj.questions[0][0]; // 처음 질문
  i = 0; // 설문 번호
  weight = [0, 0, 0, 0];
  resetBtn.style.display = "none";
  soda.classList.remove("drinkDrop");
  document.querySelector(".machine__survey").focus();
});

close.addEventListener("click", () => {
  modalback.style.display = "none";
});
