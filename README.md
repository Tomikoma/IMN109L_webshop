
# IMN109L_webshop
Programrendszerek fejlesztése kurzusra készített kötelező program.
## Fejlesztés menete

### 2021.04.22. - Projekt generálása
-	Angular és Nodejs projekt generálása (ng new és npm init)
-  Signup, Login, Error és Home komponensek generálása, hozzáadása routinghoz
### 2021.04.26. - Angular és nodejs fejlesztések 
- Header (toolbar) komponens generálása
	- Linkek elhelyezése különböző komponensekhez
- Regisztráció
	- Form elkészítése (Angular)
	- AuthService létrehozása, post kérés megírása
	- Szükséges package-k hozzáadása a nodejs projekthez (bcryptjs, mongoose stb.)
	- User modell létrehozása, restapi megírása regisztrációhoz
### 2021.05.07. - Angular és nodejs fejlesztések
-	User modell kiterjesztése (password compare)
-	Passport autentiákáció implementálása
-	Login, logout restapis implementálása
-	Http interceptor megírása
-	Login, logout komponensek kiegészítése
-	login, logout post kérések megírása
-	hibakezelő komponens generálása,implementákása
-	Termék modell implementálása
-	Restapi megírása user információk lekéréséhez, home komponens kiegészítése (user infók megjelenítése)
-	Termékhez tartozó restapik implementálása (létrehozása,módosítás,lekérés,törlés)
-	Termékhez tartozó komponensek generálása, szervíz megírása
-	Authguard implementálása
### 2021.05.10. - Spring fejlesztések
- Termék, tranzakció, info modellek implementálása
- Inicializáló szkript megírása
- Termékhez és tranzakcióhoz tartozó repository (szükséges query-kkel együtt) és szervíz implementálása
- RestController implementálása
- Angular alkalmazás összekötése Spring-gel (termék vásárlása)
### 2021.05.22. - Deploy-hoz szükséges módosítások végrehajtása
- Szerveroldali (nodejs) kód kiegészítése (dbUrl, angular app hostolása)
- Environment fájl kiegészítése a nodejs és spring szerverhez tartozó eléréssel
- Angular buildelése (ng build --prod paranccsal)
- Cors probléma megoldása (Spring - Angular/nodejs)
- Apróbb módosítások
### 2021.05.23. Fejlesztési dokumentum megírása
## A projekthez tartozó különböző URL-ek
https://imn109l-webshop.herokuapp.com - Nodejs/Angular app elérése
https://imn109l-webshop-spring.herokuapp.com  - Spring 

### Route-ok (Angular):
 /login - bejelentkezés
 /signup - regisztráció
 / - főoldal, felhasználói adatok és termékek listázása (és lehetőség a vásárlásra)
 /product/:termékneve - termékinformációk, termékkel kapcsolatos egyéb információk (admin esetén, például eddig mennyit vettek az adott termékből stb)

### Elérhető Restapik (Nodejs):
- /api/user/signup - (POST) regisztráció
- /api/user/login - (POST) bejelentkezés
- /api/user/logout - (POST, csak bejelentkezve) kijelentkezés
- /api/user/info - (GET, csak bejelentkezve) felhasználó információk
- /api/product - (POST, csak bejelentkezve adminként) új termék hozzáadása
- /api/product - (PUT, csak bejelentkezve adminként) termék módosítása név alapján
- /api/product - (GET, csak bejelentkezve) összes termék lekérdezése
- /api/product/:name - (GET, csak bejelentkezve) termék lekérdezése név alapján
- /api/product/:name - (DELETE, csak bejelentkezve adminként) termék törlése név alapján

### Elérhető Restapik (Spring)
- /products - (GET) termékek lekérdezése
- /transactions - (GET) tranzakciók lekérdezése
- /product/name/{termékneve} - (GET) termék lekérdezése név alapján
- /product/id/{id} - (GET) termék lekérdezése id alapján
- /transaction/{id} - (GET) tranzackió lekérése id alapján
- /api/product/buy - (POST) vásárlás (a kérés az angular alkalmazástól jön), tranzakció adatai bekerülnek az adatbázisba, illetve létrejön egy rekord a termékhez is, ha még nincs benne
- /api/info/{id} - (GET) vásárlási információk kérése a megadott id-het tartozó termékről (mikor vásároltak belőle utoljára, mennyit vásároltak belőle eddig, ehhez a termékhez tartozó összbevétel)

új tranzackiókor az ID generálódik, azonban új termék beszúrásakor, a mongodb-ben tárolt ID lesz használva
## Fejlesztés közben fellépő problémák
- Az autentikáció megoldása beletelt egy kis időbe, ez egyrészt egy elírásnak volt köszönhető (lemaradt egy / jel a restapi-khoz tartozó route-ok szerver-hez való kapcsoláskok), másrészt nem maradt meg a bejelentkezett állapot (pontosabban az angular app nem küldte vissza, ezt oldotta meg az allowCredentials = true)
- Heroku-ra való deploy esetén (mint említve volt) felülíródik a connection fájl a postgresql csatlakozáshoz. Egy ideig próbáltam erre megoldást keresni, de végül nem sikerült megoldani.
