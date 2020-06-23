## Тестовое здание от proIT ## 

## Для того, чтобы запустить backend часть приложения, необходимо: ##

* Создать базу данных в PostgreSQL
* В папке backend-proIt-test/src/main/resources в файлe **application.properties** сконфигурировать datasource:
  * Ввести spring.datasource.url
  * Ввести spring.datasource.username
  * Ввести spring.datasource.password
 * В папке backend-proIt-test выполнить команду `mvn generate-sources -P jooq`
 * В папке backend-proIt-test собрать проект, выполнив команду `mvn package`
 * После успешной сборки, в папке  backend-proIt-test/target для запуска проекта выполнить команду               
 `java -jar backend-proIt-test-1.0-SNAPSHOT.jar`      


 ## Для того, чтобы запустить frontend часть приложения, необходимо: ##
 
 * Установить зависимости, выполнив команду `npm install` в папке frontend-proit-test
 * Запустить приложение, выполнив команду `npm start`

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)
