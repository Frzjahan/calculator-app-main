const numbers = document.querySelectorAll('.number');
const resault = document.querySelector('.resault');
const deleteBtn = document.querySelector('#del-btn');
const resetAction = document.querySelector('.reset-action');
const circleChanger = document.querySelector('.circle-changer');
const themeChanger = document.querySelector('.theme-changer');
const theme1 = document.querySelector('.theme-1');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const points = document.querySelector('.points');
const times = document.querySelector('.times');
const divided = document.querySelector('.divided');
const equal = document.querySelector('.equal-action');

let total = null;
let operator = null;
let waitingForNumber = false;
let hasPoint = false;

const num = numbers.forEach((number) =>{
    number.addEventListener('click', () =>{
        if(waitingForNumber){
            resault.textContent = number.textContent;
            waitingForNumber = false;
            return;
        }
        if(resault.textContent.length < 15){
            if(resault.textContent === '0'){
                resault.textContent = number.textContent
            }
            else{
                resault.textContent += number.textContent
                resault.textContent = Number(resault.textContent.replace(/,/g, '')).toLocaleString('en-US');
            }
        }
    })
})

function chooseOperator(newOperator){

    if(waitingForNumber){
        operator = newOperator;
        resault.textContent = `${newOperator} ${total.toLocaleString('en-US')}`;
        return; 
    }

    const currentNumber = Number(resault.textContent.replace(/,/g, ''));

    if(total === null){
        total = currentNumber;
    }

    else if(operator !== null){
        total = calculate(total, currentNumber, operator)
    }

    operator = newOperator;
    waitingForNumber = true;
    hasPoint = false;

    resault.textContent = `${newOperator} ${total.toLocaleString('en-US')}`;
}

function calculate(firstNumber, secondNumber, operator){

    if(operator === '+'){
        return firstNumber + secondNumber;
    }

    if(operator === '-'){
        return firstNumber - secondNumber;
    }

    if(operator === '*'){
        return firstNumber * secondNumber;
    }

    if(operator === '/'){
        return firstNumber / secondNumber;
    }
}

plus.addEventListener('click', ()=>{
    chooseOperator('+');
})

minus.addEventListener('click', ()=>{
    chooseOperator('-');
})

times.addEventListener('click', ()=>{
    chooseOperator('*');
})

divided.addEventListener('click', ()=>{
    chooseOperator('/');
})

points.addEventListener('click', ()=>{
    if(hasPoint === false){
        resault.textContent += points.textContent;
        hasPoint = true;
    }
})

equal.addEventListener('click', ()=>{

    if(total === null || operator === null){
        return;
    }

    if(hasPoint === false){
        resault.textContent += points.textContent;
        hasPoint = true;
    }

    const currentNumber = Number(resault.textContent.replace(/,/g, ''));

    total = calculate(total, currentNumber, operator);

    resault.textContent = total.toLocaleString('en-US');

    total = null;
    operator = null;
    waitingForNumber = false;
    hasPoint = false;
});

deleteBtn.addEventListener('click', ()=>{

    if(waitingForNumber){
        return;
    }

    if(resault.textContent.endsWith('.')){
        hasPoint = false;
    }

    resault.textContent = resault.textContent.slice(0 , -1)

    if(resault.textContent === ''){
        resault.textContent = '0'
    }
})

resetAction.addEventListener('click', ()=>{
    resault.textContent = '0';

    total = null;
    operator = null;
    waitingForNumber = false;
    hasPoint = false;
})

let clickCount = 0;

themeChanger.addEventListener('click', ()=>{
    clickCount += 20

    if(clickCount > 40){
        clickCount = 0
    }

    circleChanger.style.transform = `translateX(${clickCount}px)`

    if(clickCount === 0){
        theme1.classList.remove('theme-3')
        theme1.classList.add('theme-1');
    }
    else if(clickCount === 20){
        theme1.classList.remove('theme-1');
        theme1.classList.add('theme-2');
    }
    else if(clickCount === 40){
        theme1.classList.remove('theme-2');
        theme1.classList.add('theme-3');
    }
});



