import React from 'react';
import { ChefHat, Calendar, Users, Heart, Clock, Utensils } from 'lucide-react';
import { Button } from './Button';

export const ChefServices: React.FC = () => {
  const services = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Weekly Meal Prep",
      description: "Take the stress out of your week. Aunt Sarah prepares healthy, delicious meals in your kitchen, portioned and ready to heat and serve.",
      features: ["Customized Menus", "Dietary Restrictions Met", "Fresh, Organic Ingredients"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Private Dinner Parties",
      description: "Host an unforgettable evening. Aunt Sarah handles everything from menu design to cleanup, so you can focus on your guests.",
      features: ["3 to 5 Course Menus", "Professional Service", "Intimate Gatherings"]
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Special Events",
      description: "Celebrate life's big moments with artisanal food. From weddings to corporate retreats, we bring the flavor to you.",
      features: ["Buffet or Plated Options", "Seasonal Menus", "Wedding Cakes Included"]
    }
  ];

  return (
    <section id="chef-services" className="py-24 bg-bakery-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-bakery-800 rounded-full text-sm font-semibold mb-6 border border-bakery-200 shadow-sm">
            <ChefHat className="w-4 h-4 text-accent-blue" />
            <span>Professional Chef Services</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">Experience Fine Dining in Your Own Home</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Aunt Sarah brings her culinary expertise directly to your table. Whether you need weekly support or a one-of-a-kind celebration, we provide professional services tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-bakery-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-bakery-50 rounded-2xl flex items-center justify-center text-bakery-600 mb-8 group-hover:bg-bakery-600 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3 mb-10">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full border-bakery-200 text-bakery-600 hover:bg-bakery-600 hover:text-white hover:border-bakery-600">
                Inquire Now
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-bakery-900 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="relative z-10 flex-1">
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">Ready to book Aunt Sarah?</h3>
            <p className="text-bakery-200 text-lg mb-8 max-w-lg leading-relaxed">
              Schedule a free consultation to discuss your dietary needs, preferences, and how we can best serve your family.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-accent-blue hover:bg-accent-blue/90 text-white">
                Book a Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-bakery-900">
                Download Service Guide
              </Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <img 
              src="/images/in-home chef services.jpg" 
              alt="Chef preparing a meal" 
              className="rounded-3xl shadow-2xl w-full h-full object-cover max-h-[400px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Healthy & Organic</p>
                  <p className="text-sm text-gray-500">Every meal is prepared with care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
