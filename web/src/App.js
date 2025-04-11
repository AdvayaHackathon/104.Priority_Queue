import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
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
import PatientRiskReport from "./pages/patient/PatientRiskReport";
import PatientDrugInteractions from "./pages/patient/PatientDrugInteractions";
import PatientWellnessPlan from "./pages/patient/PatientWellnessPlan";
import PatientCheckup from "./pages/patient/PatientCheckup";
import PatientDetails from "./pages/patient/PatientDetails";
import NewCheckup from "./pages/patient/NewCheckup";
import CareChainWelcome2 from "./WelcomePag";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CareChainWelcome2 />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/patients" element={<Patients />} />
                  <Route
                    path="/patients/:id/details"
                    element={<PatientDetails />}
                  />
                  <Route
                    path="/patients/:id/risk-report"
                    element={<PatientRiskReport />}
                  />
                  <Route
                    path="/patients/:id/drug-interactions"
                    element={<PatientDrugInteractions />}
                  />
                  <Route
                    path="/patients/:id/wellness-plan"
                    element={<PatientWellnessPlan />}
                  />
                  <Route
                    path="/patients/:id/checkup"
                    element={<PatientCheckup />}
                  />
                  <Route
                    path="/patients/:id/new-checkup"
                    element={<NewCheckup />}
                  />
                  <Route path="/upload" element={<UploadPrescription />} />
                  <Route path="/interactions" element={<DrugInteractions />} />
                  <Route path="/risks" element={<RiskReports />} />
                  <Route path="/wellness" element={<WellnessPlan />} />
                  <Route
                    path="/readmission"
                    element={<ReadmissionPredictor />}
                  />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
