import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';

import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

import OutdoorPage from './pages/OutdoorPage';
import IndoorPage from './pages/IndoorPage';
import SleepPage from './pages/SleepPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />

        <Route
          path="/outdoor"
          element={
            <Layout>
              <OutdoorPage />
            </Layout>
          }
        />

        <Route
          path="/indoor"
          element={
            <Layout>
              <IndoorPage />
            </Layout>
          }
        />

        <Route
          path="/sleep"
          element={
            <Layout>
              <SleepPage />
            </Layout>
          }
        />

        <Route
          path="/reports"
          element={
            <Layout>
              <ReportsPage />
            </Layout>
          }
        />

        <Route
          path="/settings"
          element={
            <Layout>
              <SettingsPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;