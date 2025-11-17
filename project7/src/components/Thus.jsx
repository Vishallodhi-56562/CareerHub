import React, { useState, useRef } from "react";

export default function NestedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const [subIndex, setSubIndex] = useState(0);
  const [isSubDragging, setIsSubDragging] = useState(false);
  const [subStartX, setSubStartX] = useState(0);
  const [subDragOffset, setSubDragOffset] = useState(0);

  const MAIN_ITEM_WIDTH =  200;
  const SUB_ITEM_WIDTH =160;

const categories = [

  {
    id: 1,
    name: "Healthcare and Medicine",
    color: "from-rose-500 to-pink-600",
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
    color: "from-blue-500 to-indigo-600",
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
    color: "from-green-500 to-emerald-600",
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
    color: "from-pink-500 to-rose-700",
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
    color: "from-indigo-500 to-blue-700",
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
    color: "from-yellow-500 to-orange-600",
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
    color: "from-purple-500 to-fuchsia-600",
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
    color: "from-orange-500 to-red-600",
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
    color: "from-cyan-500 to-teal-600",
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
    color: "from-slate-500 to-gray-700",
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

  // === SUB CAROUSEL HANDLERS ===
  const handleSubDown = (e) => {
    setIsSubDragging(true);
    setSubStartX(e.clientX || e.touches[0].clientX);
  };

  const handleSubMove = (e) => {
    if (!isSubDragging) return;
    const x = e.clientX || e.touches[0].clientX;
    setSubDragOffset(x - subStartX);
  };

  const handleSubUp = () => {
    if (!isSubDragging) return;
    setIsSubDragging(false);
    const activeSubItems = categories[currentIndex].subItems;
    const threshold = SUB_ITEM_WIDTH / 3;
    const slideCount = Math.round(subDragOffset / threshold);
    setSubIndex((prev) => (prev - slideCount + activeSubItems.length) % activeSubItems.length);
    setSubDragOffset(0);
  };
function getCircularPosition(index, current, total) {
  let pos = index - current;
  if (pos > total / 2) pos -= total;
  if (pos < -total / 2) pos += total;
  return pos;
}

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

  const getSubItemStyle = (index, total) => {
    const position = getCircularPosition(index, subIndex, total);
    let translateX = position * SUB_ITEM_WIDTH + subDragOffset;
    const distance = Math.abs(position);

    const scale = distance === 0 ? 1 : 0.8 - distance * 0.1;
    const opacity = distance === 0 ? 1 : 0.6 - distance * 0.1;
    const blur = distance * 2;
    const zIndex = 5 - distance;

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex,
      transition: isSubDragging ? "none" : "transform 0.4s ease, opacity 0.4s ease",
    };
  };

  const activeCategory = categories[currentIndex];
  const activeSubItems = activeCategory.subItems;

  return (
    <div className="flex flex-col items-center overflow-hidden justify-center h-120 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">

      {/* === MAIN CAROUSEL === */}
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
              style={getMainItemStyle(idx)}
              className={`absolute w-64 h-48 bg-gradient-to-br ${cat.color} rounded-xl shadow-2xl flex flex-col items-center justify-center p-6`}
            >
              <div className="text-6xl mb-4">{cat.icon}</div>
              <h2 className="text-2xl text-white font-bold">{cat.name}</h2>
              <p className="text-white/80 text-sm mt-2">{cat.subItems.length} services</p>
            </div>
          </div>
        ))}
      </div>

      {/* === SUB CAROUSEL (Independent) === */}
      <div
        className="relative w-full max-w-4xl h-56 cursor-pointer active:cursor-pointer select-none"
        onMouseDown={handleSubDown}
        onMouseMove={handleSubMove}
        onMouseUp={handleSubUp}
        onMouseLeave={handleSubUp}
        onTouchStart={handleSubDown}
        onTouchMove={handleSubMove}
        onTouchEnd={handleSubUp}
      >
        {activeSubItems.map((sub, idx) => (
          <div key={idx} className="absolute inset-0 flex items-center justify-center">
            <div
              style={getSubItemStyle(idx, activeSubItems.length)}
              className="absolute w-48 h-44 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center"
            >
              <div className="text-4xl mb-2">{sub.icon}</div>
              <h3 className="text-white font-semibold text-base">{sub.title}</h3>
              <p className="text-white/70 text-xs">{sub.desc}</p>
            </div>
          </div>
        ))}
      </div>

     
     
    </div>
  );
}

