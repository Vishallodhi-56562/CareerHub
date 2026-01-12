const categories = [
  {
    id: 1,
    name: "Healthcare and Medicine",
    color: "from-rose-500 to-pink-600",
    icon: "🩺",
    subItems: [
      {
        title: "Doctor / Physician",
        desc: "General and specialized practitioners",
        icon: "👨‍⚕️",
      },
      {
        title: "Nurse",
        desc: "Registered and assistant nursing roles",
        icon: "💉",
      },
      {
        title: "Pharmacist",
        desc: "Pharmacy and clinical drug experts",
        icon: "💊",
      },
      {
        title: "Medical Technician",
        desc: "Lab and diagnostic staff",
        icon: "🔬",
      },
      {
        title: "Healthcare Administrator",
        desc: "Hospital and clinic management",
        icon: "🏥",
      },
    ],
  },
  {
    id: 2,
    name: "Technology and IT",
    color: "from-blue-500 to-indigo-600",
    icon: "💻",
    subItems: [
      {
        title: "Software Engineer",
        desc: "Frontend, backend, full-stack devs",
        icon: "🧑‍💻",
      },
      {
        title: "Data Scientist",
        desc: "Machine learning and analytics",
        icon: "📊",
      },
      {
        title: "Network Engineer",
        desc: "Network and infrastructure roles",
        icon: "🌐",
      },
      {
        title: "Cybersecurity Specialist",
        desc: "Information security and auditing",
        icon: "🔐",
      },
      {
        title: "DevOps Engineer",
        desc: "Cloud and automation experts",
        icon: "☁️",
      },
    ],
  },
  {
    id: 3,
    name: "Finance and Accounting",
    color: "from-green-500 to-emerald-600",
    icon: "💰",
    subItems: [
      {
        title: "Accountant",
        desc: "Financial reporting and compliance",
        icon: "📘",
      },
      {
        title: "Financial Analyst",
        desc: "Budgeting and investment analysis",
        icon: "📈",
      },
      { title: "Auditor", desc: "Internal and external audit", icon: "🧾" },
      { title: "Tax Consultant", desc: "Tax planning and filing", icon: "💼" },
      {
        title: "Banking Professional",
        desc: "Retail and corporate banking",
        icon: "🏦",
      },
    ],
  },
  {
    id: 4,
    name: "Arts and Design",
    color: "from-pink-500 to-rose-700",
    icon: "🎨",
    subItems: [
      {
        title: "Graphic Designer",
        desc: "Visual communication design",
        icon: "🖼️",
      },
      {
        title: "UI/UX Designer",
        desc: "Interface and experience design",
        icon: "✨",
      },
      {
        title: "Fashion Designer",
        desc: "Apparel and textile design",
        icon: "👗",
      },
      {
        title: "Illustrator / Animator",
        desc: "2D and 3D content creation",
        icon: "🎬",
      },
      {
        title: "Photographer / Videographer",
        desc: "Media production",
        icon: "📷",
      },
    ],
  },
  {
    id: 5,
    name: "Education and Training",
    color: "from-indigo-500 to-blue-700",
    icon: "📚",
    subItems: [
      {
        title: "Teacher / Educator",
        desc: "Primary to higher education",
        icon: "👩‍🏫",
      },
      { title: "Tutor", desc: "Personal or online teaching", icon: "📖" },
      {
        title: "Curriculum Designer",
        desc: "Course and syllabus creation",
        icon: "📝",
      },
      {
        title: "Academic Researcher",
        desc: "Education research and policy",
        icon: "🔍",
      },
      {
        title: "Trainer / Instructor",
        desc: "Corporate or skill training",
        icon: "🎯",
      },
    ],
  },
  {
    id: 6,
    name: "Sales and Marketing",
    color: "from-yellow-500 to-orange-600",
    icon: "📢",
    subItems: [
      {
        title: "Sales Executive",
        desc: "Direct and channel sales",
        icon: "💼",
      },
      {
        title: "Marketing Manager",
        desc: "Campaign planning and execution",
        icon: "📊",
      },
      { title: "Digital Marketer", desc: "SEO, SEM, social media", icon: "💻" },
      { title: "Brand Manager", desc: "Brand growth and identity", icon: "🏷️" },
      {
        title: "Customer Relationship Manager",
        desc: "Client success and retention",
        icon: "🤝",
      },
    ],
  },
  {
    id: 7,
    name: "Management and Leadership",
    color: "from-purple-500 to-fuchsia-600",
    icon: "💼",
    subItems: [
      {
        title: "Project Manager",
        desc: "Project delivery and planning",
        icon: "📋",
      },
      {
        title: "Operations Manager",
        desc: "Business operations control",
        icon: "⚙️",
      },
      {
        title: "HR Manager",
        desc: "Talent acquisition and policies",
        icon: "🧠",
      },
      {
        title: "Strategy Consultant",
        desc: "Business and market strategy",
        icon: "📈",
      },
      { title: "Entrepreneur", desc: "Startup and business owner", icon: "🚀" },
    ],
  },
  {
    id: 8,
    name: "Skilled Trades and Labor",
    color: "from-orange-500 to-red-600",
    icon: "🛠️",
    subItems: [
      {
        title: "Electrician",
        desc: "Electrical installation and repair",
        icon: "💡",
      },
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
      {
        title: "Research Scientist",
        desc: "Experimental and applied science",
        icon: "🧪",
      },
      { title: "Lab Technician", desc: "Laboratory operations", icon: "⚗️" },
      {
        title: "Biologist / Chemist",
        desc: "Life and chemical sciences",
        icon: "🧬",
      },
      {
        title: "Data Analyst",
        desc: "Research data interpretation",
        icon: "📊",
      },
      {
        title: "Academic Researcher",
        desc: "University or institutional R&D",
        icon: "🏛️",
      },
    ],
  },
  {
    id: 10,
    name: "Service Industry",
    color: "from-slate-500 to-gray-700",
    icon: "🧾",
    subItems: [
      {
        title: "Customer Service Representative",
        desc: "Support and communication",
        icon: "📞",
      },
      {
        title: "Hospitality Worker",
        desc: "Hotel and travel services",
        icon: "🏨",
      },
      {
        title: "Retail Associate",
        desc: "Store and inventory management",
        icon: "🛒",
      },
      {
        title: "Food Service Worker",
        desc: "Restaurant and kitchen staff",
        icon: "🍽️",
      },
      {
        title: "Delivery / Logistics",
        desc: "Supply and distribution",
        icon: "🚚",
      },
    ],
  },
];
