import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Home is bundled eagerly for the fastest first paint; other pages load on demand.
const Consulting = lazy(() => import('./pages/Consulting'));
const Talks = lazy(() => import('./pages/Talks'));
const EpisodeDetail = lazy(() => import('./pages/EpisodeDetail'));
const About = lazy(() => import('./pages/About'));
const Network = lazy(() => import('./pages/Network'));
const Insights = lazy(() => import('./pages/Insights'));
const InsightDetail = lazy(() => import('./pages/InsightDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="consulting" element={<Consulting />} />
        <Route path="talks" element={<Talks />} />
        <Route path="talks/:slug" element={<EpisodeDetail />} />
        <Route path="about" element={<About />} />
        <Route path="network" element={<Network />} />
        <Route path="insights" element={<Insights />} />
        <Route path="insights/:slug" element={<InsightDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Legal doc="privacy" />} />
        <Route path="terms" element={<Legal doc="terms" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
