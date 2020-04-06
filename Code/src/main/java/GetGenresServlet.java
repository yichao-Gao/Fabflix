import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.sql.*;

@WebServlet(name = "GetGenresServlet", urlPatterns = { "/api/getGenres" })
public class GetGenresServlet extends HttpServlet {
    /**
     * handles GET requests to add and show the item list information
     */
    @Override
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        /**
         * Get the list of genres to the selector in the movie-list.html
         */
        String query = "select distinct name from genres";
        PrintWriter out = response.getWriter();
        try {
            Connection connection = DBconnection.getDBconnection();
            // Declare our statement
            PreparedStatement statement = connection.prepareStatement(query);

            // Set the parameter represented by "?" in the query to the id we get from url,
            // num 1 indicates the first "?" in the query
            // Perform the query
            ResultSet rs = statement.executeQuery();

            JsonArray jsonArray = new JsonArray();

            while (rs.next()) {
                String genre = rs.getString("name");
                
                JsonObject jsonObject = new JsonObject();

                jsonObject.addProperty("genre", genre);

                jsonArray.add(jsonObject);
            }

            out.println(jsonArray.toString());
            response.setStatus(200);
            statement.close();
            rs.close();
        } catch (Exception e) {
            // write error message JSON object to output
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("errorMessage", e.getMessage());
            out.write(jsonObject.toString());
            // set reponse status to 500 (Internal Server Error)
            response.setStatus(500);
        } finally {
            out.close();
        }
    }
}