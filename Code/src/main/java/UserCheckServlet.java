import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.sql.*;

@WebServlet(name = "UserCheckServlet", urlPatterns = { "/api/UserCheck" })
public class UserCheckServlet extends HttpServlet {


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String method=request.getParameter("method");
        System.out.println(method);
        if("checkUserName".equals(method)){
            checkUserName(request,response);
        }
        if("checkEmail".equals(method)){
            checkEmail(request,response);
        }
        if("searchUserName".equals(method)){
            searchUserName(request,response);
        }
    }
    protected void checkUserName(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        /**
         * Get the list of genres to the selector in the movie-list.html
         */
        String jsonResult="";
        String username=request.getParameter("username");
        String query = "select * from users where userName='"+username+"';";
        System.out.println(query);
        try {
            Connection connection = DBconnection.getDBconnection();
            // Declare our statement
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();


                if (rs.next()) {
                    jsonResult = "{\"valid\":false}";
                } else {
                    jsonResult = "{\"valid\":true}";
                }

            response.setStatus(200);
            response.getWriter().write(jsonResult);
            statement.close();
            rs.close();
        } catch (Exception e) {
            // write error message JSON object to output
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("errorMessage", e.getMessage());
            // set reponse status to 500 (Internal Server Error)
            response.setStatus(500);
        }
    }
    protected void checkEmail(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        /**
         * Get the list of genres to the selector in the movie-list.html
         */
        String jsonResult="";
        String email=request.getParameter("email");
        String query = "select * from users where email='"+email+"';";
        System.out.println(query);
        try {
            Connection connection = DBconnection.getDBconnection();
            // Declare our statement
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();

                if (rs.next()) {
                    jsonResult = "{\"valid\":false}";
                } else {
                    jsonResult = "{\"valid\":true}";
                }

            response.setStatus(200);
            response.getWriter().write(jsonResult);
            statement.close();
            rs.close();
        } catch (Exception e) {
            // write error message JSON object to output
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("errorMessage", e.getMessage());
            // set reponse status to 500 (Internal Server Error)
            response.setStatus(500);
        }
    }
    protected void searchUserName(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        /**
         * Get the list of genres to the selector in the movie-list.html
         */
        String jsonResult="";
        String username=request.getParameter("username");
        String query = "select * from users where userName='"+username+"';";
        System.out.println(query);
        try {
            Connection connection = DBconnection.getDBconnection();
            // Declare our statement
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();


            if (rs.next()) {
                jsonResult = "{\"valid\":true}";
            } else {
                jsonResult = "{\"valid\":false}";
            }

            response.setStatus(200);
            response.getWriter().write(jsonResult);
            statement.close();
            rs.close();
        } catch (Exception e) {
            // write error message JSON object to output
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("errorMessage", e.getMessage());
            // set reponse status to 500 (Internal Server Error)
            response.setStatus(500);
        }
    }

}
