
// function checkPassword(password, passwordConfirm)
// {
//         if (password.value != passwordConfirm.value)
//         {
//             alert("Passwords are different!");
//         }
// };

// function isEmpty(formFields)
// {
//     var formFields = document.querySelectorAll("#register_form_fields .field input");
//     for (i = 0; i < formFields.length; i++)
//     {
//         if (formFields[i].value == "")
//         {
//             alert("This field is empty!");
//         }
//     }
// };

// function isChoosen(location)
// {
//     if (location[0].value = "Location")
//         alert("Please choose some option!");
// };

// function isChecked(checkbox)
// {
//     if (checkbox.checked == false)
//         alert("You don't check this checkbox!");
// };

// window.onload = function()
// {

//     var formFields = document.querySelectorAll("#register_form_fields .field input");

//     var username = document.getElementById("username_register_form");
//     var password = document.getElementById("password_register_form");
//     var passwordConfirm = document.getElementById("confirm_password_register_form");
//     var email = document.getElementById("email_register_form");
//     var location = document.querySelectorAll(".location option");
//     var checkbox = document.getElementById("register-checkbox");

//     var registerFormButton = document.getElementById("register_form_btn");

//     registerFormButton.onclick = function() 
//     {
//         isEmpty(formFields);
//         checkPassword(password, passwordConfirm);
//         isChoosen(location);
//         isChecked(checkbox);
//     };

// }

const validateForm = (function()
{
    //private properties
    const options = {};
    const classError = 'error';

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
        if (select.options[select.selectedIndex].value == '' || select.options[select.selectedIndex].value == '-1') {
            showFieldValidation(select, false);
            return false;
        } else {
            showFieldValidation(select, true);
            return true;
        }
    };

    const testInputCheckbox = function (input) {
        const name = input.getAttribute('name');
        const group = input.form.querySelectorAll(':scope input[name="' + name + '"]:checked');

        if (group.length) {
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
                        testInputText(element)
                    });
                    element.addEventListener("blur", function () {
                        testInputText(element)
                    });
                }
                if (type == "EMAIL") {
                    element.addEventListener("keyup", function () {
                        testInputEmail(element)
                    });
                    element.addEventListener("blur", function () {
                        testInputEmail(element)
                    });
                }
                if (type == "CHECKBOX") {
                    element.addEventListener("click", function () {
                        testInputCheckbox(element)
                    });
                }
            }
            if (element.nodeName.toUpperCase() == "TEXTAREA") {
                element.addEventListener("keyup", function () {
                    testInputText(element)
                });
                element.addEventListener("blur", function () {
                    testInputText(element)
                });
            }
            if (element.nodeName.toUpperCase() == "SELECT") {
                element.addEventListener('change', function () {
                    testInputSelect(element)
                });
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
    }
    return {
        init: init
    }
})();

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.form');
    validateForm.init({
        form: form
    })
});