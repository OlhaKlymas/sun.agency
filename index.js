// Табы
let deliveryArr = Array.from(document.querySelectorAll('input[name=delivery]'));
let contentArr = Array.from(document.querySelectorAll('.content'));

let orderForm = document.querySelector('.order__form');
let yourself = document.querySelector('.yourself');
let courierNP = document.querySelector('.courier_np');
let yourselfNP = document.querySelector('.yourself_np');

if(deliveryArr.length !== 0){
    deliveryArr.forEach(item => {
        item.addEventListener('click', function() {
            contentArr.forEach(content => content.classList.remove('active'))
            orderForm.classList.add('active')
            switch (String(item.value)) {
                case 'yourself':
                    yourself.classList.add('active')
                    break;
                case 'courier_np':
                    courierNP.classList.add('active')
                    break;
                case 'yourself_np':
                    yourselfNP.classList.add('active')
                    break;
                default:
                    yourself.classList.add('active')
            }
        })
    })
}

// Активируем поле ввода
let inputsArr = Array.from(orderForm.querySelectorAll('.input__block'));
let textareasArr = Array.from(orderForm.querySelectorAll('.textarea__block'));

makeActiveField(inputsArr)
makeActiveField(textareasArr)

function makeActiveField(arr){
    arr.forEach(item => {
        item.addEventListener('click', function (){
            arr.forEach(a => {
                let block = a.querySelector('input') || a.querySelector('textarea')
                if(block.value === ''){
                    a.classList.remove('active')
                }
            })
            item.classList.add('active')
        })
    })
}

// Валидация текстовых полей
let nameArr = Array.from(document.querySelectorAll('.name'));
let cityArr = Array.from(document.querySelectorAll('.city'));
let addressArr = Array.from(document.querySelectorAll('.address'));
let textareaArr = Array.from(document.querySelectorAll('.textarea__block'));
setEvent(nameArr)
setEvent(cityArr)
setEvent(addressArr)
setEvent(textareaArr)

function setEvent(arr){
    arr.forEach(item => {
        let field = item.querySelector('input') || item.querySelector('textarea')
        field.addEventListener('input', function (){
            check(item)
        });
    })
}

function check(field){
    let fieldError = field.querySelector('.error')
    let fieldBlock = field.querySelector('input') || field.querySelector('textarea')
    let label = field.querySelector('label')
    if (fieldBlock.validity.valid && fieldBlock.value.trim() !== '') {
        fieldError.textContent = '';
        field.classList.add('validate')
        field.classList.remove('error_wrap')
    } else {
        field.classList.remove('validate')
        field.classList.add('error_wrap')
        fieldError.textContent = field.classList.contains('address') ? 'Введите улицу, дом, квартиру' : `Введите ${label.innerHTML.toLowerCase()}`;
    }
}

// Валидация телефона
let telArr = Array.from(document.querySelectorAll('.tel'));
telArr.forEach(tel => {
    let input = tel.querySelector('input')
    input.addEventListener('input', function (){
        checkTel(tel)
    });
})
function checkTel(tel){
    let input = tel.querySelector('input')
    let telError = tel.querySelector('.error')
    let regexTel = /^\+?[3]?[8][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
    if (input.value !== '') {
        if(regexTel.test(input.value)){
            tel.classList.add('validate')
            tel.classList.remove('error_wrap')
            telError.textContent = '';
        } else {
            tel.classList.remove('validate')
            tel.classList.add('error_wrap')
            telError.textContent = 'Номер телефона не корректный';
        }
    } else {
        tel.classList.remove('validate')
        tel.classList.add('error_wrap')
        telError.textContent = 'Введите номер телефона';
    }
}

// Валидация email
let emailArr = Array.from(document.querySelectorAll('.email'));
emailArr.forEach(email => {
    let input = email.querySelector('input')
    input.addEventListener('input', function (){
        checkEmail(email)
    });
})
function checkEmail(email){
    let input = email.querySelector('input')
    let emailError = email.querySelector('.error')
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (input.value !== '') {
        if(regex.test(input.value)){
            email.classList.add('validate')
            email.classList.remove('error_wrap')
            emailError.textContent = '';
        } else {
            email.classList.remove('validate')
            email.classList.add('error_wrap')
            emailError.textContent = 'e-mail не корректный';
        }
    } else {
        email.classList.remove('validate')
        email.classList.add('error_wrap')
        emailError.textContent = 'Введите e-mail';
    }
}

// Валидация отделения НП
let branchNumberArr = Array.from(document.querySelectorAll('.branch_number'));
branchNumberArr.forEach(branchNumber => {
    let input = branchNumber.querySelector('input')
    input.addEventListener('input', function (){
        checkBranchNumber(branchNumber)
    });
})
function checkBranchNumber(branchNumber){
    let input = branchNumber.querySelector('input')
    let branchNumberError = branchNumber.querySelector('.error')
    let regex = /^[0-9]{1,3}$/;
    if (input.value !== '') {
        if(regex.test(input.value)){
            branchNumber.classList.add('validate')
            branchNumber.classList.remove('error_wrap')
            branchNumberError.textContent = '';
        } else {
            branchNumber.classList.remove('validate')
            branchNumber.classList.add('error_wrap')
            branchNumberError.textContent = 'Номер отделения Новой почты не корректный';
        }
    } else {
        branchNumber.classList.remove('validate')
        branchNumber.classList.add('error_wrap')
        branchNumberError.textContent = 'Введите номер отделения Новой почты';
    }
}

// Валидация всех полей при отправке формы
let submitArr = Array.from(orderForm.querySelectorAll('input[type=submit]'));

submitArr.forEach(btn => {
    btn.addEventListener('click', function (){

        let parent = btn.closest('form');
        let name = parent.querySelector('.name');
        let city = parent.querySelector('.city');
        let address = parent.querySelector('.address');
        let textareaBlock = parent.querySelector('.textarea__block');
        let branchNumber = parent.querySelector('.branch_number');
        let email = parent.querySelector('.email');
        let tel = parent.querySelector('.tel');

        name && check(name);
        city && check(city);
        address && check(address);
        textareaBlock && check(textareaBlock);
        branchNumber && checkBranchNumber(branchNumber);
        email && checkEmail(email)
        tel && checkTel(tel);
    })
})
