import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { About } from './components/About';
import { ChefServices } from './components/ChefServices';
import { MenuGrid } from './components/MenuGrid';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Chatbot } from './components/Chatbot';
import { FullMenu } from './components/FullMenu';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';

function AppContent() {
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (showFullMenu) {
    return (
      <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-bakery-200 selection:text-bakery-900">
        <FullMenu onBack={() => setShowFullMenu(false)} />
        <Chatbot />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-bakery-200 selection:text-bakery-900">
      <Header onShowMenu={() => setShowFullMenu(true)} onShowCart={() => setIsCartOpen(true)} />
      <main>
        <Hero onShowMenu={() => setShowFullMenu(true)} />
        <Features />
        <About />
        <ChefServices />
        <MenuGrid onShowMenu={() => setShowFullMenu(true)} />
        <Testimonials />
        <Contact />
      </main>
      <Chatbot />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
      <Analytics />
      <SpeedInsights />
    </CartProvider>
  );
}

export default App;
