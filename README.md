# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
Vite Commands:
Command         	     Description
npm run dev   	  Run development server with HMR
npm run build	  Build the app for production (output in dist)
npm run preview	  Preview the production build locally
***************************************************************************************************************************************
Install dependencies:
npm install
This will install all required packages including:
react, react-dom,
vite,
@vitejs/plugin-react,
@tanstack/react-query,
axios, chart.js, react-chartjs-2,
recharts, zustand, react-router-dom, etc.

****************************************************************************************************************************************
To Run the Code on GitHub Pages:
Install gh-pages  development dependency in vs code:  npm install --save-dev gh-pages,
deploy:  npm run deploy,
build:  npm run build,
use pages in Github with source(Depoly from a branch),branch(gh-pages and (/root)) for live Deployment
