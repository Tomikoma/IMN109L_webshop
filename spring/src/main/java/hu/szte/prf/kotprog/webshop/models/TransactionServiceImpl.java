package hu.szte.prf.kotprog.webshop.models;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl implements TransactionService{

    TransactionRepository transactionRepository;

    
    @Autowired
    public TransactionServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    public void addTransaction(Transaction transaction) {
        this.transactionRepository.save(transaction);
        
    }

    @Override
    public List<Transaction> getAllTransactions() {
        List<Transaction> transactions = this.transactionRepository.findAll();
        return transactions;
    }

    @Override
    public Transaction getTransactionById(int id) {
        Transaction transaction = this.transactionRepository.findById(id).get();
        return transaction;
    }

    @Override
    public void deleteTransactionById(int id) {
        this.transactionRepository.deleteById(id);
    }

    @Override
    public Info getInfo(String id){
        int count = this.transactionRepository.getCount(id);
        Date date = this.transactionRepository.getLastTransactionDate(id);
        int sum = this.transactionRepository.getOsszBevetel(id);
        return new Info(count,sum,date);
    }
    
}
