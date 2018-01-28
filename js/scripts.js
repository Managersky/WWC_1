
function checkPassword(password, passwordConfirm)
{
        if (password.value != passwordConfirm.value)
        {
            alert("Passwords are different!");
        }
};

function isEmpty(formFields)
{
    var formFields = document.querySelectorAll("#register_form_fields .field input");
    for (i = 0; i < formFields.length; i++)
    {
        if (formFields[i].value == "")
        {
            alert("This field is empty!");
        }
    }
};

function isChoosen(location)
{
    if (location[0].value = "Location")
        alert("Please choose some option!");
};

function isChecked(checkbox)
{
    if (checkbox.checked == false)
        alert("You don't check this checkbox!");
};

window.onload = function()
{
    var formFields = document.querySelectorAll("#register_form_fields .field input");

    var username = document.getElementById("username_register_form");
    var password = document.getElementById("password_register_form");
    var passwordConfirm = document.getElementById("confirm_password_register_form");
    var email = document.getElementById("email_register_form");
    var location = document.querySelectorAll(".location option");
    var checkbox = document.getElementById("register-checkbox");

    var registerFormButton = document.getElementById("register_form_btn");

    registerFormButton.onclick = function() 
    {
        isEmpty(formFields);
        checkPassword(password, passwordConfirm);
        isChoosen(location);
        isChecked(checkbox);
    };

}
