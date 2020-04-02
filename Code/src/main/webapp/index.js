function createTable(resultData) {
    console.log("handleStarResult: populating star table from resultData");

    // Populate the star table
    // Find the empty table body by id "star_table_body"
    let movieTableBodyElement = jQuery("#movie_table_body");

    // Iterate through resultData, no more than 10 entries
    for (let i = 0; i < Math.min(10, resultData.length); i++) {
        console.log(resultData[i]);
        // Concatenate the html tags with resultData jsonObject
        let rowHTML = "";
        rowHTML += "<tr>";
        // rowHTML +=
            // "<th>" +
            // // Add a link to single-star.html with id passed with GET url parameter
            // '<a href="single-star.html?id=' + resultData[i]['movie_id'] + '">'
            // + resultData[i]["movie_name"] +     // display star_name for the link text
            // '</a>' +
            // "</th>";
        rowHTML += "<th>" + resultData[i]["movie_id"] + "</th>";
        rowHTML += "<th>" + resultData[i]["movie_name"] + "</th>";
        rowHTML += "<th>" + resultData[i]["movie_year"] + "</th>";
        rowHTML += "<th>" + resultData[i]["movie_director"] + "</th>";
        rowHTML += "</tr>";

        // Append the row created to the table body, which will refresh the page
        movieTableBodyElement.append(rowHTML);
    }
}

jQuery.ajax({
    url: '/api/movie',
    type: 'GET',
    dataType: 'json',
    success: (resultData) => createTable(resultData),
    error: (error) => {console.log(error)}
});