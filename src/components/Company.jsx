import React from "react";

const jobs = [
  {
    id: 1,
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2023.svg",
    company: "TechNova Labs",
    title: "Frontend Developer",
    type: "Full-Time",
    mode: "Remote",
    location: "Bangalore, India",
    posted: "2 days ago",
    description:
      "TechNova Labs is looking for a skilled Frontend Developer experienced in React and Tailwind CSS to join our design-driven product team.",
  },
  {
    id: 2,
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Codeforces_logo.svg",
    company: "Cloudbyte Solutions",
    title: "Backend Engineer",
    type: "Full-Time",
    mode: "Hybrid",
    location: "Pune, India",
    posted: "4 days ago",
    description:
      "Cloudbyte Solutions specializes in building cloud-native applications. We’re hiring backend engineers proficient in Node.js and MongoDB.",
  },
  {
    id: 3,
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
    company: "BrightPath Analytics",
    title: "Data Scientist",
    type: "Part-Time",
    mode: "Remote",
    location: "Delhi, India",
    posted: "1 day ago",
    description:
      "Join BrightPath’s analytics division and help create AI models that analyze customer data and generate predictive insights.",
  },
  {
    id: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    company: "GreenByte Tech",
    title: "UI/UX Designer",
    type: "Contract",
    mode: "On-Site",
    location: "Hyderabad, India",
    posted: "3 days ago",
    description:
      "GreenByte is building a sustainability-focused app. We’re seeking a designer who can turn complex ideas into clean, accessible designs.",
  },
  {
    id: 5,
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Logo_of_Twitter.svg",
    company: "CyberPulse Media",
    title: "Digital Marketing Manager",
    type: "Full-Time",
    mode: "Remote",
    location: "Mumbai, India",
    posted: "5 days ago",
    description:
      "CyberPulse is a fast-growing digital agency helping startups scale. Looking for a marketing lead with solid SEO and campaign experience.",
  },
];

const JobCard = () => {
  return (
    <div className="w-screen pt-30 flex flex-wrap justify-center gap-10 p-10 bg-gray-50">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="w-[320px] bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-200 overflow-hidden"
        >
          <div className="flex justify-between items-center p-4">
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="h-14 w-14 object-contain border-2 border-gray-200 rounded-full p-1"
            />
            <span className="text-sm text-gray-500">{job.posted}</span>
          </div>

          <div className="px-5 pb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {job.title}
            </h3>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-500 mt-1">{job.location}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-lg">
                {job.type}
              </span>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-lg">
                {job.mode}
              </span>
            </div>

            <p className="mt-3 text-gray-600 text-sm">{job.description}</p>

            <button className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition active:bg-slate-400">
              Apply Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCard;
