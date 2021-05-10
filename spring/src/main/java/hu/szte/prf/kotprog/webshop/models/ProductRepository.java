package hu.szte.prf.kotprog.webshop.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    
    @Query(value = "SELECT * FROM products WHERE name = ?1", nativeQuery = true)
    Product findByName(String name);

    @Query(value = "SELECT * FROM products WHERE id = ?1", nativeQuery = true)
    Product findById(String id);

    @Query(value = "DELETE FROM products WHERE name = ?1", nativeQuery = true)
    void deleteByName(String name);

    @Query(value = "DELETE FROM products WHERE id = ?1", nativeQuery = true)
    void deleteById(String id);
}
