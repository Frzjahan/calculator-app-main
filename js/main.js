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
let input = '0';

function render(){
    const [whole, fraction] = input.split('.');

    const grouped = Number(whole).toLocaleString('en-US');

    resault.textContent = fraction === undefined ? resault.textContent = grouped : `${grouped}.${fraction}`;
}

const num = numbers.forEach((number) =>{
    number.addEventListener('click', () =>{
        const digit = number.textContent;

        if(waitingForNumber){
            input = digit;
            waitingForNumber = false;
            render()
            return;
        }
        if(input.replace('.', '').length >= 15){
            return;
        }

        input = input === '0' ? digit : input + digit;

        render()
    })
})

function chooseOperator(newOperator){

    if(waitingForNumber){
        operator = newOperator;
        return; 
    }

    const currentNumber = Number(input);

    if(total === null){
        total = currentNumber;
    } else if(operator !== null){
        total = calculate(total, currentNumber, operator)
    }

    operator = newOperator;
    waitingForNumber = true;
    input = String(total);
    render();
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
    if(!input.includes('.')){
        input += '.';
        render();
    }
})

equal.addEventListener('click', ()=>{

    if(waitingForNumber){
        return;
    }

    if(total === null || operator === null){
        return;
    }

    const currentNumber = Number(input);

    total = calculate(total, currentNumber, operator);

    input = String(total);
    render();

    operator = null;
    waitingForNumber = true;
});

deleteBtn.addEventListener('click', ()=>{

    if(waitingForNumber){
        return;
    }

    if(input.length > 1){
        input = input.slice(0, -1)
    } else{
        input = '0';
    }

    render();
})

resetAction.addEventListener('click', ()=>{
    input = '0';

    total = null;
    operator = null;
    waitingForNumber = false;
    
    render();
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



