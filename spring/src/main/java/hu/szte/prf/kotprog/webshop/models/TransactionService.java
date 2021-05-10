package hu.szte.prf.kotprog.webshop.models;

import java.util.List;

public interface TransactionService {
    void addTransaction(Transaction transaction);
    List<Transaction> getAllTransactions();
    Transaction getTransactionById(int id);
    void deleteTransactionById(int id);
    Info getInfo(String id);

    
}
