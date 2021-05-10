package hu.szte.prf.kotprog.webshop.models;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    ProductRepository productRepository;

    
    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void addProduct(Product product) {
        this.productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        List<Product> list = this.productRepository.findAll();
        return list;
    }

    @Override
    public Product getProductById(String id) {
        Product product = this.productRepository.findById(id);
        return product;
    }

    @Override
    public Product getProductByName(String name) {
        Product product = this.productRepository.findByName(name);
        return product;
    }

    @Override
    public void deleteProductById(String id) {
        this.productRepository.deleteById(id);
        
    }

    @Override
    public void deleteProductByName(String name) {
        this.productRepository.deleteByName(name);
        
    }
    
}
