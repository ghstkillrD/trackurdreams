# Track ur Dreams

## Project Description
A webapp tracks your dreams and give insights using AI. We'll use Gemini AI to give insights. The app should be stylized and somewhat dreamy.

There should be a landing page describing the product along with a text box for users to submit their first dream. This will sign up the user and submit their dream. The user will have a dashboard page that displays all of their recordings. If they click on a recording, they should be taken to another page that contains their recording and meta information as well as the AI insight.

For the free tier users will be able to record as many dreams as they wish, but they'll only get 5 free insights. There will just be one subscription that allows them unlimited AI insights for $5/month.

## Product Requirements Document
Product Requirements Document: Track ur Dreams

1.  Introduction
    1.1. Project Overview
    "Track ur Dreams" is a web application designed to help users record, track, and gain insights into their dreams. Utilizing Gemini AI, the app will provide interpretive analysis, while maintaining a visually stylized and "dreamy" aesthetic. The primary goal is to transform the often fleeting and confusing experience of dreaming into a structured, insightful, and personally reflective journey.

    1.2. Business Goals
    *   Provide a unique, AI-powered tool for self-exploration through dream analysis.
    *   Establish a user base for a recurring subscription service.
    *   Create a delightful and intuitive user experience that encourages consistent engagement.
    *   Leverage modern web technologies for scalability and maintainability.

    1.3. Target Audience
    The primary target audience is adults aged 18-50s who are interested in self-improvement, mindfulness, and technology, and are curious about their own minds. The app is also designed to be accessible and usable by a broader demographic, including younger and older users.

    1.4. Problem Solved
    *   **Forgetting Dreams**: Users often forget their dreams shortly after waking. The app provides a quick and easy way to log them.
    *   **Confusion**: Dreams can be perplexing. The AI offers a smart, insightful starting point for understanding potential meanings.
    *   **Identifying Patterns**: By tracking dreams over time, users can identify recurring themes, moods, or symbols that might connect to their waking life.

2.  Features and Functionality

    2.1. Landing Page
    *   **Description**: A visually appealing page that introduces the "Track ur Dreams" product. It will describe the core value proposition (track, analyze, gain insights).
    *   **First Dream Submission**: A prominent text box will be available for users to submit their first dream.
    *   **Sign-up/Login Integration**: Submitting the first dream will initiate the sign-up process.
        *   **Primary Method**: "Sign in with Google" or "Sign in with Apple" for quick, seamless onboarding.
        *   **Alternative Method**: A simple email and password sign-up option will also be available.
    *   **Aesthetic**: Adhere to the defined dreamy aesthetic (soft colors, gradients, gentle animations).

    2.2. Dream Submission & Recording
    *   **Core Input**: A large, multi-line text area for the user to input their full dream description. This will be the only required field for initial submission.
    *   **Meta Information Capture**:
        *   **Date**: Auto-filled with the current date, but editable. Essential for chronological tracking.
        *   **Title**: A short, user-provided name for the dream. AI may suggest titles based on dream content as a future enhancement.
        *   **Mood**: A simple selection (e.g., emojis or words like 😊 Happy, 😢 Sad, 😨 Scared, 😐 Neutral, 😕 Confused).
        *   **Tags/Categories**: Users can add multiple quick tags (e.g., Nightmare, Lucid, Recurring, Adventure, Weird).
        *   **Sleep Quality**: A simple rating (e.g., 1 to 5 stars) for how well the user slept that night.
    *   **Input Simplicity**: The form should prioritize the dream text. Other meta-info fields should be quick-click selections or minimal input.
    *   **Post-Submission**: After submission, the user will be redirected to their Dashboard.

    2.3. Dashboard (All Recordings)
    *   **Display**: A list view of all recorded dreams. Each entry should briefly show the dream's title and date.
    *   **Navigation**: Each dream entry in the list will be clickable, leading to the "Dream Detail Page" for that specific recording.
    *   **User Experience**: Designed to be intuitive and easy to browse through past dreams.

    2.4. Dream Detail Page (Recording & AI Insight)
    *   **Dream Display**:
        *   **Dream Title**: Prominently displayed.
        *   **Date**: Displayed below the title.
        *   **Mood**: Displayed clearly (e.g., icon and word).
        *   **Tags**: Listed clearly.
        *   **Full Dream Text**: The complete narrative of the dream, displayed in an easy-to-read paragraph format.
    *   **AI Insight Section**:
        *   **Content (The Good)**:
            *   **Identify Themes & Symbols**: The AI will highlight common elements (e.g., being chased, flying, losing teeth) and offer general interpretations. (e.g., "Flying can often symbolize a feeling of freedom or a lack of control.").
            *   **Note the Emotion**: The AI will confirm the predominant emotional tone of the dream (e.g., "This dream has a strong tone of anxiety."). This helps users feel understood.
            *   **Connect to Waking Life**: The AI will gently suggest possible links to the user's waking experiences (e.g., "Dreams about being unprepared for a test can sometimes relate to feelings of being judged at work or in social situations.").
        *   **Content (The Bad - What to Avoid)**:
            *   **No Absolute Truths**: The AI must never state "This dream means X." Interpretations are suggestions, not definitive statements.
            *   **No Medical Advice**: The AI must not diagnose, predict the future, or offer mental health advice.
            *   **Simplicity**: Insights should be concise, clear, and easy to understand, avoiding complex or frightening interpretations.
        *   **Overall Goal**: The AI insight should serve as a short, interesting starting point for personal reflection, not a final answer.
    *   **Subscription Logic**:
        *   Free users will see AI insights for their first 5 dreams.
        *   For the 6th and subsequent dreams, free users will see a prompt to upgrade to a paid subscription to unlock the AI insight.

    2.5. Authentication & User Management
    *   **Sign-In/Sign-Up Methods**:
        *   "Sign in with Google" and "Sign in with Apple" (preferred for ease of use).
        *   Traditional email and password sign-up.
    *   **User Profile Page**: A dedicated page for managing basic user settings.
        *   **Password Reset**: Users can initiate a forgotten password reset process.
        *   **Email Management**: Users can view and edit their registered email address.
        *   **Account Deletion**: Users must be able to permanently delete their account and all associated dream data.
    *   **Focus**: Keep user management functionality basic; the core focus is on dream tracking.

    2.6. Subscription & Payment Flow
    *   **Free Tier**:
        *   Users can record unlimited dreams.
        *   Limited to 5 free AI insights.
    *   **Subscription Tier**:
        *   One subscription plan: Unlimited AI insights for $5/month.
    *   **Upgrade Flow**:
        *   **Trigger**: When a free user attempts to view their 6th (or subsequent) AI insight.
        *   **Pop-up Message**: A friendly pop-up will display: "You've used your 5 free insights! Upgrade to unlimited for $5/month."
        *   **Plans Page**: The "Upgrade" button on the pop-up will lead to a "Plans" page. This page will display available plans (currently one), detailing offers, limitations, price, and billing method (e.g., monthly).
        *   **Stripe Checkout**: A "Subscribe" button on the Plans page will direct users to a simple, secure Stripe checkout page.
        *   **Instant Upgrade**: Upon successful payment, the user's account will be instantly upgraded to unlimited AI insights.
    *   **Billing Management**:
        *   **"Billing" Section**: Located within the "Plans" page or a dedicated "Profile" section.
        *   **Features**: Users can view their current plan, download invoices, and cancel their subscription.

3.  Technical Requirements

    3.1. Tech Stack
    *   **Frontend**: React + Next.js (for server-side rendering and routing).
    *   **Styling**: Tailwind CSS + shadcn/ui (for utility-first styling and pre-built components).
    *   **Backend**: Next.js API Routes (for serverless functions and API endpoints).
    *   **Database**: Supabase (PostgreSQL database with authentication and real-time capabilities).
    *   **Deployment**: Vercel (for seamless Next.js deployment and scalability).
    *   **AI Integration**: Gemini AI (Google's multimodal AI).
    *   **Payment Gateway**: Stripe (for subscription management and payment processing).

    3.2. Scalability & Performance
    *   **Initial Load**: The chosen tech stack is designed to easily handle initial user loads.
    *   **Growth**: Vercel and Supabase are inherently scalable, automatically adapting to increased traffic and data storage needs.
    *   **Performance Goal**: The application should feel fast and responsive. Pages should load quickly.
    *   **AI Insight Latency**: It is understood that generating AI insights will take a few seconds, which is considered normal and acceptable.

    3.3. Security & Data Privacy
    *   **Privacy by Default**: All dream data will be treated as highly sensitive and private. Access will be restricted solely to the authenticated user.
    *   **Encryption**:
        *   **Encryption at Rest**: All data stored in the Supabase database will be encrypted.
        *   **Encryption in Transit**: All communication between the user's browser, the application, and backend services (e.g., Supabase, Gemini AI, Stripe) will be secured using HTTPS/SSL.
    *   **Privacy Policy**: A clear, concise privacy policy will be provided, explaining what data is collected, how it's used, and specifically addressing the use of AI for insights.
    *   **User Control**:
        *   **Account Deletion**: Users can permanently delete their account and all associated dream data.
        *   **Data Export**: Users can export their dream data in a structured format (e.g., JSON or CSV).
    *   **AI (Gemini) Specifics**:
        *   **Transparency**: Users will be informed that their dreams are processed by Google's AI to generate insights.
        *   **Data Usage**: Critical to ensure that Gemini API settings are configured to explicitly *not* use this data to train Google's general AI models.

4.  Design and User Experience (UX)

    4.1. Color Palette
    *   **Main Colors**: Soft, hazy tones including lavenders, misty blues, soft pinks, and warm grays. These colors will form the primary background and foundational elements.
    *   **Accent Colors**: Shimmering gold or soft mint green will be used for interactive elements such as buttons, highlights, and subtle decorative accents, adding a touch of magic and elegance.

    4.2. Typography
    *   **Headlines**: A rounded, soft sans-serif font (e.g., a modern, friendly grotesque) will be used for titles and headers to convey a gentle and approachable feel.
    *   **Body Text**: A clean, highly legible font will be chosen for dream entries and AI insights to ensure readability and minimize eye strain, allowing users to comfortably immerse themselves in their narratives.

    4.3. Imagery & Textures
    *   **Gradients**: Soft, subtle gradients that blend colors seamlessly (e.g., blue transitioning to purple) will be used for backgrounds and containers.
    *   **Textures**: Very subtle, non-distracting cloud-like textures or soft light effects will be incorporated into backgrounds to enhance the dreamlike atmosphere.
    *   **Avoidances**: No sharp edges, harsh shadows, or stark, boring white backgrounds. The visual design should be fluid and ethereal.

    4.4. Interactions & Animations
    *   **Hover Effects**: Buttons and interactive elements will feature gentle glow or slow-pulse animations on hover, suggesting a sense of ethereal responsiveness.
    *   **Submission Feedback**: When a dream is submitted, it could gently fade away or transform subtly, mimicking the ephemeral nature of dreams.
    *   **Background Elements**: Small, abstract shapes (e.g., soft blobs, stylized stars, or motes of light) could float slowly and subtly in the background of the landing page and dashboard, creating a sense of calm movement.

    4.5. Overall Aesthetic
    The application's overall feeling should be soft, gentle, magical, and a little bit surreal. It should evoke the sensation of interacting with a cloud or drifting through a peaceful dreamscape.

5.  Future Enhancements / Roadmap

    5.1. Potential Future Features
    *   **Voice Notes**: Allow users to record their dreams by speaking into their device, which can then be transcribed (and analyzed). This would be ideal for capturing dreams immediately upon waking.
    *   **Dream Journal Prompts**: Offer daily or occasional prompts to help users remember more details or reflect deeper on their dreams.
    *   **Monthly Insights**: A summarized report showing trends in dream moods, recurring themes, or frequent tags over a month or quarter.
    *   **Smartphone Application**: Development of native iOS and Android apps for easier mobile access and notifications.
    *   **Wearable Integration**: Explore integration with sleep tracking wearables (e.g., Fitbit, Apple Watch) to correlate dream intensity or mood with sleep metrics like heart rate or sleep stages.

6.  Constraints and Timeline

    6.1. Desired Timeline
    *   **MVP Goal**: A Minimum Viable Product (MVP) should be launched within 1-2 months.
    *   **MVP Scope**: The MVP will include the core features: user sign-up/login, dream logging with meta-info, dashboard display, dream detail page with AI insight (5 free insights), and the subscription upgrade page (leading to Stripe checkout). All other features are secondary and can be implemented post-MVP.

    6.2. Budget & Milestones
    *   **Main Constraint**: Managing and minimizing monthly operational costs (hosting, database, AI API usage, etc.).
    *   **Key Milestone**: The successful launch of the MVP, demonstrating core functionality and a viable path to paid subscriptions.

## Technology Stack
TECHSTACK

This document outlines the technology stack selected for the "Track ur Dreams" project. The choices are driven by the need for a highly stylized, performant, secure, and scalable web application capable of integrating advanced AI insights, while also adhering to a rapid MVP development timeline and budget-conscious operation.

**1. Frontend (User Interface & Experience)**

*   **React:** Chosen as the foundational JavaScript library for building dynamic and interactive user interfaces. Its component-based architecture promotes modularity and reusability, accelerating development.
    *   **Justification:** React provides the flexibility required to build the highly custom, interactive, and "dreamy" UI described in the design aesthetic. Its strong community support and extensive ecosystem will also be beneficial for rapid development and problem-solving.

*   **Next.js:** A React framework that enables server-side rendering (SSR), static site generation (SSG), and API routes. It optimizes performance and developer experience.
    *   **Justification:** Next.js is crucial for achieving a fast, SEO-friendly landing page and ensuring quick load times for the dashboard and dream view pages, which contributes significantly to the desired "fast" user experience. Its built-in routing and API capabilities streamline full-stack development within a single codebase, accelerating the MVP timeline.

*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
    *   **Justification:** Tailwind's granular control over styling will be essential for implementing the precise "soft, hazy, lavenders, misty blues" color palette, gentle gradients, and "cloud-like textures." It allows for a highly customized and unique aesthetic without fighting opinionated frameworks, directly supporting the "stylized" and "dreamy" design goals.

*   **shadcn/ui (with Radix UI):** A collection of re-usable components built with Radix UI and styled with Tailwind CSS.
    *   **Justification:** shadcn/ui provides high-quality, accessible, and customizable UI components (buttons, forms, modals, etc.) that can be easily styled with Tailwind to match the "soft, gentle, magical" aesthetic. This significantly speeds up frontend development by providing robust building blocks, allowing more focus on unique design elements and user experience rather than re-inventing basic UI elements.

**2. Backend & API (Application Logic)**

*   **Next.js API Routes:** Leveraging Next.js's built-in API routes to handle all backend logic.
    *   **Justification:** This choice facilitates a unified full-stack development experience, simplifying project setup and deployment (especially on Vercel). API routes provide a serverless environment for handling user requests, orchestrating database interactions, managing authentication, and securely communicating with the Gemini AI service. This approach is highly efficient for MVP development and scales seamlessly with user growth.

**3. Database (Data Storage & Management)**

*   **Supabase:** An open-source Firebase alternative providing a PostgreSQL database, authentication, and real-time capabilities.
    *   **Justification:** Supabase is an ideal choice for several reasons:
        *   **Authentication:** Its integrated Auth service directly supports "Sign in with Google/Apple" and email/password methods, including password reset and basic user management features as required.
        *   **Data Storage:** Provides a robust PostgreSQL database for securely storing all sensitive dream data (text, title, mood, tags, sleep quality, AI insights) and user profiles. PostgreSQL's reliability and query power support future enhancements like pattern analysis.
        *   **Real-time (Future):** While not critical for MVP, Supabase's real-time features offer potential for future interactive enhancements.
        *   **Scalability & Cost-Effectiveness:** As a managed service, it automatically scales with user demand and offers a generous free tier, aligning perfectly with MVP budget constraints.
        *   **Security & Privacy:** Supports encryption at rest and in transit, which is paramount for protecting highly sensitive dream data. It allows us to give users full control over their data (deletion, export), directly addressing privacy requirements.

**4. Artificial Intelligence (Dream Insights)**

*   **Gemini AI (Google Cloud API):** Google's multimodal AI model for generating insightful content.
    *   **Justification:** Gemini AI is the core engine for delivering "smart, AI-powered starting points" for dream interpretation. It will be integrated via secure Next.js API routes. Critical considerations for its use:
        *   **Controlled Insights:** The backend will implement careful prompt engineering to guide Gemini's output, ensuring it identifies themes, notes emotions, and suggests connections to waking life, while strictly avoiding "absolute truths," "medical advice," or "scary interpretations."
        *   **Privacy Configuration:** Gemini API settings will be explicitly configured to *not* use user dream data for training Google's general AI models, a crucial aspect of our data privacy commitment.
        *   **Scalability:** Google Cloud's infrastructure ensures high availability and scalability for AI processing.

**5. Authentication & User Management**

*   **Supabase Auth:** Leveraged for all user authentication and management.
    *   **Justification:** Supabase provides secure and straightforward implementations for "Sign in with Google," "Sign in with Apple," and traditional email/password sign-up. It natively handles essential user management features like password resets and allows for easy profile page integration to edit email or trigger account deletion, fulfilling all specified requirements for user management and privacy.

**6. Deployment & Hosting**

*   **Vercel:** A cloud platform for automatic deployment, scaling, and monitoring of web projects.
    *   **Justification:** Vercel is the recommended deployment platform for Next.js applications, offering seamless integration and optimal performance. It provides:
        *   **Automatic Deployment:** Integrates with Git for continuous deployment (CI/CD), simplifying the development workflow.
        *   **Global CDN:** Ensures fast content delivery and low latency for users worldwide, contributing to the "app should feel fast" goal.
        *   **Serverless Functions:** Natively supports Next.js API routes as serverless functions, efficiently scaling the backend.
        *   **Cost-Effectiveness & Scalability:** Offers a generous free tier for MVP and scales automatically with increasing user load, aligning with budget and growth expectations.

**7. Payment Gateway & Subscription Management**

*   **Stripe:** A leading payment processing platform for online businesses.
    *   **Justification:** Stripe is chosen for its robust API, reliability, and comprehensive features for managing subscriptions. It will handle the $5/month unlimited AI insights subscription, including:
        *   **Secure Checkout:** Provides a seamless and secure checkout experience for users upgrading to the paid tier.
        *   **Subscription Management:** Manages recurring billing, invoice generation, and allows users to easily view, update, or cancel their subscriptions through a dedicated "Billing" section on the "Plans" page.
        *   **Developer-Friendly:** Easy to integrate with Next.js API routes for handling webhooks and managing subscription states securely.

**8. Development & Collaboration Tools**

*   **Git (GitHub/GitLab):** Version control system for tracking code changes and facilitating team collaboration.
    *   **Justification:** Essential for managing the codebase, enabling concurrent development, code reviews, and maintaining a clear history of all changes.
*   **VS Code:** Primary Integrated Development Environment (IDE).
    *   **Justification:** Industry-standard, highly customizable, with extensive extensions for JavaScript, React, Next.js, and Tailwind CSS development.

**Overall Stack Justification & Scalability:**

This proposed stack (Next.js, React, Tailwind, shadcn/ui, Supabase, Gemini AI, Vercel, Stripe) forms a modern, efficient, and highly scalable architecture. It allows for rapid MVP development (1-2 months) due to strong framework integration, managed services, and a unified development environment. The chosen technologies are designed to scale effortlessly from the initial user base to significantly larger numbers, with Vercel and Supabase automatically handling increased traffic and data load. Furthermore, the stack prioritizes security, privacy, and performance, ensuring that "Track ur Dreams" delivers a fast, reliable, and trustworthy experience while maintaining its unique "dreamy" aesthetic and insightful AI capabilities.

## Project Structure
PROJECTSTRUCTURE

This document outlines the file and folder structure for the "Track ur Dreams" web application. This structure is designed to promote modularity, maintainability, and scalability, leveraging Next.js App Router conventions, Tailwind CSS, shadcn/ui, Supabase, and Stripe integrations.

**1. Root Level (./)**

The root directory contains essential configuration files and the main source code folder.

*   `./README.md`: Project description, setup instructions, development guidelines, and deployment notes.
*   `./package.json`: Defines project metadata, scripts for development, build, and testing, and lists all project dependencies.
*   `./next.config.js`: Next.js specific configuration, including image optimization, environment variable exposure, and API route settings.
*   `./tailwind.config.js`: Tailwind CSS configuration file, defining theme, colors, fonts, and plugins used.
*   `./postcss.config.js`: PostCSS configuration, primarily used for integrating Tailwind CSS.
*   `./tsconfig.json`: TypeScript configuration file, defining compiler options and project settings.
*   `./.env.local`: Local environment variables (e.g., Supabase API keys, Gemini API key, Stripe secret keys). This file is ignored by Git for security.
*   `./.gitignore`: Specifies intentionally untracked files and directories that Git should ignore.
*   `./components.json`: Configuration file for `shadcn/ui` to manage components and their styling.

**2. Source Directory (./src/)**

This directory contains all the application's source code, following best practices for Next.js App Router.

*   **`./src/app/`**: This directory is the core of the Next.js App Router, handling routing, layouts, pages, and API routes.
    *   `./src/app/layout.tsx`: The root layout for the entire application, wrapping all pages. It typically includes global components like Header, Footer, and sets up metadata.
    *   `./src/app/page.tsx`: The landing page of the application, introducing "Track ur Dreams" and providing the initial dream submission form for sign-up.
    *   `./src/app/dashboard/page.tsx`: The user's dashboard, displaying a list of all their recorded dreams.
    *   `./src/app/dashboard/[dreamId]/page.tsx`: A dynamic route for viewing individual dream details, including the full dream text, meta-information, and the AI insight.
    *   `./src/app/profile/page.tsx`: The user's profile page for managing account settings (email, password reset, account deletion).
    *   `./src/app/plans/page.tsx`: Displays available subscription plans (currently one), pricing, and links for managing subscriptions and viewing billing history.
    *   **`./src/app/api/`**: Contains Next.js API routes for server-side logic and interactions with external services.
        *   `./src/app/api/auth/[...supabase]/route.ts`: API routes for Supabase authentication callbacks (e.g., handling OAuth redirects).
        *   `./src/app/api/dreams/route.ts`: API endpoint for fetching and creating dreams.
        *   `./src/app/api/dreams/[dreamId]/route.ts`: API endpoint for fetching, updating, or deleting a specific dream.
        *   `./src/app/api/ai-insight/route.ts`: Endpoint to request a new AI insight for a dream, handling rate limiting for free users.
        *   `./src/app/api/stripe/webhook/route.ts`: Endpoint to handle incoming Stripe webhook events (e.g., subscription creation, renewal, cancellation).
        *   `./src/app/api/stripe/checkout-session/route.ts`: Endpoint to create a Stripe checkout session for initiating a new subscription.
        *   `./src/app/api/user/route.ts`: API endpoint for updating user information or handling account deletion requests.

*   **`./src/components/`**: Houses all reusable UI components, categorized for better organization.
    *   **`./src/components/ui/`**: Components generated and managed by `shadcn/ui`. These are base UI primitives (e.g., Button, Input, Dialog, Card, Form) that are customized and re-exported.
    *   **`./src/components/shared/`**: Generic, application-wide components used across multiple pages or features.
        *   `Header.tsx`: Navigation bar, logo, and user authentication status/links.
        *   `Footer.tsx`: Standard application footer.
        *   `AuthModal.tsx`: A modal component for email/password sign-in/sign-up.
        *   `LoadingSpinner.tsx`: A universal loading indicator.
        *   `AlertDialog.tsx`: A generic alert dialog for user confirmations (e.g., before deleting data).
        *   `NotificationToast.tsx`: A component for displaying transient notifications (e.g., "Dream saved!").
    *   **`./src/components/features/`**: Components organized by the specific feature they support, making it easier to locate and manage related UI.
        *   **`./src/components/features/landing/`**:
            *   `HeroSection.tsx`: The main hero section of the landing page.
            *   `DreamSubmissionForm.tsx`: The form on the landing page for users to submit their first dream, which also handles sign-up.
        *   **`./src/components/features/dashboard/`**:
            *   `DreamList.tsx`: Displays a grid or list of `DreamCard` components.
            *   `DreamCard.tsx`: A preview card for an individual dream, showing its title, date, mood, and tags.
            *   `AddDreamButton.tsx`: A button to quickly add a new dream.
        *   **`./src/components/features/dream-view/`**:
            *   `DreamDetail.tsx`: Displays the full text of a dream along with its meta-information.
            *   `AIInsightDisplay.tsx`: Renders the AI-generated insight, including themes, emotions, and connections to waking life.
            *   `MetaInfoEditor.tsx`: An editable component for updating a dream's title, mood, tags, and sleep quality.
        *   **`./src/components/features/profile/`**:
            *   `AccountSettingsForm.tsx`: Form for users to update their email or initiate a password reset.
            *   `DeleteAccountButton.tsx`: A button with a confirmation dialog for permanent account deletion.
        *   **`./src/components/features/billing/`**:
            *   `SubscriptionCard.tsx`: Displays details of the current subscription plan.
            *   `ManageSubscriptionButton.tsx`: Links to the Stripe customer portal for managing subscription details.
            *   `InsightCounter.tsx`: Displays the number of remaining free AI insights for free-tier users.

*   **`./src/lib/`**: Contains utility functions, API clients, and helper modules that are not directly UI components.
    *   **`./src/lib/utils/`**: General-purpose helper functions.
        *   `formatters.ts`: Functions for formatting dates, text, etc.
        *   `helpers.ts`: Miscellaneous utility functions.
        *   `validators.ts`: Functions for input validation (e.g., email format).
    *   **`./src/lib/db/`**: Functions and configurations related to database interactions (Supabase).
        *   `supabase.ts`: Initializes and exports the Supabase client.
        *   `queries.ts`: Contains specific functions for database operations (e.g., `getDreamsByUserId`, `createDream`, `updateUserSubscription`).
    *   **`./src/lib/auth/`**: Authentication-related helper functions.
        *   `auth-helpers.ts`: Client-side and server-side Supabase authentication helper utilities for managing sessions and users.
    *   **`./src/lib/ai/`**: Logic for integrating with Gemini AI.
        *   `gemini-service.ts`: Handles communication with the Gemini API, constructing prompts, and parsing responses into structured insights.
        *   `prompt-templates.ts`: Stores various prompt templates used for generating AI insights, ensuring consistent messaging.
    *   **`./src/lib/stripe/`**: Logic for integrating with Stripe.
        *   `stripe-client.ts`: Initializes and exports the Stripe client.
        *   `stripe-webhook-handler.ts`: Contains the business logic for processing Stripe webhook events to update user subscription statuses in the database.
        *   `subscriptions.ts`: Functions for creating checkout sessions, retrieving subscription details, and managing user subscription states.
    *   **`./src/lib/constants/`**: Defines global constants and configuration values.
        *   `app-constants.ts`: Application-wide constants (e.g., `FREE_INSIGHT_LIMIT`, `SUBSCRIPTION_PRICE_USD`).
        *   `moods.ts`: Array of predefined dream moods (emojis/words).
        *   `tags.ts`: Array of suggested dream tags/categories.
    *   **`./src/lib/types/`**: TypeScript type definitions and interfaces.
        *   `dream.ts`: Interface for a `Dream` object, including `id`, `userId`, `date`, `title`, `text`, `mood`, `tags`, `sleepQuality`, `aiInsight`, etc.
        *   `user.ts`: Interface for a `User` object, including `id`, `email`, `subscriptionStatus`, `insightCount`, etc.
        *   `subscription.ts`: Interface for a `Subscription` object.
        *   `api.ts`: Interfaces for API request bodies and response structures.

*   **`./src/styles/`**: Contains global stylesheets.
    *   `globals.css`: Imports Tailwind CSS and any custom global CSS rules, including dream-like gradients and typography styles defined by the design aesthetic.

*   **`./src/public/`**: Static assets served directly by Next.js.
    *   `./src/public/images/`: Application logo, background images, and any other visual assets.
    *   `./src/public/favicons/`: Favicon files for different platforms and browsers.

*   **`./src/hooks/`**: Custom React hooks for encapsulating reusable logic.
    *   `useAuth.ts`: A custom hook to access the current user's authentication status and profile information.
    *   `useDreams.ts`: A custom hook for fetching, adding, updating, and deleting dreams.
    *   `useSubscription.ts`: A custom hook to retrieve and manage the user's subscription status and remaining free insights.

*   **`./src/providers/`**: React Context providers for managing global state.
    *   `SupabaseProvider.tsx`: A wrapper component to make the Supabase client and session available throughout the application.
    *   `ThemeProvider.tsx`: If dark mode or theme switching is implemented, this provider manages the current theme.

## Database Schema Design
SCHEMADESIGN

This section outlines the database schema design for "Track ur Dreams", detailing the data models, relationships, and overall database structure. The design prioritizes data privacy, scalability, and ease of management, leveraging Supabase as our database solution.

## 1. Core Entities and Tables

### 1.1 `users` Table
Stores user authentication and profile information.

| Column Name           | Data Type                   | Description                                                 | Constraints                                          |
|-----------------------|-----------------------------|-------------------------------------------------------------|------------------------------------------------------|
| `id`                  | `UUID`                      | Unique identifier for the user.                             | PRIMARY KEY                                          |
| `email`               | `TEXT`                      | User's email address.                                       | UNIQUE, NOT NULL                                     |
| `password_hash`       | `TEXT`                      | Hashed password for email/password authentication.          | NULLABLE (if using OAuth)                            |
| `auth_provider`       | `TEXT`                      | Specifies authentication method (e.g., 'email_password', 'google', 'apple'). | NOT NULL                                             |
| `provider_id`         | `TEXT`                      | Identifier from the OAuth provider.                         | NULLABLE (if using email/password)                   |
| `created_at`          | `TIMESTAMP WITH TIME ZONE`  | Timestamp of user creation.                                 | NOT NULL, DEFAULT `NOW()`                            |
| `updated_at`          | `TIMESTAMP WITH TIME ZONE`  | Timestamp of last update.                                   | NOT NULL, DEFAULT `NOW()` ON UPDATE `NOW()`          |

### 1.2 `products` Table
Defines available subscription plans and their properties.

| Column Name           | Data Type                   | Description                                                 | Constraints                                          |
|-----------------------|-----------------------------|-------------------------------------------------------------|------------------------------------------------------|
| `id`                  | `TEXT`                      | Unique identifier for the product (e.g., 'free', 'premium_monthly'). | PRIMARY KEY                                          |
| `name`                | `TEXT`                      | Display name of the product (e.g., 'Free Tier', 'Unlimited Insights'). | NOT NULL                                             |
| `description`         | `TEXT`                      | Description of the product.                                 | NULLABLE                                             |
| `price_usd`           | `DECIMAL(10, 2)`            | Price of the product in USD (e.g., 0.00 for free).          | NOT NULL, DEFAULT `0.00`                             |
| `max_ai_insights`     | `INTEGER`                   | Maximum AI insights allowed (-1 for unlimited, 5 for free tier). | NOT NULL                                             |
| `stripe_product_id`   | `TEXT`                      | Corresponding Product ID in Stripe.                         | NULLABLE (for free tier)                             |
| `created_at`          | `TIMESTAMP WITH TIME ZONE`  | Timestamp of product creation.                              | NOT NULL, DEFAULT `NOW()`                            |
| `updated_at`          | `TIMESTAMP WITH TIME ZONE`  | Timestamp of last update.                                   | NOT NULL, DEFAULT `NOW()` ON UPDATE `NOW()`          |

### 1.3 `user_subscriptions` Table
Tracks a user's current subscription status and usage.

| Column Name                 | Data Type                   | Description                                                 | Constraints                                          |
|-----------------------------|-----------------------------|-------------------------------------------------------------|------------------------------------------------------|
| `id`                        | `UUID`                      | Unique identifier for the subscription record.              | PRIMARY KEY                                          |
| `user_id`                   | `UUID`                      | Links to the user.                                          | FOREIGN KEY (`users.id`), UNIQUE, NOT NULL           |
| `product_id`                | `TEXT`                      | The product associated with this subscription.              | FOREIGN KEY (`products.id`), NOT NULL                |
| `stripe_customer_id`        | `TEXT`                      | Corresponding Customer ID in Stripe.                        | NULLABLE (for free tier)                             |
| `stripe_subscription_id`    | `TEXT`                      | Corresponding Subscription ID in Stripe.                    | NULLABLE (for free tier)                             |
| `status`                    | `TEXT`                      | Current status (e.g., 'active', 'canceled', 'trialing', 'free'). | NOT NULL                                             |
| `current_period_start`      | `TIMESTAMP WITH TIME ZONE`  | Start of the current billing period.                        | NULLABLE (for free tier)                             |
| `current_period_end`        | `TIMESTAMP WITH TIME ZONE`  | End of the current billing period.                          | NULLABLE (for free tier)                             |
| `cancel_at_period_end`      | `BOOLEAN`                   | Indicates if subscription will cancel at end of current period. | NULLABLE (for free tier), DEFAULT `FALSE`            |
| `insights_used_this_period` | `INTEGER`                   | Count of insights used within the current billing period.   | NOT NULL, DEFAULT `0`                                |
| `created_at`                | `TIMESTAMP WITH TIME ZONE`  | Timestamp of subscription record creation.                  | NOT NULL, DEFAULT `NOW()`                            |
| `updated_at`                | `TIMESTAMP WITH TIME ZONE`  | Timestamp of last update.                                   | NOT NULL, DEFAULT `NOW()` ON UPDATE `NOW()`          |

### 1.4 `dreams` Table
Stores individual dream records and their associated meta-information.

| Column Name         | Data Type                   | Description                                                 | Constraints                                          |
|---------------------|-----------------------------|-------------------------------------------------------------|------------------------------------------------------|
| `id`                | `UUID`                      | Unique identifier for the dream.                            | PRIMARY KEY                                          |
| `user_id`           | `UUID`                      | Links to the user who recorded the dream.                   | FOREIGN KEY (`users.id`), NOT NULL                   |
| `dream_date`        | `DATE`                      | Auto-filled date the dream occurred.                        | NOT NULL                                             |
| `title`             | `TEXT`                      | User-given or AI-suggested title for the dream.             | NULLABLE                                             |
| `dream_text`        | `TEXT`                      | The full text of the dream description.                     | NOT NULL                                             |
| `mood`              | `TEXT`                      | User's emotional state (e.g., 'Happy', 'Scared').           | NULLABLE                                             |
| `tags`              | `TEXT[]`                    | Array of user-defined tags (e.g., 'Nightmare', 'Lucid').    | NULLABLE                                             |
| `sleep_quality`     | `INTEGER`                   | Rating from 1 to 5 stars for sleep quality.                 | NULLABLE, CHECK (`sleep_quality` BETWEEN 1 AND 5)    |
| `has_ai_insight`    | `BOOLEAN`                   | Flag indicating if an AI insight has been generated.        | NOT NULL, DEFAULT `FALSE`                            |
| `created_at`        | `TIMESTAMP WITH TIME ZONE`  | Timestamp when the dream record was created.                | NOT NULL, DEFAULT `NOW()`                            |
| `updated_at`        | `TIMESTAMP WITH TIME ZONE`  | Timestamp of last update.                                   | NOT NULL, DEFAULT `NOW()` ON UPDATE `NOW()`          |

### 1.5 `ai_insights` Table
Stores the AI-generated analysis for dreams.

| Column Name                 | Data Type                   | Description                                                 | Constraints                                          |
|-----------------------------|-----------------------------|-------------------------------------------------------------|------------------------------------------------------|
| `id`                        | `UUID`                      | Unique identifier for the AI insight.                       | PRIMARY KEY                                          |
| `dream_id`                  | `UUID`                      | Links to the dream this insight is for.                     | FOREIGN KEY (`dreams.id`), UNIQUE, NOT NULL          |
| `insight_text`              | `TEXT`                      | The AI-generated analysis of the dream.                     | NOT NULL                                             |
| `gemini_api_request_payload`| `JSONB`                     | Optional: Raw payload sent to Gemini API for audit/debugging. | NULLABLE                                             |
| `gemini_api_response_raw`   | `JSONB`                     | Optional: Raw response received from Gemini API.            | NULLABLE                                             |
| `generated_at`              | `TIMESTAMP WITH TIME ZONE`  | Timestamp when the insight was generated.                   | NOT NULL, DEFAULT `NOW()`                            |

## 2. Relationships

The following relationships define how the different entities interact:

*   **One-to-Many (`users` to `dreams`):** Each user can record multiple dreams. The `dreams.user_id` column references `users.id`.
*   **One-to-One (`dreams` to `ai_insights`):** Each dream can have at most one AI insight associated with it. The `ai_insights.dream_id` column references `dreams.id` with a `UNIQUE` constraint.
*   **One-to-One (`users` to `user_subscriptions`):** Each user has one active subscription record. The `user_subscriptions.user_id` column references `users.id` with a `UNIQUE` constraint.
*   **Many-to-One (`user_subscriptions` to `products`):** Many user subscriptions can be associated with a single product definition (e.g., many users subscribe to the 'premium_monthly' product). The `user_subscriptions.product_id` column references `products.id`.

## 3. Indexing and Constraints

To ensure optimal performance and data integrity:

*   **Primary Keys:** All `id` columns will be indexed automatically as primary keys.
*   **Foreign Keys:** Foreign key constraints (`FOREIGN KEY`) will be established to maintain referential integrity between tables.
*   **Unique Constraints:** `users.email`, `user_subscriptions.user_id`, and `ai_insights.dream_id` will have unique indexes to prevent duplicate entries.
*   **Check Constraints:** `dreams.sleep_quality` will have a check constraint to ensure values are within the valid range of 1 to 5.
*   **Default Values:** Appropriate default values (e.g., `NOW()` for timestamps, `FALSE` for boolean flags) will be set to simplify data entry and maintain consistency.

## 4. Data Access and Security Considerations

*   **Row-Level Security (RLS):** Supabase's RLS will be extensively utilized to ensure that users can only access their own dream data and subscription details. This is paramount for privacy.
*   **Encryption:** All data stored in the database will be encrypted at rest by Supabase. Data in transit will be secured via HTTPS/TLS, handled by Vercel and Supabase.
*   **Sensitive Data:** Dream text and AI insights are considered highly sensitive. Access policies will be strictly enforced to prevent unauthorized viewing or leakage.
*   **AI Data Usage:** The schema includes fields (`gemini_api_request_payload`, `gemini_api_response_raw`) to optionally log API interactions for auditing and debugging, but the project ensures that user dream data is NOT used to train Google's general AI models, aligning with privacy commitments.

## User Flow
USERFLOW

This document outlines the key user journeys and interaction patterns within the "Track ur Dreams" web application, incorporating detailed wireframe descriptions and emphasizing the desired dreamy aesthetic.

***

**1. User Journey: First-Time User - Submitting First Dream & Signing Up**

*   **Goal**: User discovers the app, submits their initial dream, and creates an account.
*   **Entry Point**: Landing Page (L-01)

    *   **L-01: Landing Page (Wireframe Description)**
        *   **Header**: "Track ur Dreams" logo/title, rendered in a soft, rounded font, with a subtle glow. Likely includes a "Sign In" link (less prominent than the main CTA).
        *   **Hero Section**: A large, inviting area featuring a soft gradient background (e.g., misty blue blending into lavender) with subtle, slow-floating abstract shapes (like gentle clouds or stars). A compelling tagline such as \"Unlock the Secrets of Your Subconscious\" or \"Your Dreams, Decoded\" in a friendly, rounded font.
        *   **Product Description**: Concise, evocative text describing the app's purpose: track dreams, gain AI insights from Gemini, and discover patterns. The text uses a clean, easy-to-read body font.
        *   **Primary Call to Action (CTA)**: A prominent, central text area/textbox. Labelled \"Share Your Dream Here...\" or \"What did you dream?\". This input field should have soft, rounded borders and a gentle, ambient glow.
        *   **Secondary CTA**: A button directly below the dream text area, labelled \"Unveil My Dream\" or \"Submit Dream\". This button will feature a shimmering gold or soft mint green accent and a gentle pulse effect on hover.
        *   **Footer**: Standard links to \"Privacy Policy\" and \"Terms of Service\".

    *   **Interaction Pattern**:
        1.  User arrives at L-01 and engages with the product description.
        2.  User types their dream into the designated text area.
        3.  User clicks the \"Unveil My Dream\" button. The button gently pulses as it's clicked.
        4.  **System Action**: The app temporarily stores the dream text. A soft, semi-transparent modal (M-01) gently fades into view, overlaying the Landing Page.

    *   **M-01: Sign-up/Sign-in Modal (Wireframe Description)**
        *   A modal with soft, rounded corners and a subtle gradient background, providing a dreamy overlay.
        *   **Heading**: \"Ready to explore your dreams?\" in a friendly, rounded font.
        *   **Subheading**: \"Create an account to save your dream and get personalized insights.\"
        *   **Primary Authentication Options**: Large, prominent buttons for \"Sign in with Google\" and \"Sign in with Apple\". These buttons incorporate shimmering gold or mint green accents and a gentle hover glow.
        *   **Secondary Authentication Option**: A clear link or smaller button labelled \"Or sign up with Email & Password\" for alternative registration.
        *   **Legal Disclaimer**: Small text at the bottom: \"By continuing, you agree to our Privacy Policy and Terms of Service.\"

    *   **Interaction Pattern (Continued)**:
        5.  User selects their preferred sign-up method (e.g., \"Sign in with Google\").
        6.  **System Action**: User is securely redirected to the chosen third-party authentication provider (e.g., Google's login page).
        7.  **User Action**: User completes the authentication process.
        8.  **System Action**: Upon successful authentication, a new user account is created (or an existing one linked). The dream submitted in step 3 is now permanently associated with this new account. The modal gently fades out, and the user is redirected to their personalized Dashboard (D-01).

***

**2. User Journey: Existing User - Signing In**

*   **Goal**: An existing user accesses their account.
*   **Entry Point**: Landing Page (L-01) or a dedicated Sign-in Page (S-01).

    *   **S-01: Sign-in Page (Wireframe Description)**
        *   This page would mirror the design and content of M-01 but as a full-page experience, enveloped in the app's dreamy aesthetic. Soft gradients, rounded elements, and gentle typography.

    *   **Interaction Pattern**:
        1.  User navigates to the app. They either click a \"Sign In\" link on L-01 or land directly on S-01.
        2.  User selects their preferred sign-in method (e.g., \"Sign in with Apple\").
        3.  **System Action**: User is securely redirected to the chosen third-party authentication provider.
        4.  **User Action**: User completes the authentication process.
        5.  **System Action**: Upon successful authentication, the user is redirected to their Dashboard (D-01).

***

**3. User Journey: Submitting a New Dream (from Dashboard)**

*   **Goal**: An authenticated user records a new dream entry.
*   **Entry Point**: Dashboard Page (D-01)

    *   **D-01: Dashboard Page (Wireframe Description)**
        *   **Header**: Features the "Track ur Dreams" logo/title. Includes prominent links/icons for \"New Dream\" (or a large '+' icon with a shimmering accent) and a \"Profile\" icon/link, all softly styled.
        *   **Main Content Area**: A visually appealing grid or list of existing dream entries, presented as \"Dream Cards\". The background will feature subtle gradients and soft textures.
        *   **Dream Card (Example)**: Each card will have soft, rounded edges and a gentle shadow, giving a floating impression. It will display the Dream Title, Date, a small Mood emoji, and relevant Tags. Hovering over a card could trigger a gentle glow.
        *   **Add New Dream CTA**: A clear, easily discoverable button or large icon, such as a prominent \"Record a New Dream\" button or a large, pulsating '+' symbol, designed with the app's accent colors (gold/mint green) and rounded aesthetics.

    *   **Interaction Pattern**:
        1.  User is on D-01 and wishes to record a new dream.
        2.  User clicks the \"New Dream\" button/icon. The button provides subtle haptic feedback or a visual "press" animation.
        3.  **System Action**: User is gently transitioned (e.g., a soft fade or slide animation) to the New Dream Submission Page (ND-01).

    *   **ND-01: New Dream Submission Page (Wireframe Description)**
        *   **Header**: \"Record Your Dream\" in a rounded font, accompanied by a clear \"Back to Dashboard\" link/icon.
        *   **Dream Text Input**: A large, multi-line text area, clearly labelled \"What did you dream?\". This is the primary required field, designed with soft borders. Placeholder text like \"Describe your dream in as much detail as you can remember...\" is present.
        *   **Meta Information Inputs (Optional)**: These fields are presented simply and cleanly, encouraging quick input:
            *   **Title**: A single-line text input for a short name, labelled \"Dream Title (optional)\".
            *   **Mood**: A row of visually distinct emoji buttons (e.g., 😊 Happy, 😢 Sad, 😨 Scared, 😐 Neutral, 😕 Confused). Users click to select, and the selected emoji might gently pulse.
            *   **Tags/Categories**: A multi-select input or simple text input that allows users to add quick tags like \"Nightmare\", \"Lucid\", \"Recurring\", \"Adventure\", \"Weird\". Tags appear as soft, pill-shaped elements.
            *   **Sleep Quality**: A simple 1-5 star rating component, with stars that gently glow upon selection.
            *   **Date**: Auto-filled to the current date, with an option to edit via a soft-styled date picker.
        *   **Submit Button**: A prominent \"Save Dream\" button at the bottom, designed with accent colors and a gentle shimmer on hover. It should gently fade away like mist after being clicked.

    *   **Interaction Pattern (Continued)**:
        4.  User types their dream story into the main text area.
        5.  User optionally fills in the meta information fields by clicking/selecting.
        6.  User clicks the \"Save Dream\" button. The button animates softly.
        7.  **System Action**: The dream and its associated meta-information are saved to the Supabase database. A brief, gentle notification (e.g., \"Dream Saved!\") appears and fades away. The user is then smoothly redirected back to the Dashboard (D-01), where their new dream card is now visible.

***

**4. User Journey: Viewing a Dream & Its AI Insight**

*   **Goal**: User reviews a recorded dream and its Gemini AI insight.
*   **Entry Point**: Dashboard Page (D-01)

    *   **Interaction Pattern**:
        1.  User is on D-01 and sees their list of Dream Cards.
        2.  User clicks on a specific Dream Card they wish to review. The card might briefly expand or glow on click.
        3.  **System Action**: User is smoothly transitioned (e.g., soft dissolve) to the Dream Details Page (DD-01).

    *   **DD-01: Dream Details Page (Wireframe Description)**
        *   **Header**: A clear \"Back to Dashboard\" link/icon, gently styled, allowing easy navigation back.
        *   **Dream Title**: The title of the dream displayed prominently in a large, rounded, friendly font.
        *   **Meta Information Block**: A neatly organized section displaying the captured meta-information:
            *   \"Date:\" [Auto-filled date]
            *   \"Mood:\" [Selected emoji/word]
            *   \"Tags:\" [List of soft, pill-shaped tags]
            *   \"Sleep Quality:\" [Star rating]
        *   **Dream Text Display**: The full, unedited dream text is displayed in an easy-to-read body font, within a soft, contained block.
        *   **AI Insight Section**: This section is visually distinct, perhaps with a subtle background gradient or a gentle, ambient glow around it.
            *   **Heading**: \"Your AI Insight\" in an accent color (shimmering gold/mint green) and rounded font.
            *   **Insight Text (Conditional)**: If the user is a premium subscriber OR a free user with available insights (under 5 used):
                *   The analysis from Gemini AI will appear here, acting as a helpful guide (identifying themes/symbols, noting emotion, connecting to waking life). The text will be concise and reflective, not declarative.
            *   **DD-01a: Free Tier Limitation Display (Conditional)**: If the user is on the free tier and attempts to view their 6th insight:
                *   Instead of insight text, a friendly but firm message: \"You've used your 5 free insights for now!\" will be displayed.
                *   Directly below, a prominent Call to Action (CTA) button: \"Unlock Unlimited Insights\" or \"Upgrade to Premium\". This button will be designed with accent colors and a gentle pulse.

    *   **Interaction Pattern (Free Tier Limit Hit)**:
        4.  If DD-01a is displayed (user hit free insight limit):
            *   **System Action**: A soft modal (M-02) gently slides or fades into view, overlaying the content.

    *   **M-02: Upgrade Pop-up (Wireframe Description)**
        *   A dreamy, semi-transparent modal with rounded corners.
        *   **Heading**: \"You've used your 5 free insights!\" in a friendly, rounded font.
        *   **Body**: \"Upgrade to unlimited AI insights for just $5/month and continue your journey of self-discovery.\"
        *   **Primary CTA**: \"Upgrade Now\" button, visually prominent with shimmering accents and a gentle hover glow.
        *   **Secondary CTA**: \"Maybe Later\" or \"No Thanks\" link/button, less prominent, to dismiss the modal.

    *   **Interaction Pattern (Continued)**:
        5.  User clicks the \"Upgrade Now\" button on M-02.
        6.  **System Action**: User is smoothly redirected to the \"Plans\" page (P-01).

***

**5. User Journey: Upgrading to Subscription**

*   **Goal**: User subscribes to the premium tier for unlimited AI insights.
*   **Entry Point**: \"Plans\" Page (P-01) (either from M-02 or via Profile/Settings).

    *   **P-01: Plans Page (Wireframe Description)**
        *   **Header**: \"Choose Your Plan\" in a rounded font, with a \"Back\" link/icon.
        *   **Plan Card (Single Plan)**: A central, beautifully designed card for the subscription plan, featuring soft gradients and rounded edges. It will clearly display:
            *   **Title**: \"Unlimited Insights Premium\" (or similar).
            *   **Features**: \"Unlimited AI insights\", \"Ad-free experience\", \"Priority support\", etc.
            *   **Price**: Prominently displayed as \"$5/month\".
            *   **Billing Options (Future)**: (Currently only monthly, but future-proofed) A toggle or selection for \"Monthly\" vs. \"Annually\" billing.
            *   **Call to Action**: A large, inviting \"Subscribe Now\" button, rendered in shimmering gold or mint green, with a gentle pulsing effect on hover.
        *   **\"Billing\" Section/Link**: A smaller, less prominent section or link (e.g., \"Already subscribed? Manage your billing here\") for existing subscribers.

    *   **Interaction Pattern**:
        1.  User arrives at P-01.
        2.  User reviews the plan details.
        3.  User clicks the \"Subscribe Now\" button.
        4.  **System Action**: User is securely redirected to the Stripe Checkout page. (This is an external, Stripe-hosted page, adhering to Stripe's UI).
        5.  **User Action**: User enters their payment details on the secure Stripe checkout form and confirms payment.
        6.  **System Action**: Stripe processes the payment. Upon successful transaction, Stripe notifies the \"Track ur Dreams\" backend via webhooks.
        7.  **System Action**: The user's account status is instantly upgraded to premium in the database. A confirmation message or a dedicated Subscription Confirmation Page (SC-01) is displayed.

    *   **SC-01: Subscription Confirmation Page (Wireframe Description)**
        *   A joyful, dreamy page with a celebratory message.
        *   **Heading**: \"Congratulations! You're now a Premium Dreamer!\" (or similar) in a prominent, rounded font.
        *   **Body**: \"Enjoy unlimited AI insights and explore the depths of your subconscious without limits.\"
        *   **CTA**: \"Go to Dashboard\" or \"View My Dreams\" button, designed with accent colors and a gentle glow, to guide the user back into the app.

    *   **Interaction Pattern (Continued)**:
        8.  User clicks the \"Go to Dashboard\" button.
        9.  **System Action**: User is redirected to D-01, now with full access to all AI insights.

***

**6. User Journey: Managing Profile / Account**

*   **Goal**: User views and manages their account information, subscription, and data.
*   **Entry Point**: Dashboard Page (D-01) via \"Profile\" link/icon.

    *   **Interaction Pattern**:
        1.  User is on D-01.
        2.  User clicks the \"Profile\" icon/link in the header.
        3.  **System Action**: User is smoothly transitioned to the \"Profile\" Page (PR-01).

    *   **PR-01: Profile Page (Wireframe Description)**
        *   **Header**: \"My Profile\" in a rounded font, with a \"Back\" link/icon to return to the Dashboard.
        *   **Layout**: Sections are clearly delineated with soft dividers or subtle card-like structures, reflecting the app's aesthetic.
        *   **User Information Section**:
            *   **Email Address**: Displays the user's registered email. An \"Edit\" button/icon (small, with a subtle hover effect) is adjacent, allowing modification.
            *   **Password**: A \"Reset Password\" button. (For email/password users; for OAuth users, it might indicate "Managed by Google/Apple").
        *   **Subscription Status Section**:
            *   **If Premium**: \"Your Plan: Unlimited Insights Premium\". A \"Manage Subscription\" link which navigates to the \"Billing\" section within the P-01 (Plans page).
            *   **If Free**: \"Current Plan: Free Tier\". A prominent \"Upgrade Now\" button, designed with accent colors, that navigates to P-01.
        *   **Data Management Section (User Control Emphasis)**:
            *   **Export Data**: A button labelled \"Export My Data\". This will initiate a download of all user data (dreams, meta-info) in a standard format (e.g., JSON or CSV).
            *   **Delete Account**: A prominent, clearly visible button labelled \"Delete My Account\". This button should be styled with a cautious color (e.g., soft red) to indicate its irreversible nature.
        *   **Legal Links**: Clear links to the full \"Privacy Policy\" and \"Terms of Service\", emphasizing transparency.

    *   **Interaction Pattern (Edit Email)**:
        4.  User clicks the \"Edit\" button next to their email address.
        5.  **System Action**: A soft modal (M-03) appears.

    *   **M-03: Edit Email Modal (Wireframe Description)**
        *   Modal with rounded corners.
        *   **Heading**: \"Update Your Email Address\".
        *   **Input Field 1**: \"New Email Address\" (for the updated email).
        *   **Input Field 2**: \"Current Password\" (required for security confirmation).
        *   **Buttons**: \"Save Changes\" (accent-colored) and \"Cancel\" (secondary style).

    *   **Interaction Pattern (Continued)**:
        6.  User enters new email and current password, clicks \"Save Changes\".
        7.  **System Action**: Email is updated (potentially requiring a re-verification email). A confirmation message (e.g., \"Email updated successfully!\") appears and fades.

    *   **Interaction Pattern (Reset Password)**:
        8.  User clicks \"Reset Password\" (if applicable).
        9.  **System Action**: A password reset email is triggered and sent to their registered address. A temporary on-screen message confirms this (e.g., \"Password reset link sent to your email!\").

    *   **Interaction Pattern (Delete Account)**:
        10. User clicks \"Delete My Account\".
        11. **System Action**: A critical confirmation modal (M-04) appears, emphasizing the severity of the action.

    *   **M-04: Delete Account Confirmation Modal (Wireframe Description)**
        *   Prominent, cautious modal.
        *   **Heading**: \"Are you absolutely sure?\" (or similar warning).
        *   **Body**: \"This action is permanent and irreversible. All your dreams, insights, and personal data will be permanently deleted from our servers. This cannot be undone.\"
        *   **Confirmation Input**: A text input field labelled \"Type 'DELETE' to confirm\" (for an explicit, deliberate action).
        *   **Buttons**: A red \"Confirm Deletion\" button (initially disabled until 'DELETE' is typed) and a \"Cancel\" button.

    *   **Interaction Pattern (Continued)**:
        12. User carefully reads the warning, types \"DELETE\" into the input field, and then clicks \"Confirm Deletion\".
        13. **System Action**: The user's account and all associated data are permanently purged from the database, adhering to privacy and security protocols (encryption at rest, user control). The user is logged out and redirected to the Landing Page (L-01).

***

**7. User Journey: Data Export**

*   **Goal**: User downloads a copy of all their personal data stored in the app.
*   **Entry Point**: Profile Page (PR-01)

    *   **Interaction Pattern**:
        1.  User is on PR-01.
        2.  User clicks the \"Export My Data\" button.
        3.  **System Action**: The backend securely retrieves all data associated with the user's account. This data is then compiled into a common, machine-readable format (e.g., JSON or CSV).
        4.  **System Action**: The browser initiates a download of the generated data file.
        5.  **UI Feedback**: A brief, gentle notification appears (e.g., \"Your data export has started. Check your downloads folder!\") and fades away.

***

**Overall Interaction Patterns & Aesthetic Notes (Integrated Throughout):**

*   **Color Palette**: Dominance of soft, hazy lavenders, misty blues, gentle pinks, and warm grays. Accent colors like shimmering gold or soft mint green are used sparingly for interactive elements (buttons, highlights) to convey a sense of magic and highlight important actions.
*   **Typography**: Headlines use a rounded, soft sans-serif font for a friendly and gentle feel. Body text, especially for dream narratives and AI insights, uses a very clean, highly legible font to ensure comfort in reading.
*   **Imagery & Textures**: Backgrounds frequently utilize soft gradients that smoothly blend colors. Subtle cloud-like textures or soft light effects are layered to enhance the dreamlike quality. Sharp edges and harsh shadows are strictly avoided.
*   **Animations & Transitions**: All interactions are designed to feel fluid and gentle. Buttons will have subtle glows or slow pulses on hover. Page transitions will employ soft fades or gentle slides. Elements like modals will gracefully appear and disappear, avoiding abrupt changes. Small, abstract, amorphous shapes will slowly float in the background of key pages (like the landing and dashboard) to maintain the surreal atmosphere.
*   **Responsiveness**: The entire UI will be fully responsive, adapting seamlessly to various screen sizes while maintaining its aesthetic integrity.
*   **Privacy & Transparency**: Wherever sensitive data is handled (e.g., account deletion, AI processing), brief, clear on-screen messages or links to the comprehensive Privacy Policy will reinforce user control and data privacy.

## Styling Guidelines
STYLING GUIDELINES

**1. Introduction**
The "Track ur Dreams" web application aims to provide a serene, intuitive, and visually enchanting experience that aligns with the mystical and introspective nature of dreams. Our styling principles are centered around creating a "dreamlike" atmosphere – soft, gentle, magical, and a little surreal – making users feel as though they are interacting with a cloud or a cherished memory.

**2. Design Principles (UI/UX)**
*   **Dreamy & Serene:** Evoke a sense of calm, wonder, and introspection. The aesthetic should be soothing, encouraging users to relax and explore their subconscious. Avoid anything jarring or visually noisy.
*   **Intuitive & Effortless:** The user experience should be seamless and straightforward, minimizing cognitive load. Especially for dream entry, the process must be quick and simple to capture fleeting memories.
*   **Personal & Reflective:** The design should support individual exploration and self-improvement, presenting insights in an accessible and non-overwhelming manner, consistent with the AI acting as a helpful guide.
*   **Consistent & Cohesive:** Maintain a unified visual language across all pages and components to build trust and familiarity.
*   **Accessible:** Ensure high readability, sufficient color contrast, and clear interactive elements for a broad user base (adults 18-50+, and potentially younger/older users interested in self-improvement and mindfulness).

**3. Color Palette**
Our color palette uses soft, hazy hues reminiscent of dawn, dusk, and the ethereal quality of dreams, accented with shimmering elements.

*   **Primary Hues (Backgrounds, Main Text, Soft Elements):**
    *   **Lavender Mist:** #D8BFD8 (Soft, calming purple for backgrounds and subtle accents)
    *   **Misty Blue:** #B0C4DE (Gentle, introspective blue for backgrounds and secondary elements)
    *   **Soft Pink:** #FFDAB9 (Warm, delicate peach/pink for gradients and subtle highlights)
    *   **Warm Gray:** #F0F0F0 (Neutral, grounding, off-white for main content backgrounds and card fills)

*   **Accent Hues (Buttons, Highlights, Interactive Elements, CTA):**
    *   **Shimmering Gold:** #FFD700 (Adds a touch of magic, premium feel, and draws attention to primary calls-to-action like "Upgrade to Unlimited" or "Submit Dream")
    *   **Soft Mint Green:** #98FB98 (Fresh, subtle highlight for positive feedback, success messages, or secondary interactive elements)

*   **Text Colors:** A soft charcoal (#333333) or dark variations of the primary hues will be used for body text to ensure readability against light backgrounds, while accent colors can be used for highlighted text.

**4. Typography**
Typography is chosen for its friendliness, readability, and ability to convey a soft, modern aesthetic.

*   **Headlines (H1, H2, H3):**
    *   **Font Family:** Montserrat (or similar rounded, modern sans-serif like "Quicksand" or "Inter SemiBold").
    *   **Characteristics:** Friendly, gentle, and easily legible. Used for page titles, section headings, and dream titles.
    *   **Usage:**
        *   H1: Landing Page Title ("Track ur Dreams"), Dashboard Main Title ("Your Dreams")
        *   H2: Section Headings (e.g., "AI Insight", "Record a New Dream")
        *   H3: Sub-headings (e.g., "Date", "Mood", "Tags", "Your AI Insight")

*   **Body Text (Paragraphs, Form Inputs, Labels):**
    *   **Font Family:** Inter (or similar clean, highly readable sans-serif like "Roboto" or "Open Sans").
    *   **Characteristics:** Very clean, easy-to-read, ensuring dream stories and AI insights are presented without visual fatigue.
    *   **Usage:** All paragraph text, full dream descriptions, AI insights, form input text, and small descriptive labels.

*   **Accessibility:** Ensure sufficient font sizes and line heights for comfortable reading. Text colors will always have a minimum contrast ratio of 4.5:1 against their background, adhering to WCAG guidelines.

**5. Imagery, Textures, & Visual Elements**
Visuals will reinforce the dreamlike, ethereal quality of the application.

*   **Gradients:** Soft, multi-color gradients are central to the aesthetic. These will blend primary hues (e.g., Misty Blue seamlessly transitioning into Lavender Mist or Soft Pink) and be used extensively for backgrounds of pages, cards, and hero sections.
*   **Backgrounds:** Instead of flat colors, backgrounds will feature very subtle cloud-like textures, soft light effects, or gentle, blurred patterns that evoke a sense of depth and atmosphere. These should be non-distracting and serene.
*   **Shapes & Illustrations:** Organic, abstract shapes (soft blobs, wispy forms, stylized stars, moon phases) will be used as decorative elements, particularly on the landing page and empty states. Avoid sharp edges or geometric rigidity.
*   **Borders & Shadows:** Elements like cards, buttons, and input fields will feature rounded corners. Shadows will be soft, diffused, and subtle, giving a sense of gentle elevation rather than harsh depth, rather than sharp, hard lines.
*   **Icons:** Simple, minimalist line-art or softly filled icons that align with the overall gentle aesthetic. For "Mood" selection, clear and expressive emojis are preferred for quick input.

**6. Interactions & Animations**
Animations will be subtle, smooth, and reinforce the feeling of magic and gentleness, rather than being abrupt or jarring.

*   **Hover States:** Interactive elements (buttons, links, clickable cards) will exhibit a gentle glow, a subtle pulse, or a soft, almost imperceptible shift in color when hovered over. This provides clear feedback without being aggressive.
*   **Transitions:** Page transitions and component appearances/disappearances will use smooth fade-ins/outs or gentle, short-duration slide animations (e.g., a card sliding into view) to maintain fluidity and a premium feel.
*   **Form Submissions:** Upon submitting a dream (e.g., on the landing page or dashboard), the input area or a confirmation message might gently fade away like mist, offering a visual cue of successful submission and integration into the user's dream log.
*   **Ambient Animations:** The landing page and dashboard might feature small, abstract shapes (like stars or soft blobs) that float slowly and continuously in the background, adding to the ethereal atmosphere without distracting from the main content.

**7. Component Styling Guidelines**
Specific styling for common UI components, aligning with the "shadcn" approach for modularity and consistency.

*   **Buttons (Primary/Secondary):** Rounded corners (e.g., `rounded-full` or `rounded-lg`), soft gradient backgrounds using primary hues, or solid colors from the accent palette (Shimmering Gold for primary CTAs). Gentle hover glow. Text color will ensure high contrast.
*   **Input Fields:** Soft, subtle borders (e.g., `border-gray-300`). Focus states will use a gentle glow or a thin, accent-colored border (e.g., `ring-2 ring-lavender-mist`). Placeholder text will be in a lighter shade of the body text color. The large text area for dream entry will clearly expand and be inviting.
*   **Cards/Containers:** Used for displaying individual dreams or sections (e.g., AI insight). Rounded corners, subtle background fills (often soft gradients or lighter primary hues), and diffused `shadow-md` or `shadow-lg` to lift them slightly from the background.
*   **Navigation:** Minimalist and clear. Active links might be indicated by a soft underline or a subtle background highlight in an accent color. Dropdowns will maintain rounded corners and soft styling.
*   **Modals/Pop-ups:** Semi-transparent overlay backgrounds (e.g., `bg-black/50`). The modal itself will have rounded corners, soft background, and appear with a gentle fade-in animation. This is critical for the subscription upgrade prompt ("You've used your 5 free insights!").
*   **Notifications & Alerts:** Non-intrusive, appearing with a soft fade, using accent colors (e.g., Soft Mint Green for success, a soft red for errors) and clear, concise messaging.

**8. Tone & Voice (UI Copy)**
The language used in the UI should align with the dreamy and reflective aesthetic, making the user feel understood and guided.

*   **Friendly & Supportive:** The AI acts as a "helpful guide," and the language throughout should be encouraging, empathetic, and non-judgmental. Avoid clinical or overly technical terms.
*   **Intriguing & Reflective:** Encourage users to ponder their dreams and insights. Use words that evoke wonder and personal discovery.
*   **Simple & Clear:** Especially for Calls to Action (CTAs) and error messages, ensure clarity and directness without being overly formal or verbose.

This styling guide ensures that "Track ur Dreams" provides a consistent, beautiful, and emotionally resonant experience for its users, reflecting the magic and mystery of the dream world.
