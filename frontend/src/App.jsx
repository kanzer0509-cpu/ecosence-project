import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import OutdoorPage from './pages/OutdoorPage';
import IndoorPage from './pages/IndoorPage';
import SleepPage from './pages/SleepPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<OutdoorPage />} />
          <Route path="/outdoor" element={<OutdoorPage />} />
          <Route path="/indoor" element={<IndoorPage />} />
          <Route path="/sleep" element={<SleepPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;