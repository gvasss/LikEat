![image](https://github.com/user-attachments/assets/e471758f-6f67-49b7-9e86-2270f9a05089)
  
We created the LikEat restaurant review website. Visually we have been inspired by the e-table page. While the code for the backend is written in Spring-boot and the code for the frontend in React. 

Basically in the app there are 3 different users customer, client and admin with different permissions each. The customer can view all the restaurants listed on the website with the ability to rate each one, and can search for one through the various filters available. The client has the ability to create a restaurant on the website, but until it is approved by an admin it will not be accessible by the customer. Still he can like the customer can view and search for a restaurant without being able to rate it. The admin is responsible for the proper functioning of the website. He can view and search for a restaurant without being able to rate it, view all users with the ability to delete them if deemed appropriate, add other admins and even view and delete all restaurants he has approved as well as specific reviews. Finally, he has the possibility to reject the inclusion of a restaurant on the website if it does not meet the necessary criteria.



!!! in fullstack-front/.../pages/RestaurantDetail.js:95 user must put a Google API Key !!!



Likeat - Restaurant Evaluation Platform
Likeat is a web application designed to allow users to manage, evaluate, and review restaurants. Built with a Java Spring Boot backend and a React-based frontend, the platform offers a smooth and responsive user experience. Restaurant owners can manage their listings, customers can leave reviews, and admins oversee all operations. A fair ranking algorithm ensures unbiased restaurant ratings.

Table of Contents
Features
Requirements
Installation
Usage
Features
Restaurant Management: Restaurant owners can register, edit, and delete their restaurant listings.
User Roles: Supports three types of users: restaurant owners, customers, and admins.
Restaurant Reviews: Customers can leave reviews and rate restaurants.
Fair Ranking Algorithm: A custom algorithm ensures that restaurant rankings are unbiased and fair, providing an accurate reflection of user reviews.
Admin Control: Admins have full control over the system, including user management and restaurant approval.
Responsive Frontend: The frontend is designed with React to ensure a responsive, user-friendly experience.
Requirements
Backend (Java-based)
Java 11 or higher
Maven 3.6.0+
A relational database (MySQL, PostgreSQL, etc.)
Frontend (React-based)
Node.js 14.x or higher
npm 6.x or higher
Installation
Backend Setup
Clone this repository to your local machine:

git clone https://github.com/your-username/likeat.git
Navigate to the backend-likeat directory:

cd Likeat/backend-likeat
Build the project using Maven:

mvn clean install
Run the application:

mvn spring-boot:run
Frontend Setup
Navigate to the frontend-likeat directory:

cd Likeat/frontend-likeat
Install the necessary dependencies:

npm install
Start the React development server:

npm start
Usage
Access the backend API by navigating to http://localhost:8080 once the Spring Boot application is running.
Access the frontend by navigating to http://localhost:3000.
Admin users can log in to manage restaurants, reviews, and users.
Restaurant owners can register their restaurants and manage their profiles.
Customers can browse restaurants, add reviews, and view others' feedback.
