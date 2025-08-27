## 🌐 Live Demo

**Hosted Application:** [https://smashtaps-dashboard.vercel.app/](https://smashtaps-dashboard.vercel.app/)

**GitHub Repository:** [https://github.com/devcamarasinghe/smashtaps-dashboard](https://github.com/devcamarasinghe/smashtaps-dashboard)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devcamarasinghe/smashtaps-dashboard.git
   cd smashtaps-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```


## 🧪 Testing

```bash
# Run tests once
npm test
```

**Test Coverage:**
- ✅ Hook testing (`useChartData`)
- ✅ Chart data generation logic
- ✅ State management behavior
- ✅ Filtering and report generation

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── charts/         # Chart components
│   └── filters/        # Filter components
├── hooks/              # Custom React hooks
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── __tests__/          # Unit tests
    └── hooks/          # Hook tests
```

## 🎯 Key Components

### Charts
- **PieChart** - Category distribution visualization
- **BarChart** - Product price comparison with filtering

### Filters
- **CategoryFilter** - Filter products by category
- **ProductFilter** - Select specific products for reports
- **ReportGenerator** - Generate filtered chart reports

### State Management
- **filterStore** - Global state for filters and selections
- **TanStack Query** - Server state management for API data
