# 🧑‍💼 Employee Management CRUD App

A full-stack **Employee Management System** where you can create, read, update, and delete employee records.

Built with:
- ⚛️ React + Chakra UI + React Query
- 🧠 Express.js + PostgreSQL

---

## 🚀 Features

- ➕ Add new employees
- 👁️ View a table of employees
- ✏️ Edit employee details
- ❌ Delete employees
- 🌗 Toggle dark/light mode

---

## 🧩 Tech Stack

| Frontend        | Backend         | Other Tools           |
|----------------|------------------|------------------------|
| React           | Express.js       | React Query            |
| Chakra UI       | PostgreSQL       | dotenv                 |
| React Icons     | Node.js          | Vite                   |
| React Hot Toast | nodemon          |                       |

---

## 📂 Folder Structure


project2/
├── Backend/ # Express backend with PostgreSQL
│ ├── controllers/
│ ├── routes/
│ ├── utils/
│ └── index.js
│
├── frontend/ # React frontend
│ ├── components/
│ │ └── ui/
│ ├── constants/
│ ├── utils/
│ └── main.jsx
│
└── README.md

yaml
Copy
Edit

---

## ⚙️ How to Run Locally

### 🖥️ 1. Clone the Repo

```bash
git clone https://github.com/your-username/project2.git
cd project2
📦 2. Set Up Backend
bash
Copy
Edit
cd Backend
npm install
Create a .env file in Backend/ and add:

env
Copy
Edit
DATABASE_URL=postgres://username:password@localhost:5432/yourdb
Then start backend:

bash
Copy
Edit
npm run dev
Backend runs on: http://localhost:3000

🌐 3. Set Up Frontend
Open another terminal:

bash
Copy
Edit
cd frontend
npm install
npm run dev
Frontend runs on: http://localhost:5173

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/employee	Get all employees
POST	/api/employee	Add new employee
PUT	/api/employee/:id	Update employee
DELETE	/api/employee/:id	Delete employee

🙌 Author
Built by Subrat