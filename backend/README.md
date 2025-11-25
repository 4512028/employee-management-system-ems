 
# **Employee Management System – Backend**

## **Overview**

This is the backend service for a simple **Employee Management System**, built with **NestJS** and **MySQL (Dockerized)**.
It provides APIs for:

* Employee CRUD operations
* Filtering, searching, and pagination
* Login authentication (hardcoded credentials, simple token)

---

## **Tech Stack**

* Node.js / NestJS
* MySQL 8 (via Docker)
* TypeORM
* Docker + Docker Compose
* Class-validator for DTO validation

---

## **Project Structure**

```
backend/
├─ src/
│  ├─ employees/
│  │  ├─ dto/
│  │  │  ├─ create-employee.dto.ts
│  │  │  └─ update-employee.dto.ts
│  │  ├─ entities/
│  │  │  └─ employee.entity.ts
│  │  ├─ employees.module.ts
│  │  ├─ employees.controller.ts
│  │  └─ employees.service.ts
│  ├─ auth/
│  │  ├─ auth.module.ts
│  │  ├─ auth.controller.ts
│  │  └─ auth.service.ts
│  ├─ app.module.ts
│  └─ main.ts
├─ package.json
├─ tsconfig.json
├─ Dockerfile
├─ docker-compose.yml
└─ README.md
```

---

## **Setup Instructions**

### **1. Clone Repository**

```bash
git clone <your-repo-url>
cd backend
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Start MySQL Docker Container**

```bash
docker-compose up -d
```

* MySQL runs at `localhost:3307`
* Database: `employee_db`
* Username/Password: `root/root`

### **4. Run Backend**

```bash
npm run start:dev
```

Server runs at:

```
http://localhost:3000
```

---

## **Database Seeding (Optional)**

You can seed 3 sample employees manually:

```sql
INSERT INTO employee (name, role, salary) VALUES
('Alice Johnson', 'Developer', 5000),
('Bob Smith', 'Designer', 4000),
('Charlie Brown', 'Manager', 7000);
```

Or via NestJS seed script (`ts-node src/seed.ts`).
 