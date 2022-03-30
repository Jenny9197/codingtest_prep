let input_blank = document.querySelector('.input_blank');
let result_blank = document.querySelector('.result_blank');
let submit_btn = document.querySelector('.submit');
let ac_btn = document.querySelector('.ac');
let result;

const add = (element) => {
    input_blank.value += element;
    input_blank.focus();
}

const calculate = () => {
    if (input_blank.value === '') {
        result_blank.value = '결과창';
    } else {
        result = eval(input_blank.value);
        result_blank.value = result;
        input_blank.focus();
    }
}

submit_btn.addEventListener('click', (e) => {
    e.preventDefault();
    calculate();
    input_blank.focus();
})

ac_btn.addEventListener('click', () => {
    result = '';
    result_blank.value = '결과창';
    input_blank.value = '';
    input_blank.focus();
})