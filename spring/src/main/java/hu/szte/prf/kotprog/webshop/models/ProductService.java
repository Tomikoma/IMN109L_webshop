package hu.szte.prf.kotprog.webshop.models;

import java.util.List;

public interface ProductService {
    void addProduct(Product product);
    List<Product> getAllProducts();
    Product getProductById(String id);
    Product getProductByName(String name);
    void deleteProductById(String id);
    void deleteProductByName(String name);
    
}
