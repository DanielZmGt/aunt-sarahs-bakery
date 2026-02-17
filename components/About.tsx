import React from 'react';
import { Heart, Award, Leaf, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="/images/AS's.jpg" 
                alt="Aunt Sarah in her kitchen" 
                className="w-full h-full object-cover aspect-[4/5]"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-yellow rounded-full -z-10 blur-2xl opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-bakery-200 rounded-full -z-10 blur-3xl opacity-60"></div>
            
            <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl max-w-xs animate-in fade-in zoom-in duration-1000">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <span className="font-bold text-gray-900">Made with Love</span>
              </div>
              <p className="text-sm text-gray-600 italic">"Every recipe is a piece of my heart, shared with your family." - Aunt Sarah</p>
            </div>
          </div>

          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-bakery-50 text-bakery-800 rounded-full text-sm font-semibold mb-6 border border-bakery-100">
              <span className="text-accent-blue">★</span>
              <span>Our Story</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Bringing the Warmth of a <span className="text-bakery-600">Home Kitchen</span> to You.
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Aunt Sarah's started with a simple belief: that food should be more than just fuel—it should be a source of health, comfort, and connection. What began as baking sourdough for neighbors blossomed into a full-service culinary experience.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-bakery-100 rounded-xl flex items-center justify-center text-bakery-600">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">100% Organic</h4>
                  <p className="text-sm text-gray-600">Only the finest natural ingredients touch our dough.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-blue/10 rounded-xl flex items-center justify-center text-accent-blue">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Certified Quality</h4>
                  <p className="text-sm text-gray-600">Professional standards with a personal touch.</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-bakery-50 rounded-3xl border border-bakery-100">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-3xl font-bold text-bakery-900">15+</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Years Exp.</p>
                </div>
                <div className="w-px h-12 bg-bakery-200"></div>
                <div>
                  <p className="text-3xl font-bold text-bakery-900">500+</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Happy Families</p>
                </div>
                <div className="w-px h-12 bg-bakery-200"></div>
                <div>
                  <p className="text-3xl font-bold text-bakery-900">100%</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Handmade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
