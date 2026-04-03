import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { CorruptionMap } from './pages/CorruptionMap';
import { DistrictDetails } from './pages/DistrictDetails';
import { Contracts } from './pages/Contracts';
import { ContractDetails } from './pages/ContractDetails';
import { Report } from './pages/Report';
import { AiInsights } from './pages/AiInsights';
import { AiInsightDetails } from './pages/AiInsightDetails';
import { About } from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="corruption-map" element={<CorruptionMap />} />
          <Route path="districts/:id" element={<DistrictDetails />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="contracts/:id" element={<ContractDetails />} />
          <Route path="report" element={<Report />} />
          <Route path="ai-insights" element={<AiInsights />} />
          <Route path="ai-insights/:id" element={<AiInsightDetails />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
