export default function Returns() {
  return (
    <main className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6 text-center">Return & Refund Policy</h1>
      <div className="w-20 h-1 bg-accent mx-auto mb-12"></div>
      
      <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
        <p>At Ethenzaa, we want you to be completely satisfied with your purchase. If you are not, we are here to help.</p>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">Return Period</h2>
          <p>You have 14 calendar days to return an item from the date you received it.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">Eligibility</h2>
          <p>To be eligible for a return, your item must be unused, unwashed, and in the same condition that you received it. It must also be in the original packaging with all tags attached.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">Refund Process</h2>
          <p>Once we receive your item, we will inspect it and notify you. If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within 5-7 business days, depending on your card issuer's policies.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">Non-returnable Items</h2>
          <p>Certain items cannot be returned, including innerwear, customized/bespoke garments, and items purchased during final clearance sales.</p>
        </section>
      </div>
    </main>
  );
}
