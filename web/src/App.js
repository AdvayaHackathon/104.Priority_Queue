import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CareChainWelcome from "./WelcomePage";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import UploadPrescription from "./pages/UploadPrescription";
import DrugInteractions from "./pages/DrugInteractions";
import RiskReports from "./pages/RiskReports";
import WellnessPlan from "./pages/WellnessPlan";
import ReadmissionPredictor from "./pages/ReadmissionPredictor";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CareChainWelcome />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/upload" element={<UploadPrescription />} />
                <Route path="/interactions" element={<DrugInteractions />} />
                <Route path="/risks" element={<RiskReports />} />
                <Route path="/wellness" element={<WellnessPlan />} />
                <Route path="/readmission" element={<ReadmissionPredictor />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
