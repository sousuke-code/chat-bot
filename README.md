# Chatbot & Jira Integration App

A Next.js application featuring an AI-powered chatbot and Jira integration capabilities.

## Features

*   **AI Chatbot:** An intelligent chatbot powered by the OpenAI API, capable of understanding natural language and providing assistance. Supports Markdown rendering for formatted responses.
*   **Jira Integration:** Seamlessly connect to Jira to fetch, display, and visualize data. Includes features like:
    *   Data visualization using charts (Chart.js/Recharts).
    *   Fetching and displaying Jira issues.
    *   (Add any other specific Jira features observed here)

## Technologies Used

*   **Frontend:**
    *   Next.js (v15.3.1)
    *   TypeScript
    *   Tailwind CSS
    *   Zustand (for state management)
    *   Chart.js/Recharts (for data visualization)
*   **Backend & Services:**
    *   OpenAI API (for the AI chatbot)
    *   Jira API (using `jira-connector` or `jira.js` - *developer to confirm specific library if used*)
    *   Supabase (for backend services like database and authentication)

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
