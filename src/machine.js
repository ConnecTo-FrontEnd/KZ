// 질문 리스트 객체
// 카페인 - 할인 - 칼로리 - 맛
let obj = {
  'questions' : [['오늘 달리실 예정이신가요?', 0, 10], ['돈이 얼마 남지 않으셨나요?', 1, 9], ['칼로리에 예민하신가요?', 2, 8], ['맛이 중요한가요?', 3, 7]], // 설문 내용, 가중치 종류, 가중치
  'drinks' : {
    '몬스터' : {
      'name' : '몬스터',
      'img' : `url(./src/assets/drink_monster.png)`,
      'caffeine' : 10,
      'event' : 0,
      'calorie' : 5,
      'flavor' : 5,
    },
    '핫식스' : {
      'name' : '핫식스',
      'img' : `url(./src/assets/drink_hotsix.png)`,
      'caffeine' : 5,
      'event' : 0,
      'calorie' : 10,
      'flavor' : 5,
    },
    '레드불' : {
      'name' : '레드불',
      'img' : `url(./src/assets/drink_redbull.png)`,
      'caffeine' : 5,
      'event' : 2,
      'calorie' : 5,
      'flavor' : 5,
    },
    '코리안좀비' : {
      'name' : '코리안좀비',
      'img' : `url(./src/assets/drink_KZ.png)`,
      'caffeine' : 5,
      'event' : 1,
      'calorie' : 5,
      'flavor' : 10,
    },

  },
}

const survey_question = document.querySelector('.machine__survey');
const buttons = document.querySelector('.buttons');
const resetBtn = document.querySelector('.machine__reset');
const soda = document.querySelector('#soda');
const modal = document.querySelector('.modal');
const close = document.querySelector('.modal__close');
const modalContent = document.querySelector('.modal__content');
survey_question.innerHTML = obj.questions[0][0];  // 처음 질문

let i = 0;  // 설문 번호
let weight = [0, 0, 0, 0];  // 가중치 => 카페인: 0, 할인: 1, 칼로리: 2, 맛: 3

buttons.addEventListener('click', (e) => {
  
  if (e.target.classList.contains('buttons__item__btn')) {
    if (i < obj.questions.length) {
      if (e.target.classList.contains('yes')) {
        // 가중치 더해줌
        weight[obj.questions[i][1]] += obj.questions[i][2]; // 가중치 더해줌
      }
      else if (e.target.classList.contains('no')) {
        // 딱히 뭐 안해줘도 될 듯
      }
      i++;
      if (i != obj.questions.length) survey_question.innerHTML = obj.questions[i][0];  // 다음 질문 넣어주고
      else if (i == obj.questions.length) { // 리셋버튼
        survey_question.innerHTML = '';
        resetBtn.style.display = 'block';
        console.log(i);

        let max = 0;
          let w;  // 어떤 가중치가 가장 큰지 / 카페인: 0, 할인: 1, 칼로리: 2, 맛: 3
          weight.forEach((e, i)  => {
            if (e > max) {  // 가중치가 가장 큰 카테고리가 무엇인지 구함
              max = e;
              w = i;
            }
          })
          let category;
          if (w == 0) {category = 'caffeine'} 
          else if (w == 1) {category = 'event'} 
          else if (w == 2) {category = 'calorie'} 
          else if (w == 3) {category = 'flavor'} 

          max = 0;
          let selectedDrink;  
          for (let key in obj['drinks']) {
            if (obj['drinks'][key][category] > max) {
              max = obj['drinks'][key][category];
              selectedDrink = obj['drinks'][key];
            }
          }
          console.log(selectedDrink)
          modalContent.innerHTML = `
          <div>name: ${selectedDrink['name']}<div>
          <div>caffeine: ${selectedDrink['caffeine']}<div>
          <div>event: ${selectedDrink['event']}<div>
          <div>calorie: ${selectedDrink['calorie']}<div>
          <div>flavor: ${selectedDrink['flavor']}<div>
          `
        // 음료 드랍
        soda.style.backgroundImage  = selectedDrink['img'];
        soda.classList.add('drinkDrop');
        setTimeout(()=>{
          modal.style.display = 'block';
          
        },1200)
      }
    }
    console.log(i, weight)
  }
})

resetBtn.addEventListener('click', (e) => {
  console.log('snfma')
  survey_question.innerHTML = obj.questions[0][0];  // 처음 질문
  i = 0;  // 설문 번호
  weight = [0, 0, 0, 0];
  resetBtn.style.display = 'none';
  soda.classList.remove('drinkDrop');
})

close.addEventListener('click', () => {
  modal.style.display = 'none';
})