# Copilot Instructions for EAO Codebase

## Overview
This document provides essential guidance for AI coding agents working within the EAO codebase. Understanding the architecture, workflows, and conventions is crucial for effective contributions.

## Architecture
- **Main Components**: The application is structured around React components, with a focus on modularity. Key directories include:
  - `src/pages`: Contains the main pages of the application, each represented as a React component.
  - `src/components`: Houses reusable components like `Header` and `Footer`.
  - `src/router`: Manages routing using `react-router-dom`, defining routes in `config.tsx`.

- **Data Flow**: Data is passed through props and context, with significant use of React's Context API for state management. Components often rely on lazy loading for performance optimization.

## Developer Workflows
- **Building the Project**: Use `npm run build` to compile the project. Ensure all dependencies are installed via `npm install` before building.
- **Testing**: Run tests using `npm test`. Ensure that tests are written in the same directory as the components they cover.
- **Debugging**: Utilize browser developer tools for debugging. Console logs are often used for tracking state changes and component lifecycle events.

## Project-Specific Conventions
- **File Naming**: Use PascalCase for component files (e.g., `AboutPage.tsx`) and camelCase for utility functions (e.g., `fetchData.js`).
- **Styling**: Tailwind CSS is used for styling. Classes are applied directly in JSX, following a utility-first approach.

## Integration Points
- **External Dependencies**: The project integrates with external services like PostHog for analytics. Ensure to check the `assets/index-CWbBFHrh.js` for CDN links and configurations.
- **Cross-Component Communication**: Components communicate primarily through props and context. For global state management, consider using context providers defined in `src/router/config.tsx`.

## Examples
- **Routing Example**: The `App.tsx` file sets up the main routing structure using `BrowserRouter` and `AppRoutes`.
- **Component Example**: The `AboutPage` component demonstrates how to structure a page with sections and lists, utilizing Tailwind CSS for layout.

## Conclusion
This document serves as a foundational guide for AI agents to navigate and contribute effectively to the EAO codebase. For further details, refer to specific component files and the overall project structure.