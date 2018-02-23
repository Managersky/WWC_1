const validateForm = (function()
{
    //private properties
    const classError = 'error';

    const showFieldValidation = function (input, inputIsValid) {

        if (!inputIsValid) {
            input.parentNode.classList.add(options.classError);
            displayFieldError(input);
        } else {
            input.parentNode.classList.remove(options.classError);
            hideFieldError(input);
        }
    };

    const displayFieldError = function (input) {
        const fieldError = input.parentNode.closest('.error');
        const errorText = input.dataset.error;
        const divError = document.createElement('div');
        divError.classList.add('field-error');
        divError.innerText = errorText;
        fieldError.appendChild(divError);
    };

    const hideFieldError = function (input) {
        const fieldError = input.parentNode.lastElementChild;
        const fieldErrorClass = fieldError.className;
        if (fieldErrorClass === "field-error") {
            fieldError.remove();
        }
    };

    const testInputText = function (input) {
        let username = document.querySelectorAll(".username");

        const usernameReg = /^[a-zA-Z][a-z0-9_-]{3,19}$/;
        for (let i = 0; i < username.length; i++) {
            if (!usernameReg.test(input.value)) {
                showFieldValidation(input, false);
                return false;
            } else {
                showFieldValidation(input, true);
                return true;
            }
        }
    };

    const testInputPhone= function (input) {
        const phoneReg = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

        if (!phoneReg.test(input.value)) {
            showFieldValidation(input, false);
            return false;
        } else {
            showFieldValidation(input, true);
            return true;
        }
    };

    const testInputPassword = function (input) {

        const passwordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,}$/; //Min 8 characters, at least one letter, one number and one special character

        if (!passwordReg.test(input.value)) {
            showFieldValidation(input, false);
            return false;
        } else {
            showFieldValidation(input, true);
            return true;
        }
    };

    function testPasswordConfirm(input) {
        let password = document.getElementById("password_register_form");
        let passwordConfirm = document.getElementById("confirm_password_register_form");

        if (password.value !== passwordConfirm.value) {
            console.log("zle hasla");
            showFieldValidation(input, false);
            return false;
        } else {
            showFieldValidation(input, true);
            return true;
        }
    }

    const testInputEmail = function (input) {
        const mailReg = new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$', 'gi');

        if (!mailReg.test(input.value)) {
            showFieldValidation(input, false);
            return false;
        } else {
            showFieldValidation(input, true);
            return true;
        }
    };

    const testInputSelect = function (select) {
        if (select.options[select.selectedIndex].value == "" || select.options[select.selectedIndex].value == "-1") {
            showFieldValidation(select, false);
            return false;
        } else {
            showFieldValidation(select, true);
            return true;
        }
    };

    const testInputCheckbox = function (input) {
        const checkbox = input.form.querySelectorAll(':scope input[type="checkbox"]:checked');
        if (checkbox.length) {
            showFieldValidation(input, true);
            return true;
        } else {
            showFieldValidation(input, false);
            return false;
        }
    };


    //prepareElements add event to element with attribute 'required'
    const prepareElements = function () {
        for (let i = 0; i < options.form.length; i++) {

            const elements = options.form[i].querySelectorAll(":scope [required]");

        [].forEach.call(elements, function (element) {
            //check type element
            if (element.nodeName.toUpperCase() == "INPUT") {
                const type = element.type.toUpperCase();

                //for every single element, add function check
                if (type == "TEXT") {
                    element.addEventListener("keyup", function () {
                        testInputText(element);
                    });
                    element.addEventListener("blur", function () {
                        testInputText(element);
                    });
                }
                if (type == "PASSWORD") {
                    element.addEventListener("keyup", function () {
                        testInputPassword(element);
                    });
                    element.addEventListener("blur", function () {
                        testInputPassword(element);
                    });
                }
                if (type == "EMAIL") {
                    element.addEventListener("keyup", function () {
                        testInputEmail(element);
                    });
                    element.addEventListener("blur", function () {
                        testInputEmail(element);
                    });
                }
                if (type == "CHECKBOX") {
                    element.addEventListener("click", function () {
                        testInputCheckbox(element);
                    });
                }
                if (type == "NUMBER") {
                    element.addEventListener("keyup", function () {
                        testInputPhone(element);
                    });
                    element.addEventListener("blur", function () {
                        testInputPhone(element);
                    });
                }
            }
            if (element.nodeName.toUpperCase() == "TEXTAREA") {
                element.addEventListener("keyup", function () {
                    testInputText(element);
                });
                element.addEventListener("blur", function () {
                    testInputText(element);
                });
            }
            if (element.nodeName.toUpperCase() == "SELECT") {
                element.addEventListener('change', function () {
                    testInputSelect(element);
                });
            }
        });
    }
    };

    const formSubmit = function () {
        for (let i = 0; i < options.form.length; i++) {
            options.form[i].addEventListener('submit', function(e) {
            e.preventDefault();

            let validated = true;
            const elements = options.form[i].querySelectorAll(':scope [required]');

            [].forEach.call(elements, function (element) {
                if (element.nodeName.toUpperCase() == 'INPUT') {
                    const type = element.type.toUpperCase();

                    if (type == 'TEXT') {
                        if (!testInputText(element))
                            validated = false;
                    }
                    if (type == 'PASSWORD') {
                        if (!testInputPassword(element) || !testPasswordConfirm(element))
                            validated = false;
                    }
                    if (type == 'EMAIL') {
                        if (!testInputEmail(element))
                            validated = false;
                    }
                    if (type == 'CHECKBOX') {
                        if (!testInputCheckbox(element))
                            validated = false;
                    }
                    if (type == 'NUMBER') {
                        if (!testInputPhone(element))
                            validated = false;
                    }
                }
                if (element.nodeName.toUpperCase() == 'TEXTAREA') {
                    if (!testInputText(element))
                        validated = false;
                }
                if (element.nodeName.toUpperCase() == 'SELECT') {
                    if (!testInputSelect(element))
                        validated = false;
                }
            });

            if (validated) {
                this.submit();
            } else {
                return false;
            }
        });
    }
    };

    //public method
    const init = function (_options) {
        //transmit options to our module
        options = {
            form: _options.form || null,
            classError: _options.classError || "error"
        };

        if (options.form == null || options.form == undefined || options.form.length == 0) {
            console.warn("validateForm: Wrong form");
            return false;
        }

        //novalidate - there will be no default validation bubbles for the required elements
        for (let i = 0; i < options.form.length; i++) {
            options.form[i].setAttribute("novalidate", "novalidate");
        }

        prepareElements();
        formSubmit();
    };

    return {
        init: init
    };
})();

document.addEventListener("DOMContentLoaded", function() {
        const form = document.querySelectorAll('.form');
        for (let i = 0; i < form.length; i++) {
            validateForm.init({
                form: form
            });
        }
});
