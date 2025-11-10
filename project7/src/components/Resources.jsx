import React from "react";

export default function Resources() {
  const resources = [
    {
      title: "Resume Builder",
      description: "Build a professional resume in minutes.",
      link: "https://www.canva.com/resumes/templates/",
    },
    {
      title: "Interview Preparation",
      description: "Top questions and answers for tech interviews.",
      link: "https://www.interviewbit.com/",
    },
    {
      title: "Learn React",
      description: "Master modern React with free tutorials and projects.",
      link: "https://react.dev/learn",
    },
    {
      title: "Job Search Tips",
      description: "Strategies to find jobs faster and stand out.",
      link: "https://www.indeed.com/career-advice/finding-a-job",
    },
    {
      title: "LinkedIn Optimization",
      description: "Make your LinkedIn profile attract recruiters.",
      link: "https://www.linkedin.com/learning/",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-20 py-16 px-10">
      <h2 className="text-4xl font-bold text-center text-orange-800 mb-10">
        Career Resources
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="text-orange-700 font-medium hover:underline"
            >
              Explore →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
