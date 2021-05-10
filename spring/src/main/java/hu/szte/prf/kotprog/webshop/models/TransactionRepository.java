package hu.szte.prf.kotprog.webshop.models;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    @Query(nativeQuery = true, value = "SELECT COUNT(id) FROM transactions WHERE product_id = ?1")
    int getCount(String id);

    @Query(nativeQuery = true, value = "SELECT tr_date FROM transactions WHERE product_id = ?1 order by tr_date desc, id desc LIMIT 1")
    Date getLastTransactionDate(String id);

    @Query(nativeQuery = true, value = "SELECT SUM(osszeg) FROM transactions WHERE product_id = ?1")
    int getOsszBevetel(String id);
    
}
