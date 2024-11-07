/**
 * # Career Guidance Technologies
 *
 * ## Project Description
 * Career Guidance Technologies is a web application designed to assist students in finding the best colleges and courses in their field of interest, whether in India or abroad. The application provides modules for both students and administrators, allowing for college registration, student management, and aptitude testing.
 *
 * ## Features
 * - **Admin Module**: 
 *   - Register and manage colleges.
 *   - View all registered colleges.
 * - **Student Module**:
 *   - Register and manage personal details.
 *   - View and select colleges.
 *   - Take aptitude tests and view scores.
 *
 * ## Technologies Used
 * - **Frontend**: HTML, CSS, EJS
 * - **Backend**: Node.js, Express.js
 * - **Database**: MongoDB
 * - **Authentication**: Session-based authentication
 *
 * ## Setup Instructions
 * 1. **Clone the Repository**:
 *    ```bash
 *    git clone https://github.com/syedtasavour/career-guidance.git
 *    cd career-guidance
 *    ```
 * 2. **Install Dependencies**:
 *    ```bash
 *    npm install
 *    ```
 * 3. **Configure Environment Variables**:
 *    Create a `.env` file in the root directory and add the following:
 *    ```
 *    MONGODB_URI=mongodb://localhost:27017/career-guidance
 *    PORT=3000
 *    ```
 * 4. **Start the Application**:
 *    ```bash
 *    npm start
 *    ```
 *    The application will be available at `http://localhost:3000`.
 *
 * ## Usage
 * - **Admin**:
 *   - Access the admin dashboard to manage colleges.
 *   - Register new colleges and view all registered colleges.
 * - **Student**:
 *   - Register and log in to access the student dashboard.
 *   - View and select colleges, update personal details, and take aptitude tests.
 *
 * ## API Endpoints
 * - **Auth**:
 *   - `POST /auth/register`: Register a new user.
 *   - `POST /auth/login`: Log in a user.
 *   - `GET /auth/logout`: Log out the current user.
 * - **Colleges**:
 *   - `GET /college/list`: View all colleges.
 *   - `POST /college/register`: Register a new college (admin only).
 * - **Student**:
 *   - `GET /student/dashboard`: View student dashboard.
 *   - `POST /student/submit-test`: Submit aptitude test scores.
 *
 * ## Contributing
 * Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.
 *
 * ## License
 * This project is licensed under the MIT License.
 */ 