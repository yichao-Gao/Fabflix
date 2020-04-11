import java.util.HashMap;
import java.util.Map;

public class Cart {
    static class Node {
        private int quantity;
        private double unitPrice;
        public Node(int quantity, double unitPrice) {
            this.quantity = quantity;
            this.unitPrice = unitPrice;
        }
        public Node(int quantity){
            this.quantity = quantity;
            this.unitPrice = 15.99;
        }

        public double getUnitPrice() {
            return unitPrice;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public void setUnitPrice(double unitPrice) {
            this.unitPrice = unitPrice;
        }
    }
    // a map that can map the movie id with its quantity
    Map<String, Node> movieQuantity;
    public Cart() { movieQuantity = new HashMap<>();
    }

}
