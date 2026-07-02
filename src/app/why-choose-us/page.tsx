import { ShieldCheck, Truck, RefreshCw, Headphones, Star, Gem } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    { icon: <Gem size={40} />, title: "Premium Quality Fabrics", desc: "We source only the finest materials, ensuring every garment feels luxurious against your skin and stands the test of time." },
    { icon: <Star size={40} />, title: "Trendy & Exclusive Collections", desc: "Our design team constantly innovates to bring you exclusive pieces that blend modern trends with classic elegance." },
    { icon: <ShieldCheck size={40} />, title: "Secure Shopping", desc: "Your data and payments are protected with industry-leading encryption and robust security protocols." },
    { icon: <Truck size={40} />, title: "Fast Delivery", desc: "We partner with top-tier logistics providers to ensure your luxury items reach your doorstep quickly and safely." },
    { icon: <RefreshCw size={40} />, title: "Easy Returns", desc: "Not perfectly satisfied? Our hassle-free 14-day return policy makes exchanges and refunds effortless." },
    { icon: <Headphones size={40} />, title: "Responsive Support", desc: "Our dedicated customer care team is always ready to assist you with styling advice or order inquiries." }
  ];

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">Why Choose ETHENZAA?</h1>
        <div className="w-20 h-1 bg-accent mx-auto"></div>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">Discover the difference of shopping with a brand that puts luxury, quality, and customer satisfaction first.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {reasons.map((reason, idx) => (
          <div key={idx} className="bg-white p-10 border border-gray-100 rounded-lg text-center hover:shadow-xl hover:border-accent transition-all duration-300">
            <div className="text-accent mb-6 flex justify-center">{reason.icon}</div>
            <h3 className="font-serif text-xl text-primary mb-4">{reason.title}</h3>
            <p className="text-gray-600 leading-relaxed">{reason.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
