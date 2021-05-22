package hu.szte.prf.kotprog.webshop.controllers;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.szte.prf.kotprog.webshop.models.Info;
import hu.szte.prf.kotprog.webshop.models.Product;
import hu.szte.prf.kotprog.webshop.models.ProductService;
import hu.szte.prf.kotprog.webshop.models.Transaction;
import hu.szte.prf.kotprog.webshop.models.TransactionService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;





@RestController
@RequestMapping
public class Controller {

    ProductService productService;
    TransactionService transactionService;

    @Autowired
    public Controller(ProductService productService, TransactionService transactionService) {
        this.productService = productService;
        this.transactionService = transactionService;
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        try {
            return this.productService.getAllProducts();
        } catch (Exception e) {
            System.err.println(e);
            return null;
        }
    }

    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions() {
        try {
            return this.transactionService.getAllTransactions();
        } catch (Exception e) {
            System.err.println(e);
            return null;
        }
    }

    @GetMapping(path="/product/name/{name}", produces = "application/json")
    public Product getProductByName(@PathVariable String name) {
        try {
            Product product =  this.productService.getProductByName(name);
            return product;
        } catch (Exception e) {
            System.err.println(e);
            return null;
        }
    }

    @GetMapping(path="/product/id/{id}", produces = "application/json")
    public Product getProductById(@PathVariable String id) {
        try {
            Product product =  this.productService.getProductById(id);
            return product;
        } catch (Exception e) {
            System.err.println(e);
            return null;
        }
    }

    @GetMapping(path="/transaction/{id}", produces = "application/json")
    public Transaction getTransaction(@PathVariable int id) {
        try {
            Transaction transaction =  this.transactionService.getTransactionById(id);
            return transaction;
        } catch (Exception e) {
            System.err.println(e);
            return null;
        }
    }


    @CrossOrigin(origins = {"http://localhost:4200", "https://imn109l-webshop.herokuapp.com"}, allowCredentials = "true")
    @PostMapping(path="/api/product/buy", produces = "application/json")
    public Map<String,String> buy(@RequestBody Product product){
        try {
            Product p = productService.getProductById(product.getId());
            if (p == null){
                this.productService.addProduct(product);
            }
            Transaction transaction = new Transaction(product.getId(), new Date(), product.getPrice());
            this.transactionService.addTransaction(transaction);
            return Collections.singletonMap("message", "A tranzakció sikeres volt!");
        } catch (Exception e){
            System.err.println(e);
            return Collections.singletonMap("message", "A tranzakció nem volt sikeres!");
        }
    }

    @GetMapping(path = "/api/info/{id}", produces = "application/json")
    public Info getInfo(@PathVariable String id) {
        try{
            return this.transactionService.getInfo(id);
        } catch (Exception e) {
            System.err.println(e);
            return null;
        }
    }
    
    
    

    
    
}
