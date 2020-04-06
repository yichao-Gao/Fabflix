# FabflixHome
Netflix-like E-commerce website for buying movie

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
* Go to the root folder, and type `maven clean install` to install the maven-tomcat-plugin package.
* Find the backendCode.war file in the path `your path/main/java/target`, copy it.
* Log on the `localhost:8080`, start with the manager permission, deploy the war file in the `tomcat/wepapps`.
* Type the url `localhost:8080/backendCode` to start the application.

## Demonstration

![image](https://github.com/SimonZhou96/FabflixHome/blob/master/Code/src/main/materials/login.png)

![image](https://github.com/SimonZhou96/FabflixHome/blob/master/Code/src/main/materials/Loader.png)

![image](https://github.com/SimonZhou96/FabflixHome/blob/master/Code/src/main/materials/MovieList.png)


## Next Step

***Using HTTPs and reCAPTCHA***  to secure the link domain

Implement ***Load Balance (such as master-slave model)*** to scale up the Fabflix

