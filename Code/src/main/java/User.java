public class User {



    private Cart cart;
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    private final String email;
    private final String password;
    public User(String email, String password) {
        this.email = email;
        this.password = password;
        cart = new Cart();
    }



    public Cart getCart() { return cart; }
}