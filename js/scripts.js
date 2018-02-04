const validateForm = (function()
{
    //private properties
    // const options = {};
    const classError = 'error';
    var password = document.getElementById("password_register_form");
    var passwordConfirm = document.getElementById("confirm_password_register_form");

    const showFieldValidation = function (input, inputIsValid) {
        if (!inputIsValid) {
            input.parentNode.classList.add(options.classError);
        } else {
            input.parentNode.classList.remove(options.classError);
        }
    };

    const testInputText = function (input) {
        let inputIsValid = true;

        if (input.value == '') {
            inputIsValid = false;
        }

        if (inputIsValid) {
            showFieldValidation(input, true);
            return true;
        } else {
            showFieldValidation(input, false);
            return false;
        }
    };

    const testInputPassword = function (input) {
        let inputIsValid = true;

        if (input.value == '') {
            inputIsValid = false;
        }

        // if (password.value != passwordConfirm.value) {
        //     passwordConfirm.setCustomValidity("Passwords don't match");
        // } else {
        //     passwordConfirm.setCustomValidity('');
        // }

        if (inputIsValid) {
            showFieldValidation(input, true);
            return true;
        } else {
            showFieldValidation(input, false);
            return false;
        }
    };

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
        const elements = options.form.querySelectorAll(":scope [required]");

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
    };

    const formSubmit = function () {
        options.form.addEventListener('submit', function (e) {
            e.preventDefault();

            let validated = true;
            const elements = options.form.querySelectorAll(':scope [required]');

            [].forEach.call(elements, function (element) {
                if (element.nodeName.toUpperCase() == 'INPUT') {
                    const type = element.type.toUpperCase();
                    if (type == 'TEXT') {
                        if (!testInputText(element))
                            validated = false;
                    }
                    if (type == 'PASSWORD') {
                        if (!testInputPassword(element))
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
        options.form.setAttribute("novalidate", "novalidate");

        prepareElements();
        formSubmit();
    }

    return {
        init: init
    }
})();

document.addEventListener("DOMContentLoaded", function () {
        let form = document.querySelector('.form');
        validateForm.init({
            form: form
        })
});
