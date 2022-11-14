'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    form.addEventListener('submit', formValidate);

    function formValidate(e) {
        e.preventDefault();
        const requiredInputs = document.querySelectorAll('input[data-required]');
        const validate = new Validator();

        requiredInputs.forEach(input => {
            const reqInput = input.dataset.required;
            const value = input.value;
            const parentElement = input.parentElement;

            let check;

            if (reqInput === 'firstName') {
                check = validate.isName(value);
            } else if (reqInput === 'email') {
                check = validate.isEmail(value);
            } else if (reqInput === 'password') {
                check = validate.isPassword(value);
            } else if (reqInput === 'passwordConfirm') {
                check = validate.isPasswordSame();
            }

            if (check) {
                input.classList.remove('error-frame');
                removeErrorMsg(parentElement);
            } else {
                input.classList.add('error-frame');

                if (reqInput === 'firstName') {
                    setErrorMsg(parentElement, 'name must contain letters only and this field cannot be empty');
                } else if (reqInput === 'email') {
                    setErrorMsg(parentElement, 'invalid email format');
                } else if (reqInput === 'password') {
                    setErrorMsg(parentElement, 'password must be at least 9 up to 16 characters long and contain one special character at least');
                } else if (reqInput === 'passwordConfirm') {
                    setErrorMsg(parentElement, 'password is not the same');
                }
            }
        });
    }

    function setErrorMsg(wrapper, message) {
        if (wrapper.querySelector('.error-message')) {
            return;
        }

        return wrapper.innerHTML += `
        <span class="error-message">
            <p>${message}</p>
        </span>
        `;
    }

    function removeErrorMsg(wrapper) {
        if (wrapper.querySelector('.error-message')) {
            const errorMessage = wrapper.querySelector('.error-message');
            errorMessage.innerHTML = '';
        }
    }

    class Validator {
        isEmail(email) {
            if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
                return true;
            } else {
                return false;
            }
        }
        isName(name) {
            if (/^[a-zA-Z]+$/.test(name)) {
                return true;
            } else {
                return false;
            }
        }
        isPassword(pas) {
            if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(pas)) {
                return true;
            } else {
                return false;
            }
        }
        isPasswordSame() {
            const userPassword = document.getElementById('userpas');
            const confirmPassword = document.getElementById('userconfirm');

            if (userPassword.value !== confirmPassword.value || confirmPassword.value === '') {
                return false;
            } else {
                return true;
            }
        }
    }
});