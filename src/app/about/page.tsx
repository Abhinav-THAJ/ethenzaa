export default function About() {
  return (
    <main className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6 text-center">About ETHENZAA</h1>
      <div className="w-20 h-1 bg-accent mx-auto mb-12"></div>
      
      <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">Our Story</h2>
          <p>
            At Empireae, we believe that fashion is more than just clothing—it's a statement of confidence, heritage, and modern expression. We started our journey with a simple vision: to bring premium quality ethnic and contemporary wear to everyone who appreciates fine craftsmanship and elegant design.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">Mission</h2>
          <p>
            Our mission is to weave style and inspire confidence by delivering premium fashion that blends traditional Indian heritage with contemporary global trends. We strive to offer affordable luxury without compromising on quality or customer experience.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">Vision</h2>
          <p>
            To become India's most trusted and beloved premium fashion and lifestyle brand, recognized for our commitment to quality, inclusive sizing, and impeccable customer service.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-primary mb-4">Core Values</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Premium Quality:</strong> Sourcing the finest fabrics and materials.</li>
            <li><strong>Inclusivity:</strong> Fashion for everyone, including dedicated Kids and Plus Size collections.</li>
            <li><strong>Customer First:</strong> Unwavering commitment to customer satisfaction.</li>
            <li><strong>Authenticity:</strong> Staying true to our cultural roots while embracing modernity.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
