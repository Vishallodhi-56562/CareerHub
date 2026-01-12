import React from "react";
import { FiExternalLink, FiArrowRight } from "react-icons/fi";
import {
  FaRegLightbulb,
  FaLaptopCode,
  FaUserTie,
  FaSearch,
  FaLinkedin,
} from "react-icons/fa";

export default function Resources() {
  const resources = [
    {
      id: 1,
      title: "Resume Builder",
      description:
        "Craft a professional resume that stands out to employers in minutes.",
      link: "https://www.canva.com/resumes/templates/",
      icon: <FaUserTie className="text-4xl text-orange-500" />,
      category: "Career Development",
      color: "from-orange-500 to-red-500",
      gradient: "bg-gradient-to-br from-orange-50/20 to-red-50/20",
    },
    {
      id: 2,
      title: "Interview Preparation",
      description:
        "Master technical interviews with comprehensive question banks and mock interviews.",
      link: "https://www.interviewbit.com/",
      icon: <FaRegLightbulb className="text-4xl text-blue-500" />,
      category: "Interview Skills",
      color: "from-blue-500 to-indigo-600",
      gradient: "bg-gradient-to-br from-blue-50/20 to-indigo-50/20",
    },
    {
      id: 3,
      title: "Learn React",
      description:
        "Become proficient in modern React with interactive tutorials and real-world projects.",
      link: "https://react.dev/learn",
      icon: <FaLaptopCode className="text-4xl text-green-500" />,
      category: "Technical Skills",
      color: "from-green-500 to-emerald-600",
      gradient: "bg-gradient-to-br from-green-50/20 to-emerald-50/20",
    },
    {
      id: 4,
      title: "Job Search Tips",
      description:
        "Discover proven strategies to accelerate your job search and land offers faster.",
      link: "https://www.indeed.com/career-advice/finding-a-job",
      icon: <FaSearch className="text-4xl text-purple-500" />,
      category: "Job Hunting",
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-br from-purple-50/20 to-pink-50/20",
    },
    {
      id: 5,
      title: "LinkedIn Optimization",
      description:
        "Transform your LinkedIn profile into a recruiter magnet with expert techniques.",
      link: "https://www.linkedin.com/learning/",
      icon: <FaLinkedin className="text-4xl text-sky-500" />,
      category: "Personal Branding",
      color: "from-sky-500 to-blue-600",
      gradient: "bg-gradient-to-br from-sky-50/20 to-blue-50/20",
    },
    {
      id: 6,
      title: "Salary Negotiation Guide",
      description:
        "Learn how to confidently negotiate your salary and benefits package.",
      link: "https://www.levels.fyi/tips/",
      icon: <FaUserTie className="text-4xl text-teal-500" />,
      category: "Career Growth",
      color: "from-teal-500 to-cyan-600",
      gradient: "bg-gradient-to-br from-teal-50/20 to-cyan-50/20",
    },
  ];

  // Categories for filtering
  const categories = ["All", ...new Set(resources.map((r) => r.category))];

  const [activeCategory, setActiveCategory] = React.useState("All");

  // Filter resources by category
  const filteredResources =
    activeCategory === "All"
      ? resources
      : resources.filter((resource) => resource.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-28 pb-16 px-4">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16 relative">
        {/* Decorative Elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-20"></div>

        <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 mb-6 shadow-sm">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            Learning Resources
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
          Elevate Your Career with
          <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent font-semibold">
            {" "}
            Premium Resources
          </span>
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Access curated tools, guides, and learning platforms designed to
          accelerate your professional growth.
        </p>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-orange-500 to-blue-600 text-white shadow-lg"
                  : "bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredResources.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No resources found
            </h3>
            <p className="text-gray-600">Try selecting a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 hover:border-gray-200"
              >
                {/* Gradient Header */}
                <div className={`h-3 bg-gradient-to-r ${item.color}`}></div>

                {/* Content */}
                <div className="p-8">
                  {/* Icon and Category */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`p-4 rounded-2xl ${item.gradient} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Action Button */}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-all duration-300 group/button"
                  >
                    <span>Explore Resource</span>
                    <FiArrowRight className="group-hover/button:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FiExternalLink className="text-gray-400 text-xl" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto mt-20">
        <div className="bg-gradient-to-r from-orange-500 to-blue-600 rounded-3xl p-10 md:p-12 text-center text-white shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take Your Career to the Next Level?
          </h2>
          <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive career tips, resource
            updates, and job opportunities delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email here"
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 group">
              Subscribe
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Smooth transitions */
        * {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
