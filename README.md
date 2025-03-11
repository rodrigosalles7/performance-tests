# Performance Testing

This repository contains performance testing scripts using **k6** to evaluate the application's behavior and resilience. Tests can be executed **locally** or via **GitHub Actions workflow**.

The tests performed are:

- **Load Test**
- **Soak Test**
- **Spike Test**
- **Stress Test**

Each test has a specific objective and helps identify different aspects of the application's performance.

---

## Types of Tests

### 1. **Load Test**

**Objective:** Evaluate the application's performance under a constant and predictable load.

**Description:**  
The **Load Test** simulates a fixed number of users accessing the application over a specific period. The goal is to verify the application's stability under normal traffic conditions.

**Focus:**
- Identify response times.
- Check the error and failure rate.
- Assess the ability to handle a constant load.

---

### 2. **Soak Test**

**Objective:** Verify the application's resilience in prolonged usage scenarios.

**Description:**  
The **Soak Test** maintains a constant load of users for an extended period to identify potential memory leaks, performance degradation, and failures that appear over time.

**Focus:**
- Detect stability failures.
- Monitor resource consumption over time.

---

### 3. **Spike Test**

**Objective:** Evaluate the application's ability to handle sudden traffic spikes.

**Description:**  
The **Spike Test** rapidly increases the number of users to simulate access spikes and analyzes how the application reacts to such situations.

**Focus:**
- Test the ability to scale quickly.
- Assess resilience during and after traffic spikes.

---

### 4. **Stress Test**

**Objective:** Identify the application's maximum load limit.

**Description:**  
The **Stress Test** progressively increases the number of users until the application reaches its breaking point. This helps determine the system's limits and maximum capacity.

**Focus:**
- Determine the application's failure point.
- Evaluate recovery after an overload.

---

## How to Run the Tests

Tests can be executed **locally** or via **GitHub Actions**.

### Option 1: Run Locally

#### **Prerequisites**
- **k6** installed on your machine.

  ```bash
  curl -s https://packagecloud.io/install/repositories/grafana/stable/script.deb.sh | sudo bash
  sudo apt-get install k6
  k6 version
  ```

#### **Execution Steps**

1. Clone this repository:

    ```bash
    git clone https://github.com/YOUR_REPOSITORY.git
    cd YOUR_REPOSITORY/performance
    ```

2. Run the desired test. For example, to run the **Load Test**:

    ```bash
    k6 run loadTest.js
    ```

---

### Option 2: Run via GitHub Actions

Tests can also be executed directly through the **GitHub Actions workflow**.

#### **GitHub Actions Setup**
1. Go to the **Actions** tab in the GitHub repository.
2. Select the workflow corresponding to the desired test type (**Load Test, Soak Test, Spike Test, or Stress Test**).
3. Configure the following parameters before running the test:
   - **Number of Virtual Users (VUs)**: Number of simulated users.
   - **Execution Time**: Test duration.
   - **HTTP Method (GET or POST)**: Type of request to be made.
   - **Request Body (for POST requests)**: Required only if the request is of type POST.
4. Run the workflow and monitor the automatically generated reports.

---

## Reports

After running the tests, the **HTML** results will be saved in the `performance/reports/` directory. To view them, simply open the `index.html` file in a browser.

If the tests are executed via **GitHub Actions**, reports will be available in the workflow artifacts.
