
$.ajax({
    url: "/backendCode/api/checkout",
    dataType: "json",
    type: "GET",
    success: (resultData) => {
        createCart(resultData);
    },
    error: (error) => console.log(error)
});