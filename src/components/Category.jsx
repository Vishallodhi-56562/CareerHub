import React, { useState, useRef, useEffect } from "react";

export default function NestedCarousel({onCategorySelect}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const MAIN_ITEM_WIDTH = 260;
  const carouselRef = useRef(null);

  const categories = [
    {
      id: 1,
      name: "Healthcare and Medicine",
      color: "from-emerald-600 to-cyan-500",
      accent: "emerald",
      icon: "🩺",
      subItems: [
        { title: "Doctor / Physician", desc: "General and specialized practitioners", icon: "👨‍⚕️" },
        { title: "Nurse", desc: "Registered and assistant nursing roles", icon: "💉" },
        { title: "Pharmacist", desc: "Pharmacy and clinical drug experts", icon: "💊" },
        { title: "Medical Technician", desc: "Lab and diagnostic staff", icon: "🔬" },
        { title: "Healthcare Administrator", desc: "Hospital and clinic management", icon: "🏥" },
      ],
    },
    {
      id: 2,
      name: "Technology and IT",
      color: "from-blue-600 to-indigo-600",
      accent: "blue",
      icon: "💻",
      subItems: [
        { title: "Software Engineer", desc: "Frontend, backend, full-stack devs", icon: "🧑‍💻" },
        { title: "Data Scientist", desc: "Machine learning and analytics", icon: "📊" },
        { title: "Network Engineer", desc: "Network and infrastructure roles", icon: "🌐" },
        { title: "Cybersecurity Specialist", desc: "Information security and auditing", icon: "🔐" },
        { title: "DevOps Engineer", desc: "Cloud and automation experts", icon: "☁️" },
      ],
    },
    {
      id: 3,
      name: "Finance and Accounting",
      color: "from-amber-600 to-orange-500",
      accent: "amber",
      icon: "💰",
      subItems: [
        { title: "Accountant", desc: "Financial reporting and compliance", icon: "📘" },
        { title: "Financial Analyst", desc: "Budgeting and investment analysis", icon: "📈" },
        { title: "Auditor", desc: "Internal and external audit", icon: "🧾" },
        { title: "Tax Consultant", desc: "Tax planning and filing", icon: "💼" },
        { title: "Banking Professional", desc: "Retail and corporate banking", icon: "🏦" },
      ],
    },
    {
      id: 4,
      name: "Arts and Design",
      color: "from-purple-600 to-pink-500",
      accent: "purple",
      icon: "🎨",
      subItems: [
        { title: "Graphic Designer", desc: "Visual communication design", icon: "🖼️" },
        { title: "UI/UX Designer", desc: "Interface and experience design", icon: "✨" },
        { title: "Fashion Designer", desc: "Apparel and textile design", icon: "👗" },
        { title: "Illustrator / Animator", desc: "2D and 3D content creation", icon: "🎬" },
        { title: "Photographer / Videographer", desc: "Media production", icon: "📷" },
      ],
    },
    {
      id: 5,
      name: "Education and Training",
      color: "from-teal-600 to-cyan-500",
      accent: "teal",
      icon: "📚",
      subItems: [
        { title: "Teacher / Educator", desc: "Primary to higher education", icon: "👩‍🏫" },
        { title: "Tutor", desc: "Personal or online teaching", icon: "📖" },
        { title: "Curriculum Designer", desc: "Course and syllabus creation", icon: "📝" },
        { title: "Academic Researcher", desc: "Education research and policy", icon: "🔍" },
        { title: "Trainer / Instructor", desc: "Corporate or skill training", icon: "🎯" },
      ],
    },
    {
      id: 6,
      name: "Sales and Marketing",
      color: "from-rose-600 to-pink-500",
      accent: "rose",
      icon: "📢",
      subItems: [
        { title: "Sales Executive", desc: "Direct and channel sales", icon: "💼" },
        { title: "Marketing Manager", desc: "Campaign planning and execution", icon: "📊" },
        { title: "Digital Marketer", desc: "SEO, SEM, social media", icon: "💻" },
        { title: "Brand Manager", desc: "Brand growth and identity", icon: "🏷️" },
        { title: "Customer Relationship Manager", desc: "Client success and retention", icon: "🤝" },
      ],
    },
    {
      id: 7,
      name: "Management and Leadership",
      color: "from-gray-700 to-slate-600",
      accent: "slate",
      icon: "💼",
      subItems: [
        { title: "Project Manager", desc: "Project delivery and planning", icon: "📋" },
        { title: "Operations Manager", desc: "Business operations control", icon: "⚙️" },
        { title: "HR Manager", desc: "Talent acquisition and policies", icon: "🧠" },
        { title: "Strategy Consultant", desc: "Business and market strategy", icon: "📈" },
        { title: "Entrepreneur", desc: "Startup and business owner", icon: "🚀" },
      ],
    },
    {
      id: 8,
      name: "Skilled Trades and Labor",
      color: "from-amber-700 to-orange-600",
      accent: "orange",
      icon: "🛠️",
      subItems: [
        { title: "Electrician", desc: "Electrical installation and repair", icon: "💡" },
        { title: "Plumber", desc: "Water and piping systems", icon: "🚰" },
        { title: "Carpenter", desc: "Woodworking and construction", icon: "🪚" },
        { title: "Mechanic", desc: "Automotive and machine repair", icon: "🔧" },
        { title: "Welder", desc: "Metal fabrication", icon: "⚒️" },
      ],
    },
    {
      id: 9,
      name: "Science and Research",
      color: "from-violet-600 to-fuchsia-500",
      accent: "violet",
      icon: "🔬",
      subItems: [
        { title: "Research Scientist", desc: "Experimental and applied science", icon: "🧪" },
        { title: "Lab Technician", desc: "Laboratory operations", icon: "⚗️" },
        { title: "Biologist / Chemist", desc: "Life and chemical sciences", icon: "🧬" },
        { title: "Data Analyst", desc: "Research data interpretation", icon: "📊" },
        { title: "Academic Researcher", desc: "University or institutional R&D", icon: "🏛️" },
      ],
    },
    {
      id: 10,
      name: "Service Industry",
      color: "from-sky-600 to-blue-500",
      accent: "sky",
      icon: "🧾",
      subItems: [
        { title: "Customer Service Representative", desc: "Support and communication", icon: "📞" },
        { title: "Hospitality Worker", desc: "Hotel and travel services", icon: "🏨" },
        { title: "Retail Associate", desc: "Store and inventory management", icon: "🛒" },
        { title: "Food Service Worker", desc: "Restaurant and kitchen staff", icon: "🍽️" },
        { title: "Delivery / Logistics", desc: "Supply and distribution", icon: "🚚" },
      ],
    },
  ];

  // === MAIN CAROUSEL HANDLERS ===
  const handleMainDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
  };

  const handleMainMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX || e.touches[0].clientX;
    setDragOffset(x - startX);
  };

  const handleMainUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = MAIN_ITEM_WIDTH / 3;
    const slideCount = Math.round(dragOffset / threshold);
    setCurrentIndex((prev) => {
      const newIndex = (prev - slideCount + categories.length) % categories.length;
      return newIndex;
    });
    setDragOffset(0);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Trigger parent callback
    onCategorySelect(category.name);
  };

  // === STYLING FUNCTIONS ===
  const getMainItemStyle = (index) => {
    let position = index - currentIndex;
    if (position > categories.length / 2) position -= categories.length;
    if (position < -categories.length / 2) position += categories.length;

    const translateX = position * MAIN_ITEM_WIDTH + dragOffset;
    const distance = Math.abs(translateX / MAIN_ITEM_WIDTH);

    const scale = 1 - Math.min(distance * 0.15, 0.3);
    const opacity = Math.max(1 - distance * 0.4, 0.4);
    const zIndex = 10 - Math.floor(distance * 5);
    
    // Modern card elevation based on position
    const elevation = Math.max(0, 8 - distance * 6);

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      zIndex,
      transition: isDragging ? "none" : "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      boxShadow: `0 ${elevation}px ${elevation * 2}px -${elevation / 2}px rgba(0,0,0,${0.1 + distance * 0.05})`,
      filter: `brightness(${1 - distance * 0.1})`,
    };
  };

  const activeCategory = categories[currentIndex];

  // Auto-center the carousel on mount
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-16 px-4">
      
      {/* Professional Header */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 mb-6 shadow-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Career Selection</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
          Select Your 
          <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent font-semibold"> Professional Path</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Navigate through industry categories to explore career opportunities that align with your expertise and aspirations.
        </p>
      </div>

      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="relative w-full max-w-7xl h-40 mb-16 cursor-grab active:cursor-grabbing select-none overflow-hidden"
        onMouseDown={handleMainDown}
        onMouseMove={handleMainMove}
        onMouseUp={handleMainUp}
        onMouseLeave={handleMainUp}
        onTouchStart={handleMainDown}
        onTouchMove={handleMainMove}
        onTouchEnd={handleMainUp}
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/30 to-transparent pointer-events-none"></div>
        
        {/* Carousel Items */}
        {categories.map((cat, idx) => (
          <div key={cat.id} className="absolute inset-0 flex items-center justify-center">
            <div
              onClick={() => handleCategoryClick(cat)}
              style={getMainItemStyle(idx)}
              className={`absolute w-64 h-28 bg-white rounded-2xl flex flex-col items-center justify-center p-6 transition-all duration-500 hover:shadow-xl border border-gray-100 hover:border-gray-200 group relative overflow-hidden`}
            >
              {/* Gradient Accent Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.color}`}></div>
              
              {/* Icon with subtle animation */}
              <div className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-110">
                {cat.icon}
              </div>
              
              {/* Category Name */}
              <h2 className="text-base font-medium text-gray-800 text-center px-2 leading-tight group-hover:text-gray-900 transition-colors">
                {cat.name}
              </h2>
              
              {/* Selection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Click indicator */}
              <div className="absolute bottom-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
        
        {/* Minimal Navigation Arrows */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white transition-all duration-300 shadow-lg border border-gray-200 hover:shadow-xl"
          aria-label="Previous category"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % categories.length)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white transition-all duration-300 shadow-lg border border-gray-200 hover:shadow-xl"
          aria-label="Next category"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Professional Sub-items Panel */}
      {activeCategory && (
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-8 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${activeCategory.color} flex items-center justify-center text-2xl shadow-sm`}>
                  {activeCategory.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{activeCategory.name}</h2>
                  <p className="text-gray-500 mt-1">Select a specialization to proceed</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-light text-gray-900">{activeCategory.subItems.length}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Specializations</div>
              </div>
            </div>
          </div>
          
          {/* Grid Layout */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {activeCategory.subItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group bg-gray-50 hover:bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-md cursor-pointer relative overflow-hidden"
                  onClick={() => onCategorySelect(`${activeCategory.name} - ${item.title}`)}
                >
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon */}
                  <div className="text-2xl mb-3 text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                    {item.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg group-hover:text-gray-900 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                    {item.desc}
                  </p>
                  
                  {/* Selection arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  
                  {/* Border highlight on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Minimal Progress Indicators */}
      <div className="flex space-x-2 mt-8">
        {categories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? 'bg-gray-900 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to category ${idx + 1}`}
          />
        ))}
      </div>

      {/* Custom CSS for professional animations */}
      <style jsx>{`
        @keyframes subtlePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse {
          animation: subtlePulse 2s infinite;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Professional card hover effect */
        .group:hover {
          transform: translateY(-2px);
        }
        
        /* Line clamp for multi-line text */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}