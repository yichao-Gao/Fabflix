$(function(){
    $('form').bootstrapValidator({
        message: 'This value is not valid',
        live:'submitted',
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
                    remote:{//ajax validation.
                        // server result:{"valid",true or false}
                        url:"/backendCode/api/UserCheck",
                        message:'Username not exists',
                        delay:1000,//refresh 1s
                        type:'POST',
                        data: {
                            username: function () {
                                return {
                                    username: $('input[name="username"]').val(),
                                };
                            },
                            method: "searchUserName"//UserCheckServlet method searchUserName
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
            url: "/backendCode/api/login",
            data: form.serialize(), // serializes the form's elements.
            success: (data) =>
            {
                console.log(data);
                alert("Successfully log in!")
                window.location.href="/backendCode/movie-list.html";
            },
            error: (error) => {
                console.log(error);
                alert("Password Wrong!")
                window.location.href="/backendCode/index.html";
            }
        });

    });
});
