# Portfolio Website

A modern, responsive portfolio website built with Next.js, React, and Tailwind CSS. This website showcases projects, skills, certifications, and contact information.

## Features

- 🎨 Modern and responsive design
- 🚀 Built with Next.js 14 and React 18
- 🎭 Smooth animations with Framer Motion
- 🎯 3D model viewer integration using Google Model Viewer
- 📱 Fully responsive across all devices
- ⚡ Fast page loads with Next.js optimization
- 🎨 Styled with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Models**: @google/model-viewer
- **Icons**: React Icons
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-website-github.git
cd portfolio-website-github
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
portfolio-website-github/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   └── projects/          # Project detail pages
├── components/             # React components
│   ├── About.tsx
│   ├── Certifications.tsx
│   ├── Contact.tsx
│   ├── Hero.tsx
│   ├── ModelViewer.tsx
│   ├── Navigation.tsx
│   ├── ProjectDetail.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── data/                   # Data files
│   └── projects.ts        # Project data
├── public/                 # Static assets
│   ├── images/            # Image files
│   └── videos/            # Video files
└── package.json           # Dependencies
```

## Customization

### Adding Projects

Edit `data/projects.ts` to add or modify projects. Each project should follow the `Project` interface structure.

### Styling

The project uses Tailwind CSS for styling. Modify `tailwind.config.js` to customize the design system.

### Components

All components are located in the `components/` directory. You can modify or add new components as needed.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For questions or inquiries, please use the contact form on the website or open an issue on GitHub.
