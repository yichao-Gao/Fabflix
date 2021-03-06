/**
 * This example is following frontend and backend separation.
 *
 * Before this .js is loaded, the html skeleton is created.
 *
 * This .js performs three steps:
 *      1. Get parameter from request URL so it know which id to look for
 *      2. Use jQuery to talk to backend API to get the json data.
 *      3. Populate the data to correct html elements.
 */


/**
 * Retrieve parameter from request URL, matching by parameter name
 * @param target String
 * @returns {*}
 */
function getParameterByName(target) {
    // Get request URL
    let url = window.location.href;
    // Encode target parameter name to url encoding
    target = target.replace(/[\[\]]/g, "\\$&");

    // Ues regular expression to find matched parameter value
    let regex = new RegExp("[?&]" + target + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';

    // Return the decoded parameter value
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * Handles the data returned by the API, read the jsonObject and populate data into html elements
 * @param resultData jsonObject
 */

/**
 jsonObject.addProperty("star_id", starId);
 jsonObject.addProperty("star_name", starName);
 jsonObject.addProperty("star_birth", starDob);
 jsonObject.addProperty("movie_id", movieId);
 jsonObject.addProperty("movie_title", movieTitle);
 jsonObject.addProperty("movie_year", movieYear);
 jsonObject.addProperty("movie_director", movieDirector);
 * **/
function handleResult(resultData) {

    console.log("handleResult: populating star info from resultData");
    console.log(resultData);
    // populate the star info h3
    // find the empty h3 body by id "star_info"
    let starInfoElement = jQuery("#movie_info");

    // append two html <p> created to the h3 body, which will refresh the page
    starInfoElement.append("<p>Movie Name: " + resultData[0]["movie_title"] + "</p>");

    console.log("handleResult: populating movie table from resultData");

    // Populate the star table
    // Find the empty table body by id "movie_table_body"
    let movieTableBodyElement = jQuery("#single-movie-body");

    // Concatenate the html tags with resultData jsonObject to create table rows
    for (let i = 0; i < resultData.length; i++) {
        let rowHTML = "";
        rowHTML+="<div class='row'>";
        rowHTML+="<div class=\"col-md-6\">";
        rowHTML+='<h1><a href="/backendCode/single-movie.html?id=' + resultData[i]['movie_id'] + '">'
            + resultData[i]["movie_title"] +     // display star_name for the link text
            '</a></h1>';
        // start to add list of stars
        let index = i;
        let movie_title = resultData[i]["movie_title"];
        while (index < resultData.length && resultData[index]["movie_title"] === movie_title) {

            rowHTML+='<div><a href="/backendCode/single-star.html?id=' + resultData[index]['star_id'] + '">'
                + resultData[index]["star_name"] +     // display star_name for the link text
                '</a></div>';
            index++;
        }
        rowHTML+="</div>";
        rowHTML+="<div class=\"col-md-5\">";
        rowHTML += "<h1>" + resultData[i]["movie_rating"] + "  " + resultData[i]["movie_director"]+ "</h1>";
        rowHTML += "<h3>" + resultData[i]["movie_year"] + "</h3>";

        rowHTML+="<button class=\"btn btn-primary\" href=\"#\">Add To Cart</button>";
        rowHTML+="</div>";
        rowHTML+="</div>";
        rowHTML+="<hr>";
        // Append the row created to the table body, which will refresh the page
        movieTableBodyElement.append(rowHTML);
        i = index;
    }
}

/**
 * Once this .js is loaded, following scripts will be executed by the browser\
 */

// Get id from URL
let movieId = getParameterByName('id');

// Makes the HTTP GET request and registers on success callback function handleResult
jQuery.ajax({
    dataType: "json",  // Setting return data type
    method: "GET",// Setting request method
    cache:false,
    url: "/backendCode/api/single-movie?id=" + movieId, // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleResult(resultData), // Setting callback function to handle data returned successfully by the SingleStarServlet
    error: (error) => {console.log(error)}
});