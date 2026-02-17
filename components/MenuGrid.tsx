import React from 'react';
import { MENU_ITEMS } from '../constants';
import { Button } from './Button';
import { Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MenuGridProps {
  onShowMenu: () => void;
}

export const MenuGrid: React.FC<MenuGridProps> = ({ onShowMenu }) => {
  const { addToCart } = useCart();
  const featuredItems = MENU_ITEMS.filter(item => item.popular).slice(0, 3);

  return (
    <section id="menu" className="py-24 bg-bakery-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">Weekly Favorites</h2>
            <p className="text-lg text-gray-600">Our most-loved breads and treats, baked fresh and delivered to your doorstep. Each item is made with 100% organic flour.</p>
          </div>
          <Button onClick={onShowMenu} variant="outline" className="border-bakery-600 text-bakery-600 hover:bg-bakery-600 hover:text-white shrink-0">
            Browse Full Menu
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredItems.map((item) => (
            <div key={item.id} className="group bg-white rounded-[2.5rem] border border-bakery-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full font-bold text-bakery-900 shadow-sm border border-bakery-50">
                  ${item.price.toFixed(2)}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-1 text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">{item.name}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-sm">{item.description}</p>
                <Button 
                  onClick={() => addToCart(item)}
                  className="w-full py-6 rounded-2xl group-hover:bg-accent-blue transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Order
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
