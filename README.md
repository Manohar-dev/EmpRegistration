


# EmpRegistration

## Overview
EmpRegistration is a comprehensive application designed to manage employee records efficiently. The system includes distinct pages for administrators, employees, and a welcoming interface to ensure ease of use for all users. The backend is powered by a .NET Web API for robust and scalable performance.

---

## Features

- **Administrator Page**: Manage employee records, including adding, updating, and deleting employee details.
- **Employee Page**: Employees can view and update their personal information.
- **Welcome Page**: A user-friendly welcome interface for new and existing users.
- **.NET Web API**: Provides secure and scalable backend services for the application.

---

## Screenshots

### Administrator Page
![AdministratorPage](https://github.com/Manohar-dev/EmployeeManagementSystem/assets/119424432/003ad8f9-a6f1-44ff-b386-df5fe175ebc1)

### Employee Page
![EmployeePage](https://github.com/Manohar-dev/EmployeeManagementSystem/assets/119424432/d8f4867e-28e7-4459-bd0b-d37d73c9eb6f)

### Welcome Page
![WelcomePage](https://github.com/Manohar-dev/EmployeeManagementSystem/assets/119424432/ca400867-b4c6-470b-9331-0957ae2cff0b)

---

## Getting Started

### Prerequisites

#### Frontend
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

#### Backend
- [.NET SDK](https://dotnet.microsoft.com/download)

### Installation

#### Frontend

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/empregristration.git
    cd empregristration/frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the application:
    ```bash
    npm start
    ```

#### Backend

1. Navigate to the backend directory:
    ```bash
    cd ../backend
    ```

2. Restore the .NET dependencies:
    ```bash
    dotnet restore
    ```

3. Build the application:
    ```bash
    dotnet build
    ```

4. Run the application:
    ```bash
    dotnet run
    ```

---

## API Endpoints

### Comments

- **Get all comments**
    ```http
    GET /api/comment
    ```

- **Get comments by user ID**
    ```http
    GET /api/comment/{userid}
    ```

- **Get comment by comment ID**
    ```http
    GET /api/comment/user/{Cmtid}
    ```

- **Create a new comment**
    ```http
    POST /api/comment
    ```

- **Update a comment**
    ```http
    PUT /api/comment/{Cmtid}
    ```

- **Delete a comment**
    ```http
    DELETE /api/comment/{Cmtid}
    ```

For more detailed API documentation, please refer to the [API Documentation](docs/api.md).

---

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any improvements.

---


