
$("#login").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    console.log(form);
    $.ajax({
           type: "POST",
           url: "/backendCode/api/login",
           data: form.serialize(), // serializes the form's elements.
           success: (data) =>
           {
               console.log(data);
               window.location.href="/backendCode/movie-list.html";
           },
           error: (error) => {
               console.log(error);
           }
         });


});