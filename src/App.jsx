import { useState } from 'react';
import './index.css';
import HomePage from './HomePage';
import PurchasePage from './PurchasePage';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="app-container">
      <div className="dev-banner">
        <span>⚠️</span>
        <strong>Prototype Mode:</strong>
        <span>This project is under development. For database, auth, email services, and fullstack roadmap plans, see the</span>
        <a href="https://github.com/vaibhavraj26/giftzone-online-gifts#readme" target="_blank" rel="noopener noreferrer">README Fullstack Roadmap</a>
      </div>
      <div className="page-content">
        {page === 'home' && (
          <HomePage onGetStarted={() => setPage('purchase')} />
        )}
        {page === 'purchase' && (
          <PurchasePage onBack={() => setPage('home')} />
        )}
      </div>
    </div>
  );
}

