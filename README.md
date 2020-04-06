# FabflixHome
Netflix-like E-commerce website for buying movie
# Yichao Gao's branch
## Environment

### Backend
***Java servet*** serves as backend, in order to modulize the back-end code using microservices architecture.

***HTML/CSS, Javascript, BootStrap and Jquery*** together to give the powerful front-end.

## Functionalities

[//]: # "Write [x] to mark off what was accomplished.<br/>"

The following **required** functionality is complete:

* [x] Login Page + Session Store
* [x] Movie-list, Single-movie, Single-star Page
* [x] Fuzzy search of the movie, sort and projection function of the movie genres
* [x] Cart based on the session information of the user
* [ ] Check out function using Alipay
* [ ] Load balance
* [ ] HTTPs and reCAPTCHA

  
## How to start
* Git clone the code into the desktop using `Git clone https://github.com/SimonZhou96/FabflixHome.git`.
* If you are using Intellij, just open Intellij, Click on `import project`, choose the root path of the projects you just cloned, and click on `next` all the way down.
* Go to the root folder which contains the `pom.xml`, and type `maven clean install` to install the maven-tomcat package.
* To run the application, type `mvn tomcat7:run`, and then open your favorite browser, type `localhost:8080/backendCode`
* Then the project will start

## Demonstration

![image](https://github.com/SimonZhou96/FabflixHome/blob/master/Code/src/main/materials/login.png)

![image](https://github.com/SimonZhou96/FabflixHome/blob/master/Code/src/main/materials/Loader.png)

![image](https://github.com/SimonZhou96/FabflixHome/blob/master/Code/src/main/materials/MovieList.png)


## Next Step

***Using HTTPs and reCAPTCHA***  to secure the link domain

Implement ***Load Balance (such as master-slave model)*** to scale up the Fabflix

