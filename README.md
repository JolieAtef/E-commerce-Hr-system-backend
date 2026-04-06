# E-Commerce HR System Backend

A comprehensive Node.js backend API that combines e-commerce functionality with HR management system. This system handles product management, user authentication, order processing, and staff management with real-time notifications.

## Features

- **E-commerce**: Product catalog, categories, shopping cart, order management
- **User Management**: Authentication, profile management, email verification
- **HR System**: Staff management, attendance tracking, salary calculations, deductions
- **Real-time Notifications**: Socket.io integration for live offers and updates
- **File Uploads**: ImageKit integration for product images and user avatars
- **Security**: JWT authentication, role-based access control, data validation

##  Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- ImageKit account (for file uploads)
- SMTP service (for email notifications)

##  API Documentation

### Authentication Endpoints
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/verify-email/:token` - Email verification
- `POST /api/v1/auth/resend-verification` - Resend verification email
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password/:token` - Reset password
- `POST /api/v1/auth/new-access-token` - Refresh access token

### User Management
- `POST /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile
- `DELETE /api/v1/users/profile` - Soft delete user profile
- `POST /api/v1/users/upload-avatar` - Upload user avatar

### Category Management (Admin)
- `POST /api/v1/categories` - Create category
- `PUT /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Soft delete category
- `GET /api/v1/categories` - Get all categories
- `GET /api/v1/categories/active` - Get active categories
- `GET /api/v1/categories/:id/subcategories` - Get subcategories by category

### Subcategory Management (Admin)
- `POST /api/v1/subcategories` - Create subcategory
- `PUT /api/v1/subcategories/:id` - Update subcategory
- `DELETE /api/v1/subcategories/:id` - Soft delete subcategory
- `GET /api/v1/subcategories/:id` - Get subcategory details

### Product Management
**Admin Endpoints:**
- `POST /api/v1/admin/products` - Add product
- `PUT /api/v1/admin/products/:id` - Update product
- `DELETE /api/v1/admin/products/:id` - Soft delete product
- `PATCH /api/v1/admin/products/:id/stock` - Update stock quantity

**Public Endpoints:**
- `GET /api/v1/products` - Get active products
- `GET /api/v1/products/:id` - Get product details
- `GET /api/v1/products/category/:categoryId` - Get products by category
- `GET /api/v1/products/subcategory/:subcategoryId` - Get products by subcategory

### Shopping Cart
- `POST /api/v1/cart` - Add item to cart
- `GET /api/v1/cart` - Get user cart
- `PUT /api/v1/cart/:productId` - Update item quantity
- `DELETE /api/v1/cart/:productId` - Remove item from cart
- `DELETE /api/v1/cart` - Clear cart

### Order Management
**User Endpoints:**
- `POST /api/v1/orders/checkout` - Checkout order
- `GET /api/v1/orders` - Get user orders
- `GET /api/v1/orders/:id` - Get order details

**Admin Endpoints:**
- `GET /api/v1/admin/orders` - Get all orders
- `PATCH /api/v1/admin/orders/:id/status` - Update order status

### Staff Management (Admin)
- `POST /api/v1/admin/staff` - Add staff member
- `GET /api/v1/admin/staff` - Get all staff
- `GET /api/v1/admin/staff/:id` - Get staff details
- `PUT /api/v1/admin/staff/:id` - Update staff
- `DELETE /api/v1/admin/staff/:id` - Soft delete staff

### Attendance Management (Staff)
- `POST /api/v1/staff/checkin` - Check in
- `POST /api/v1/staff/checkout` - Check out

### Salary Management (Admin)
- `GET /api/v1/admin/staff/:id/salary/:month` - Calculate salary
- `POST /api/v1/admin/staff/:id/salary/:month/pay` - Pay salary
- `PUT /api/v1/admin/staff/:id/salary/:month/adjust` - Adjust salary/bonus

### Deduction Management (Admin)
- `POST /api/v1/admin/staff/:id/deductions` - Add deduction
- `GET /api/v1/admin/staff/:id/deductions` - Get staff deductions
- `PUT /api/v1/admin/staff/:id/deductions/:deductionId` - Update deduction
- `DELETE /api/v1/admin/staff/:id/deductions/:deductionId` - Delete deduction

## Socket.io Events

### Connection Events
- `connection` - Client connects to server
- `disconnect` - Client disconnects from server

### Authentication
- **Client → Server**: `authenticate(role, token)`
  - Authenticates user with role ("user" or "admin") and JWT token
- **Server Response**: Joins "Authenticated" room if successful

### Notifications
- **Client → Server**: `send_offer(notification)`
  - Admin sends promotional offers
  - `notification` object: `{type, title, message, discountCode, expiresAt}`
- **Server → Client**: `receive_offer(offers)`
  - Broadcasts offers to all authenticated users


### Role-based Access Control
- **User**: Can manage profile, cart, orders
- **Admin**: Full access to all endpoints
- **Staff**: Can manage attendance only

## Database Models

The application uses MongoDB with the following models:
- User (authentication, profiles)
- Category & Subcategory (product categorization)
- Product (inventory management)
- Cart & Order (e-commerce transactions)
- Staff (HR management)
- Attendance (time tracking)
- Salary & Deduction (payroll)
- Message (notifications)

##  Dependencies

Key dependencies include:
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **socket.io**: Real-time communication
- **jsonwebtoken**: Authentication
- **bcrypt**: Password hashing
- **joi**: Data validation
- **multer**: File uploads
- **imagekit**: Image management
- **nodemailer**: Email services
- **winston**: Logging
- **cors**: Cross-origin resource sharing

## Getting Started

1. Ensure MongoDB is running
2. Configure environment variables
3. Run `npm start`
4. The API will be available at `http://localhost:3000`
5. Socket.io will be available at `http://localhost:3500`

