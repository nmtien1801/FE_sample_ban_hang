import React from 'react';

// Dữ liệu mock cho phần tác giả
const authors = [
    {
        name: "Emily Chang",
        bio: "Emily's insightful articles transport readers to far-off lands, immersing them in the traditions, art, and local flavors that make each destination unique.",
        image: "https://soledaddemo.pencidesign.net/soledad-travel-magazine2/wp-content/uploads/sites/47/2024/03/confident-woman-portrait-female-success-585x585.jpg"
    },
    {
        name: "Alexandre Duval",
        bio: "From trekking through rugged mountains to diving into pristine oceans, Alexandre's thrilling adventures inspire readers to step out of their comfort zones.",
        image: "https://soledaddemo.pencidesign.net/soledad-travel-magazine2/wp-content/uploads/sites/47/2024/03/portrait-handsome-young-man-with-hand-chin-585x585.jpg"
    },
    {
        name: "Lina Patel",
        bio: "Lina's expertise in luxurious accommodations, gourmet dining, and exclusive destinations elevates travel to a whole new level of opulence.",
        image: "https://soledaddemo.pencidesign.net/soledad-travel-magazine2/wp-content/uploads/sites/47/2024/03/pretty-woman-wearing-hat-standing-with-arms-crossed-looking-you-isolated-white-wall-585x585.jpg"
    }
];

// Component nội dung About
const AboutSection = ({ title, content, image, reverse }) => (
    <section className={`grid md:grid-cols-2 gap-10 items-center py-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
        <div className={`${reverse ? 'md:order-2 md:pl-10' : 'md:order-1 md:pr-10'}`}>
            <div className="relative mb-6">
                <h3 className="font-serif text-3xl font-bold text-neutral-900 border-l-4 border-[#6eb48c] pl-4">
                    {title}
                </h3>
            </div>
            <p className="text-neutral-600 leading-relaxed text-lg">{content}</p>
        </div>
        <div className={`overflow-hidden rounded-lg shadow-xl aspect-video ${reverse ? 'md:order-1' : 'md:order-2'}`}>
            <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
        </div>
    </section>
);

export default function AboutPage() {
    return (
        <main className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[400px] flex flex-col items-center justify-center text-white text-center px-4 mb-16">
                <div className="absolute inset-0 bg-[url('https://soledaddemo.pencidesign.net/soledad-travel-magazine2/wp-content/uploads/sites/47/2024/03/frankie-lopez-L6mH2DPYDQk-unsplash.jpg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 space-y-4">
                    <div className="text-sm uppercase tracking-widest opacity-80">Home &gt; About</div>
                    <h1 className="font-serif text-5xl md:text-6xl font-bold">Welcome to LoveTravel</h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        Embark on a journey of discovery with LoveTravel, your gateway to the world's most captivating destinations.
                    </p>
                </div>
            </section>

            <div className="max-w-[1170px] mx-auto px-5 py-16">
                {/* Phần tiêu đề giới thiệu trang About */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="font-serif text-[40px] font-bold text-neutral-900 mb-6">
                        Welcome to LoveTravel
                    </h2>
                    <p className="text-[18px] text-neutral-600 leading-relaxed">
                        Embark on a journey of discovery with LoveTravel, your gateway to the world’s most captivating destinations. Whether you're a seasoned globetrotter or a curious explorer, our travel magazine is your passport to inspiration, information, and unforgettable experiences.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-16">
                    <AboutSection
                        title="Explore the World Through Our Lens"
                        content="Immerse yourself in stunning landscapes, vibrant cultures, and hidden gems as we take you on a visual odyssey through our captivating articles, breathtaking photography, and insightful travel guides."
                        image="https://soledaddemo.pencidesign.net/soledad-travel-magazine2/wp-content/uploads/sites/47/2024/03/neom-4AADxUsnufQ-unsplash.jpg"
                    />

                    <AboutSection
                        title="Uncover Travel Secrets and Tips"
                        content="Planning your next adventure? Our expert writers share insider tips, practical advice, and must-visit destinations to help you craft your dream itinerary. Whether you're seeking a relaxing beach retreat or a thrilling urban escapade, we've got you covered."
                        image="https://soledaddemo.pencidesign.net/soledad-travel-magazine2/wp-content/uploads/sites/47/2024/03/steven-wilcox-abHQF00VMkk-unsplash.jpg"
                        reverse
                    />
                </div>
            </div>

            <div className="max-w-[1170px] mx-auto px-5">
                {/* Authors Section */}
                <section className="py-20">
                    <h2 className="text-center font-serif text-3xl font-bold text-neutral-900 mb-16">Top most popular authors</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {authors.map((author, idx) => (
                            <div key={idx} className="bg-[#f9f9f9] p-8 rounded-2xl text-center border border-neutral-100 hover:shadow-lg transition">
                                <img src={author.image} alt={author.name} className="w-24 h-24 mx-auto rounded-full mb-6 object-cover" />
                                <h3 className="font-serif text-2xl font-bold mb-4">{author.name}</h3>
                                <p className="text-neutral-600 mb-6 leading-relaxed text-sm">{author.bio}</p>
                                <div className="flex justify-center gap-3 text-neutral-500">
                                    <span className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-[#6eb48c] hover:text-white cursor-pointer">f</span>
                                    <span className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-[#6eb48c] hover:text-white cursor-pointer">X</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}