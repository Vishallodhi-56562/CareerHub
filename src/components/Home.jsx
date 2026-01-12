import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Category from "./Category";
import JobCard from "./JobCard";
import Resources from "./Resources";
import Footer from "./Footer";

export default function Home({ isLoggedIn, setIsLoggedIn, jobs }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const jobCardRef = useRef(null);
  const resourcesRef = useRef(null);
  const heroRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".fade-in-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

const navigate = useNavigate();

  const scrollToJobCard = () => {
    if (jobCardRef.current) {
      jobCardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToResources = () => {
    if (resourcesRef.current) {
      resourcesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle page load animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen dark:bg-gray-600 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Navbar always on top */}
      <Navbar
        scrollToResources={scrollToResources}
        scrollToJobCard={scrollToJobCard}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Main Content with proper spacing */}
      <main
        className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        {/* Hero Section */}
        <section ref={heroRef} className="pt-28 pb-16 px-4 fade-in-on-scroll">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 mb-8 shadow-sm">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Find Your Dream Career
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
              Discover Your Next
              <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                {" "}
                Career Opportunity
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
              Connect with top companies worldwide and find remote jobs that
              match your skills and aspirations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToJobCard}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                Browse Jobs
              </button>
              <button
                onClick={scrollToResources}
                className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1"
              >
                Career Resources
              </button>
            </div>
          </div>
        </section>

        {/* Category Carousel Section */}
        <section className="py-8 px-4 bg-white/50 backdrop-blur-sm border-b border-gray-200/50 fade-in-on-scroll">
          <div className="max-w-7xl mx-auto">
            <Category onCategorySelect={setSelectedCategory} />
          </div>
        </section>

        {/* Jobs Section Title */}
        <section className="py-8 px-4 fade-in-on-scroll">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              {selectedCategory
                ? `${selectedCategory} Jobs`
                : "All Available Jobs"}
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              {selectedCategory
                ? `Explore the latest opportunities in ${selectedCategory.toLowerCase()}`
                : "Browse thousands of verified remote positions across all industries"}
            </p>
          </div>
        </section>

        {/* Jobs Grid */}
        <section ref={jobCardRef} className="py-12 px-4 fade-in-on-scroll">
          <div className="max-w-7xl mx-auto">
            <JobCard jobs={jobs} selectedCategory={selectedCategory} />
          </div>
        </section>

        {/* Resources Section */}
        <section
          ref={resourcesRef}
          className="py-16 px-4 bg-gray-50/50 fade-in-on-scroll"
        >
          <div className="max-w-7xl mx-auto">
            <Resources />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-blue-600 text-white fade-in-on-scroll">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who found their dream jobs through
              our platform. Create your profile today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isLoggedIn ? (
                <button
                  onClick={() => navigate("/signup")}
                  to="/signup"
                  className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Sign Up Free
                </button>
              ) : (
                <button
                  onClick={scrollToJobCard}
                  className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Start Job Search
                </button>
              )}
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="fade-in-on-scroll">
          <Footer />
        </footer>
      </main>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition:
            opacity 0.6s ease-out,
            transform 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
