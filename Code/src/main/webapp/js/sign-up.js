
$(function(){
    $('form').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid:'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            username:{
                message: 'Username Validation Fail',
                validators:{
                    notEmpty:{
                        message:'Username cannot be empty!'
                    }
                }
            },
            email:{
                validators:{
                    notEmpty: {
                        message:'Email cannot be empty!'
                    },
                    emailAddress:{
                        message:'Wrong Email Syntax!'
                    }
                }
            },
            password:{
                message:'Message Validation Fail',
                validators:{
                    notEmpty:{
                        message:'Password cannot be empty1'
                    },
                    stringLength:{
                        min:6,
                        max:18,
                        message:'Password Length must be between 6-18!'
                    },
                    regexp:{
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message:'Password can only contain A-Z,a-z,number 0-9 and _'
                    }
                }
            },
            submitHandler: function (validator, form, submitButton) {
                alert("submit");
            }
        }
    });
});
$("#signupForm").submit(function(e) {
    console.log("hi");
    e.preventDefault(); // avoid to execute the actual submit of the form.

    const form = $(this);
    console.log(form);
    $.ajax({
        type: "POST",
        url: "/backendCode/api/signup",
        data: form.serialize(), // serializes the form's elements.
        success: (data) =>
        {
            console.log(data);
            alert("Successfully Sign Up!")
            window.location.href="/backendCode/index.html";
        },
        error: (error) => {
            console.log(error);
        }
    });


});