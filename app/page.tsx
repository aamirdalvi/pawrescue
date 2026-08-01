import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import SearchBar from "@/components/sections/SearchBar";
import Categories from "@/components/sections/Categories";
import FeaturedListings from "@/components/sections/FeaturedListings";
import LostAndFound from "@/components/sections/LostAndFound";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Statistics from "@/components/sections/Statistics";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      {/* Section 1: Sticky Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* Section 2: Hero */}
        <Hero />

        {/* Section 3: Marketplace Search */}
        <SearchBar />

        {/* Section 4: Browse by Category */}
        <Categories />

        {/* Section 5: Featured Listings */}
        <FeaturedListings />

        {/* Section 6: Lost & Found */}
        <LostAndFound />

        {/* Section 7: Why PawRescue */}
        <WhyChooseUs />

        {/* Section 8: Statistics */}
        <Statistics />

        {/* Section 9: Call To Action */}
        <CallToAction />
      </main>

      {/* Section 10: Footer */}
      <Footer />
    </div>
  );
}