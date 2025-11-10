import React, { useState, useRef } from "react";

export default function NestedCarousel({onCategorySelect}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  
  const MAIN_ITEM_WIDTH =  200;

const categories = [

  {
    id: 1,
    name: "Healthcare and Medicine",
    color: "from-gray-900 via-slate-800 to-black ",
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
    color: "from-gray-900 via-slate-800 to-black",
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
    color: "from-gray-900 via-slate-800 to-black",
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
    color: "from-gray-900 via-slate-800 to-black",
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
    color: "from-gray-900 via-slate-800 to-black",
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
    color: "from-gray-900 via-slate-800 to-black",
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
    color: "from-gray-900 via-slate-800 to-black",
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
    color: "from-gray-900 via-slate-800 to-black",
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
    color: "from-gray-900 via-slate-800 to-black",
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
    color: "from-gray-900 via-slate-800 to-black",
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
    setCurrentIndex((prev) => (prev - slideCount + categories.length) % categories.length);
    setDragOffset(0);
  };

 

  // === STYLING FUNCTIONS ===
  const getMainItemStyle = (index) => {
    let position = index - currentIndex;
    if (position > categories.length / 2) position -= categories.length;
    if (position < -categories.length / 2) position += categories.length;

    const translateX = position * MAIN_ITEM_WIDTH + dragOffset;
    const distance = Math.abs(translateX / MAIN_ITEM_WIDTH);

    const scale = 1 - Math.min(distance * 0.2, 0.4);
    const opacity = Math.max(1 - distance * 0.5, 0.3);
    const blur = distance * 2;
    const zIndex = 10 - Math.floor(distance * 5);

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex,
      transition: isDragging ? "none" : "transform 0.5s ease, opacity 0.5s ease",
    };
  };

  
  const activeCategory = categories[currentIndex];

  return (
    <div className="flex pt-20 flex-col items-center overflow-hidden justify-center h-50 bg-gradient-to-br from-slate-100 via-blue-100 to-slate-200 py-12">

      <div
        className="relative w-full max-w-6xl h-64 mb-12 cursor-pointer active:cursor-pointer select-none"
        onMouseDown={handleMainDown}
        onMouseMove={handleMainMove}
        onMouseUp={handleMainUp}
        onMouseLeave={handleMainUp}
        onTouchStart={handleMainDown}
        onTouchMove={handleMainMove}
        onTouchEnd={handleMainUp}
      >
        {categories.map((cat, idx) => (
          <div key={cat.id} className="absolute inset-0 flex items-center justify-center">
            <div
            onClick={() => onCategorySelect(cat.name)}
              style={getMainItemStyle(idx)}
              className={`absolute w-64 h-20 bg-gradient-to-br ${cat.color} rounded-[5px] shadow-2xl flex flex-col items-center  justify-center p-6`}
            >
              <h2 className="text-2xl text-white font-bold">{cat.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
