export default function ShippingPolicy() {
  return (
    <main className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6 text-center">Shipping Policy</h1>
      <div className="w-20 h-1 bg-accent mx-auto mb-12"></div>
      
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 prose prose-lg max-w-none text-gray-700 space-y-8">
        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">Delivery Coverage</h2>
          <p className="font-semibold text-xl">Pan India</p>
          <p>We ship our luxury fashion pieces to all pin codes across India.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">Shipping Charges</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Free Shipping:</strong> On all orders above ₹999.</li>
            <li><strong>Standard Shipping:</strong> A nominal charge of ₹99 applies for orders below ₹999.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">Delivery Time</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Metro Cities:</strong> 2–4 Business Days</li>
            <li><strong>Other Cities:</strong> 3–7 Business Days</li>
            <li><strong>Remote Areas:</strong> 5–10 Business Days</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">Order Processing</h2>
          <p>All orders are processed and dispatched within 24–48 hours of order confirmation. You will receive tracking details immediately upon dispatch.</p>
        </section>
      </div>
    </main>
  );
}
