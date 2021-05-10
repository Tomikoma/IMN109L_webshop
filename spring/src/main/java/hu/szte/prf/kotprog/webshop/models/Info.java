package hu.szte.prf.kotprog.webshop.models;

import java.util.Date;

public class Info {

    private int db;
    private int bevetel;
    private Date last;
    public Info() {
    }
    public Info(int db, int bevetel, Date last) {
        this.db = db;
        this.bevetel = bevetel;
        this.last = last;
    }
    public int getDb() {
        return db;
    }
    public void setDb(int db) {
        this.db = db;
    }
    public int getBevetel() {
        return bevetel;
    }
    public void setBevetel(int bevetel) {
        this.bevetel = bevetel;
    }
    public Date getLast() {
        return last;
    }
    public void setLast(Date last) {
        this.last = last;
    }

    
}
