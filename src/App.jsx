import { useState } from 'react';
import './index.css';
import HomePage from './HomePage';
import PurchasePage from './PurchasePage';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <>
      {page === 'home' && (
        <HomePage onGetStarted={() => setPage('purchase')} />
      )}
      {page === 'purchase' && (
        <PurchasePage onBack={() => setPage('home')} />
      )}
    </>
  );
}
