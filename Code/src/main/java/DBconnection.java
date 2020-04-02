import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

public class DBconnection {
    private static Connection DBconnection = null;
    private DBconnection(){}

    public static Connection getdBconnection() {
        if (DBconnection == null) {
            try {
                Class.forName("com."+Constants.dbtype+".jdbc.Driver").newInstance();
                DBconnection = DriverManager.getConnection("jdbc:"+Constants.dbtype+":///"+Constants.dbname+"?autoReconnect=true&useSSL=false",
                        Constants.user, Constants.password);
            } catch (InstantiationException | SQLException | ClassNotFoundException | IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return DBconnection;
    }

    // public void executeQuery(String query) {
    //     // Retrieve parameter id from url request.
    //     // Output stream to STDOUT
    //     try  {
    //         Connection dbcon = getdBconnection();
    //         // Declare our statement
    //         PreparedStatement statement = dbcon.prepareStatement(query);

    //         // Set the parameter represented by "?" in the query to the id we get from url,
    //         // num 1 indicates the first "?" in the query
    //         // Perform the query
    //         ResultSet rs = statement.executeQuery();

    //         JsonArray jsonArray = new JsonArray();
    //         Map<String, MovieInfo> movieInfoMap = new HashMap<>();
    //         // Iterate through each row of rs
    //         while (rs.next()) {
    //             String movie_id = rs.getString("id");
    //             String movie_title = rs.getString("title");
    //             String movie_year = rs.getString("year");
    //             String movie_genres = rs.getString("genres");
    //             String movie_star = rs.getString("stars");
    //             String movie_director = rs.getString("director");
    //             String movie_popularity = rs.getString("popularity");

    //             movieInfoMap.putIfAbsent(movie_title, new MovieInfo(movie_id, movie_year, movie_title, movie_popularity, movie_director));

    //             movieInfoMap.get(movie_title).getStarsList().add(movie_star);
    //             movieInfoMap.get(movie_title).getGenresList().add(movie_genres);
    //         }

    //         for (String key: movieInfoMap.keySet()) {
    //             // Create a JsonObject based on the data we retrieve from rs
    //             JsonObject jsonObject = new JsonObject();
    //             MovieInfo movieInfo = movieInfoMap.get(key);

    //             String movie_id = movieInfo.id;
    //             String movie_title = key;
    //             String movie_year = movieInfo.year;
    //             String movie_director = movieInfo.director;
    //             String movie_genres = "";
    //             for (String genre: movieInfo.genresName) movie_genres += genre + ",";
    //             String movie_star = "";
    //             for (String star: movieInfo.starsName) movie_star += star + ",";
    //             movie_genres = movie_genres.substring(0, movie_genres.length() - 1);
    //             movie_star = movie_star.substring(0, movie_star.length() - 1);

    //             String movie_popularity = movieInfo.popularity;

    //             jsonObject.addProperty("movie_id", movie_id);
    //             jsonObject.addProperty("movie_title", movie_title);
    //             jsonObject.addProperty("movie_year", movie_year);
    //             jsonObject.addProperty("movie_director", movie_director);
    //             jsonObject.addProperty("movie_genres", movie_genres);
    //             jsonObject.addProperty("movie_star", movie_star);
    //             jsonObject.addProperty("movie_popularity", movie_popularity);

    //             jsonArray.add(jsonObject);
    //         }
    //         // write JSON string to output
    //         statement.close();
    //         dbcon.close();
    //     } catch (Exception e) {
    //         JsonObject jsonObject = new JsonObject();
    //         jsonObject.addProperty("errorMessage", e.getMessage());
    //     }
    // }
    public static void main(String args[]) throws SQLException {
        int topMovieNum = 20;
        String query = "SELECT m.id, m.title, m.year, m.director as director, g.name as genres, s.name as stars, r.rating as popularity from stars as s, stars_in_movies as sim, movies as m, " +
                "genres as g, genres_in_movies as gim, " +
                "(select * from ratings order by rating DESC limit "+topMovieNum+") as r " +
                "where m.id = sim.movieId " +
                "and sim.starId = s.id " +
                "and m.id = gim.movieId " +
                "and gim.genreId = g.id " +
                "and r.movieId = m.id ";
        // new DBconnection().executeQuery(query);
    }
}
