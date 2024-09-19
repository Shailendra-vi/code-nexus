
# Code Nexus

Hi, My name is **Shailendra Vishwakarma**, a software engineer enthusiast. This project is a backend system for compiling code in various languages using a Docker containerized environment.

## Features

- Accepts requests with the following structure:
  ```json
  {
    "code": "<your_code>",
    "lang": "<programming_language>",
    "input": "<input_data>"
  }
  ```
- Compiles and executes the code within a Docker container.
- Returns the output as a response in the following format:
  ```json
  {
    "status": "<execution_status>",
    "stdout": "<execution_output>",
    "stderr": "<execution_error>",
    "message": "<error_message>"
  }
  ```

## Technologies Used

- **Docker**: For running isolated, containerized environments for various programming languages.
- **Express.js**: Used as middleware to handle API requests.
- **Node.js**: Backend runtime environment.
  
## Error Handling

- All exceptions are properly handled to ensure the service remains stable.
- Error responses will include detailed status messages if something goes wrong during compilation or execution.

## Installation and Usage

1. Clone this repository:
   ```bash
   git clone https://github.com/Shailendra-vi/code-nexus
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server:
   ```bash
   node app.js
   ```

Ensure you have Docker installed and running on your machine before executing the server.

## API Endpoints

- **POST /compile**
  - Request:
    - Body: `{ "code": "", "lang": "", "input": "" }`
  - Response:
    - Body: `{ "status": "", "stdout": "", "stderr": "", "message": "" }`

## Future Improvements

- Add support for more languages.
- Integrate NGINX for load balancing.
- Redis for caching compilation results.
- Kubernetes for better scalability and orchestration of containerized environments.
- Optimize execution performance.

---

**Shailendra Vishwakarma**  
*Software Engineer Enthusiast*
