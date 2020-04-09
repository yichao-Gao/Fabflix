import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Random;

@WebServlet(name = "CheckoutServlet", urlPatterns = {"/api/checkout"})
public class CheckoutServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        User user = (User)request.getSession().getAttribute("user");
        if (user == null) {
            System.out.println("the user hasn't been logged in!");
            return;
        }
        System.out.println(request.getRequestURI());
        Cart cart = user.getCart();
        PrintWriter out = response.getWriter();
        JsonArray jsonArray = new JsonArray();
        Random random = new Random();
        try {
            for (String key : cart.movieQuantity.keySet()) {
                String query = "select distinct title from movies where id='" + key + "'";
                Connection connection = DBconnection.getDBconnection();

                JsonObject jsonObject = new JsonObject();
                PreparedStatement preparedStatement = connection.prepareStatement(query);
                ResultSet resultSet = preparedStatement.executeQuery();
                resultSet.next();
                String movieTitle = resultSet.getString("title");
                int quantity = cart.movieQuantity.get(key).getQuantity();
                double price = cart.movieQuantity.get(key).getUnitPrice();
                jsonObject.addProperty("id", key);
                jsonObject.addProperty("title", movieTitle);
                jsonObject.addProperty("quantity", quantity);
                jsonObject.addProperty("price", price);
                jsonArray.add(jsonObject);
            }
            out.write(jsonArray.toString());
            response.setStatus(200);
        } catch (SQLException | NamingException e) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("errorMessage", e.getMessage());
            out.write(jsonObject.toString());
            response.setStatus(500);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

    }
}
