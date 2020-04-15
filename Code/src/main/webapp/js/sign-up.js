
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
                    },
                    stringLength: {
                        min:6,
                        max:18,
                        message:'Username length must be between 6-18!'
                    },
                    threshold:2, //send ajax request when length >2
                    remote:{//ajax validation.
                        // server result:{"valid",true or false}
                        url:"/backendCode/api/UserCheck",
                        message:'Username exists, type again',
                        delay:1000,//refresh 1s
                        type:'POST',
                        data: {
                            username: function () {
                                return {
                                    username: $('input[name="username"]').val(),
                                };
                            },
                            method: "checkUserName"//UserCheckServlet method checkUserName
                        }
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
                    },
                    threshold:2, //send ajax request when length >2
                    remote:{//ajax validation. server result:{"valid",true or false}
                        url:"/backendCode/api/UserCheck",
                        message:'Email used, type again',
                        delay:1000,//refresh 1s
                        type:'POST',
                        data: {
                            email: function() {
                                return {
                                    email: $('input[name="email"]').val(),
                                };
                            },
                            method: "checkEmail"//UserCheckServlet method checkEmail
                        }
                    }
                }
            },
            password:{
                message:'Message Validation Fail',
                validators:{
                    notEmpty:{
                        message:'Password cannot be empty!'
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

        }
    }).on("success.form.bv",function(e) {
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
});
