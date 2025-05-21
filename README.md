# AI-Powered Jira Sprint Review Tool (for "KIK" Project)

An application that analyzes Jira sprint data for a specific project (currently hardcoded to "KIK") and generates an AI-powered review of the sprint's progress in **Japanese**. This tool is aimed at project managers, scrum masters, and development teams to help them understand sprint dynamics and identify areas for improvement.

## Features

*   **AI-Powered Sprint Review (in Japanese):**
    *   Generates a comprehensive sprint review using the OpenAI API (gpt-4.1 model).
    *   The review is provided in Markdown format and displayed using the `SummaryCard.tsx` component.
    *   **Review Coverage (based on system prompt in `src/app/api/review/route.ts`):**
        *   Overall progress: Total ticket counts, progress by status (completed, in-progress, to-do) with counts and percentages.
        *   Progress per assignee: Ticket counts and progress for each assignee.
        *   Task concentration: Identifies if tasks are concentrated on specific members or if there are unassigned tickets.
        *   Stale tickets: Pinpoints tickets that have not been updated for a certain period.
        *   Work balance: Assesses the distribution of work among team members.
        *   Recommended next actions: Suggests adjustments for the team based on the analysis.

*   **Jira Integration:**
    *   Fetches issues from open sprints for a specific Jira project (currently hardcoded to "KIK"). This includes fields like issue key, summary, status, assignee, created, and updated dates.
    *   **Sprint Selection & Review:** The `SprintTab` component allows users to select a specific sprint, which then triggers the AI review generation for that sprint.
    *   **Employee-Specific View:** The `EmployeeTab` component enables viewing issues assigned to a particular employee, visualized with a bar chart (`IssueBarChartByEmployee.tsx`) showing issue counts by status.
    *   **Data Visualization:** Includes various charts for visualizing issue distributions and sprint progress, such as `IssueChart.tsx` (e.g., overall issue status distribution) and `IssuesPieChart.tsx` (e.g., issue distribution by assignee or status).

## Technologies Used

*   **Frontend:**
    *   Next.js (v15.3.1)
    *   TypeScript
    *   Tailwind CSS
    *   Zustand (for state management)
    *   Chart.js/Recharts (for data visualization)
*   **Backend & Services:**
    *   OpenAI API (using the `gpt-4.1` model for the AI review)
    *   Jira API (using `jira.js`)
    *   Supabase (for backend services like database and authentication)

## Important Notes / Limitations

*   **Hardcoded Jira Project Key:** The Jira project key is currently hardcoded as "KIK" in several API routes, including:
    *   `src/app/api/issues/route.ts`
    *   `src/app/api/review/route.ts`
    *   `src/app/api/issues/[employeeName]/route.ts`
    *   `src/app/api/sprint/route.ts`
    Users **must** modify this key in these files to point to their own Jira project.
*   **JQL Queries:** The JQL queries (e.g., `project = KIK AND sprint in openSprints()`) used to fetch Jira data are specific to this hardcoded project. Users may need to adjust these queries based on their Jira project setup and desired filtering.
*   **AI Review Language:** The AI-generated sprint review is currently configured to be in **Japanese**.

## Getting Started / Setup Instructions

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm or yarn

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add the following environment variables. You can copy the `.env.local.example` file (if provided) to get started.

    ```env
    # OpenAI API Key
    OPENAI_API_KEY=your_openai_api_key

    # Jira Configuration
    JIRA_HOST=your_jira_instance_url # e.g., https://your-domain.atlassian.net
    JIRA_USERNAME=your_jira_email
    JIRA_API_TOKEN=your_jira_api_token

    # Supabase Configuration
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key # If needed for backend functions

    # Next.js specific (if any, otherwise Next.js defaults will be used)
    # PORT=3000
    ```
    **Note:** Obtain API keys and credentials from their respective services (OpenAI, Jira, Supabase).

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) (or your configured port) in your browser to see the application.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details (if a `LICENSE.md` file is present).
