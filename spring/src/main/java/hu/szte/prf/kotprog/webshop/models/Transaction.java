package hu.szte.prf.kotprog.webshop.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transaction {
    
    @Id
    @SequenceGenerator(name="transaction_sequence", sequenceName = "transaction_sequence",allocationSize = 1)
    @GeneratedValue(generator="transaction_sequence")
    private int id;

    private String product_id;
    private Date tr_date;
    private int osszeg;

    public Transaction() {
    }

    public Transaction(int id, String product_id, Date tr_date, int osszeg) {
        this.id = id;
        this.product_id = product_id;
        this.tr_date = tr_date;
        this.osszeg = osszeg;
    }

    public Transaction(String product_id, Date tr_date, int osszeg) {
        this.product_id = product_id;
        this.tr_date = tr_date;
        this.osszeg = osszeg;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getproduct_id() {
        return product_id;
    }

    public void setproduct_id(String product_id) {
        this.product_id = product_id;
    }

    
    public Date gettr_date() {
        return tr_date;
    }

    public void settr_date(Date tr_date) {
        this.tr_date = tr_date;
    }

    public int getOsszeg() {
        return osszeg;
    }

    public void setOsszeg(int osszeg) {
        this.osszeg = osszeg;
    }

    @Override
    public String toString() {
        return "Transaction [date=" + tr_date + ", id=" + id + ", osszeg=" + osszeg + ", product_id=" + product_id + "]";
    }

    

    
}
