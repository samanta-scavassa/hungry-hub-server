# Hungry Hub Server

[Click here to see deployed application](https://hungry-hub.adaptable.app)

## Description

Hungry Hub Server is a backend application built with Node.js and Express.js, utilizing a MongoDB database. It serves as the backend for the Hungry Hub project, providing essential functionalities for food delivery.

## MVP

The Minimum Viable Product (MVP) for Hungry Hub Server includes:

- User authentication (signup/login)
- Add addresses for users
- Update user information
- Browse restaurants and menus
- Filter restaurants by rating and categories
- Add items to cart
- Checkout process

The primary focus was to implement the food delivery flow for users.

## Backlog

In the backlog, the following features are planned:

- Add reviews for restaurants
- Create a favorite restaurants list
- Implement filtering restaurants by location
- Integrate a payment process
- Develop order tracking functionality
- Provide an order history for users

## Data Structure

The provided schemas outline the models for the data structure of the application:

1. Address Schema:

Stores user addresses.
Fields include userId, label, street, number, city, zipCode, and otherInformation.

2. Cart Schema:

Manages user carts and orders.
Fields include userId, restaurantId, orderItemDetailsId, driverId, createdOn, notificationIds, totalPrice, updatedOn, and orderStatus.

2. User Schema:

Represents user information.
Fields include fullName, email, phoneNumber, dateOfBirth, password, createdOn, updatedOn, roleId, and isActive.

3. Review Schema:

Contains user reviews for restaurants.
Fields include restaurantId, userId, rating, comment, and createdOn.

4. Restaurant Schema:

Stores information about restaurants.
Fields include name, addressId, email, phoneNumber, category, description, image, longitude, latitude, userId, createdOn, updatedOn, operatingHours, rating, reviewsId, and isActive.

5. OrderItemDetails Schema:

Manages details of items in orders.
Fields include orderId, menuItemId, and quantity.

6. Notification Schema:

Stores notifications for users.
Fields include cartId, userId, message, and createdOn.

7. Menu Schema:

Contains menu items for restaurants.
Fields include itemName, category, price, description, image, restaurantId, and ingredients.

These schemas define the structure of the MongoDB documents for respective entities in the application.

## Tasks

Priority-wise list of tasks:
1. Implement user authentication
2. Create User model and endpoints
3. Create Order model and endpoints
4. Create Restaurant model and endpoints
5. Create Menu model and endpoints
6. Create Cart model and endpoints
7. Create Address model and endpoints
8. Create Notification model and endpoints

## Links

- [Trello Link](https://trello.com/b/Iy0RYZqL/hungry-hub)
- [Slides Link](https://www.canva.com/design/DAF_I_7kmeA/ik4p4ywb3C_mUrgAvPMltQ/view?utm_content=DAF_I_7kmeA&utm_campaign=designshare&utm_medium=link&utm_source=editor)
- [Github Repository Link](https://github.com/samanta-scavassa/hungry-hub)
- [Deployment Link](https://hungry-hub.adaptable.app)
