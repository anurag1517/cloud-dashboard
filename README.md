# Cloud Security Dashboard

A responsive web application designed to monitor and manage cloud security misconfigurations across multiple cloud accounts.

## Live Demo

[**View Deployed Application**](https://cloud-dashboard-8qmu.vercel.app/)

## Features

- **Multi-Account Visibility**: View and filter security findings across various cloud accounts (e.g., Prod-01, Dev-02) and regions.
- **Interactive Dashboard**: visualize security posture with dynamic charts and metric cards.
- **Efficient Filtering**: Filter findings by severity (Critical, High, Medium, Low) and search by service, issue, or account name.
- **Remediation Workflow**: Integrated workflow to view remediation commands for specific issues.
- **Responsive Design**: Modern, responsive interface optimized for desktop and tablet views.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anurag1517/cloud-dashboard.git
   ```

2. Navigate to the project directory:
   ```bash
   cd cloud-dashboard
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173` (check the terminal for the exact URL).

## Technologies

- **Frontend**: React, Vite
- **Visualization**: Recharts
- **Styling**: CSS Variables, Responsive Grid Layout
