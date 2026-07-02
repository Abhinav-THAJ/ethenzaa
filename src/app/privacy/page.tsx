export default function PrivacyPolicy() {
  return (
    <main className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6 text-center">Privacy Policy</h1>
      <div className="w-20 h-1 bg-accent mx-auto mb-12"></div>
      
      <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
        <p>At Empireae, your privacy is of paramount importance to us. This Privacy Policy details how we collect, use, and protect your personal information.</p>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">1. Data Collection</h2>
          <p>We collect information you provide directly to us when making a purchase, subscribing to our newsletter, or contacting customer support. This may include your name, email address, shipping address, and phone number.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">2. Cookies</h2>
          <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">3. Payment Security</h2>
          <p>All payments are processed securely through Razorpay. We do not store your full credit card details or UPI PINs on our servers.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">4. Data Sharing</h2>
          <p>We never sell your personal data. We may share necessary information with trusted third-party logistics partners solely for the purpose of fulfilling your order.</p>
        </section>
      </div>
    </main>
  );
}
