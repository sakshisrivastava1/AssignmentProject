Authentication APIs
Method	      Endpoint	               Description	Access
POST	   /api/v1/auth/signup	     Register a new user (Public)
POST	   /api/v1/auth/login	     Login user & receive JWT (Public)
GET	     /api/v1/auth/logout	    To Logout current user(Protected)

Product APIs
Method	   Endpoint	                      Description	Access
POST	    /api/v1/product/add	          Add new product	Admin only
PUT	      /api/v1/product/update/:id	  Update product	Admin only
GET	     /api/v1/product/getAll	       Get all products	User/Admin
DELETE	  /api/v1/product/remove/:id	  Delete product	Admin only
GET	     /api/v1/product/getById/:id	 Get product by Id User/Admin

User API
Method	   Endpoint	                  Description	Access
GET	     /api/v1/user/current	  Get current logged-in user(protected)

Scalability & Architecture Considerations ---

This application currently follows a monolithic architecture using Node.js and Express. To scale this system for production-level traffic, the following improvements can be implemented:

1️⃣ Microservices Architecture

Separate services such as:

Authentication Service
Product Service
Image Upload Service
This allows independent scaling and better fault isolation.

2️⃣ Caching with Redis

Frequently accessed product listings can be cached using Redis to:

Reduce database load
Improve response time
Handle high read traffic efficiently

3️⃣ Load Balancing

Deploy multiple backend instances behind:
NGINX
AWS ELB
This distributes incoming traffic evenly and improves availability.

4️⃣ Database Optimization

Add indexing on frequently queried fields (e.g., product name, category).

Use connection pooling.

Implement pagination for large datasets.

5️⃣ Containerization & Orchestration

Use Docker to containerize the app and Kubernetes for:

Auto-scaling

Self-healing deployments

Efficient resource utilization

6️⃣ Security & Rate Limiting

Implement rate limiting using express-rate-limit.

Use Helmet for secure HTTP headers.

Store secrets securely using environment variables.