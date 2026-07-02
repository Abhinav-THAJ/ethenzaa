import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">Contact Us</h1>
        <div className="w-20 h-1 bg-accent mx-auto"></div>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">We would love to hear from you. Reach out to us for any queries, styling advice, or assistance with your orders.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-10">
          <div>
            <h2 className="font-serif text-2xl text-primary mb-6">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-bg-secondary p-4 rounded-full text-accent"><MapPin size={24} /></div>
                <div>
                  <h3 className="font-semibold text-text-main mb-1">Our Studio</h3>
                  <p className="text-gray-600">ETHENZAA LOOM FASHION LLP<br/>Infopark Phase 2, Kochi<br/>Kerala – 682303, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-bg-secondary p-4 rounded-full text-accent"><Phone size={24} /></div>
                <div>
                  <h3 className="font-semibold text-text-main mb-1">Phone & WhatsApp</h3>
                  <p className="text-gray-600">+91 9847 XXXXXXX</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-bg-secondary p-4 rounded-full text-accent"><Mail size={24} /></div>
                <div>
                  <h3 className="font-semibold text-text-main mb-1">Email</h3>
                  <p className="text-gray-600">support@ethenzaa.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-bg-secondary p-4 rounded-full text-accent"><Clock size={24} /></div>
                <div>
                  <h3 className="font-semibold text-text-main mb-1">Working Hours</h3>
                  <p className="text-gray-600">Monday - Saturday: 10:00 AM - 7:00 PM<br/>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-serif text-2xl text-primary mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-sm p-3 focus:ring-primary focus:border-primary outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input type="email" className="w-full border border-gray-300 rounded-sm p-3 focus:ring-primary focus:border-primary outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea className="w-full border border-gray-300 rounded-sm p-3 focus:ring-primary focus:border-primary outline-none" rows={5} required></textarea>
            </div>
            <button type="submit" className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-btn-hover transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
