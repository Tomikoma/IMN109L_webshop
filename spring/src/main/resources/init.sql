DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS products;
CREATE TABLE products(id VARCHAR(255) PRIMARY KEY, name VARCHAR(255) UNIQUE, price INTEGER);

CREATE TABLE transactions(id serial PRIMARY KEY, product_id VARCHAR(255) REFERENCES products(id), tr_date DATE, osszeg INTEGER);
DROP SEQUENCE IF EXISTS transaction_sequence;
CREATE SEQUENCE transaction_sequence START 1;