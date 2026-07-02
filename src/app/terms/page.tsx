export default function Terms() {
  return (
    <main className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6 text-center">Terms & Conditions</h1>
      <div className="w-20 h-1 bg-accent mx-auto mb-12"></div>
      
      <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
        <p>Welcome to Empireae. By accessing and using this website, you agree to comply with the following Terms & Conditions.</p>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">1. Website Usage</h2>
          <p>You may use our website for lawful purposes only. Any unauthorized use of the content or structure of this website is strictly prohibited.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">2. Orders & Pricing</h2>
          <p>All orders are subject to acceptance and availability. Prices are subject to change without notice. In case of pricing errors, we reserve the right to cancel any orders placed at the incorrect price.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">3. Intellectual Property</h2>
          <p>All content on this website, including logos, text, graphics, and images, is the property of Empireae and is protected by copyright laws.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">4. Liability</h2>
          <p>Empireae shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
        </section>
      </div>
    </main>
  );
}
