import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiFileText, 
  FiUpload, 
  FiArrowLeft, 
  FiArrowRight,
  FiCheckCircle,
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiX,
  FiPaperclip,
  FiLinkedin,
  FiGlobe
} from "react-icons/fi";

const ApplyForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [resumeFile, setResumeFile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    experience: "",
    coverLetter: "",
    agreeToTerms: false
  });

  // Fetch job details
  useEffect(() => {
    setLoading(true);
    
    // Mock job data for demonstration
    setTimeout(() => {
      const mockJob = {
        _id: jobId,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "Remote (Global)",
        salary: { min: 80000, max: 120000 },
        employmentType: "Full-time",
        experienceLevel: "Senior Level",
        description: "We are looking for an experienced Frontend Developer to join our growing team.",
        benefits: ["Health Insurance", "401k Matching", "Flexible Hours", "Stock Options"],
        posted: "2 days ago"
      };
      
      setJob(mockJob);
      setLoading(false);
    }, 800);

    // Uncomment for real API
    // fetch(`http://localhost:5000/api/jobs/${jobId}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setJob(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     setLoading(false);
    //   });
  }, [jobId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, resume: "File size must be less than 5MB" });
        return;
      }
      setResumeFile(file);
      setErrors({ ...errors, resume: "" });
    }
  };

  // Validate form
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = "Invalid phone number";
      }
    }
    
    if (step === 2) {
      if (!formData.experience) newErrors.experience = "Please select your experience level";
      if (!resumeFile) newErrors.resume = "Resume is required";
    }
    
    if (step === 3) {
      if (!formData.coverLetter.trim()) {
        newErrors.coverLetter = "Cover letter is required";
      } else if (formData.coverLetter.trim().length < 100) {
        newErrors.coverLetter = "Cover letter should be at least 100 characters";
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = "You must agree to the terms";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    setSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      const applications = JSON.parse(localStorage.getItem("applications") || "[]");
      applications.push({
        jobId,
        jobTitle: job?.title,
        company: job?.company,
        ...formData,
        resumeFileName: resumeFile?.name,
        date: new Date().toLocaleString()
      });
      localStorage.setItem("applications", JSON.stringify(applications));
      
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  // Format salary
  const formatSalary = (salary) => {
    if (!salary) return "Not disclosed";
    if (typeof salary === 'object') {
      return `₹${Number(salary.min).toLocaleString()} - ₹${Number(salary.max).toLocaleString()}`;
    }
    return `₹${Number(salary).toLocaleString()}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-xl font-medium text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  // Success state
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-lg w-full border border-white/50">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <FiCheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your application for <span className="font-semibold text-gray-800">{job?.title}</span> at <span className="font-semibold text-gray-800">{job?.company}</span> has been successfully submitted.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            We'll review your application and get back to you within 5-7 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
            >
              View Applications
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 group transition-colors"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Jobs</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 sticky top-8">
              {/* Company Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl font-bold text-white">{job?.company?.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{job?.company}</h3>
                <p className="text-gray-500">{job?.location}</p>
              </div>

              {/* Job Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{job?.title}</h2>

              {/* Job Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <FiDollarSign size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Salary</p>
                    <p className="font-semibold text-gray-800">{formatSalary(job?.salary)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                    <FiBriefcase size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Type</p>
                    <p className="font-semibold text-gray-800">{job?.employmentType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                    <FiClock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Posted</p>
                    <p className="font-semibold text-gray-800">{job?.posted}</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              {job?.benefits && job.benefits.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">Benefits</p>
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.map((benefit, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Submit Your Application</h2>
                <p className="text-blue-100">Fill out the form below to apply for this position</p>
              </div>

              {/* Progress Steps */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center justify-between max-w-md mx-auto">
                  {[1, 2, 3].map((step) => (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                          currentStep >= step 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {currentStep > step ? <FiCheckCircle size={24} /> : step}
                        </div>
                        <span className={`text-xs mt-2 font-medium ${currentStep >= step ? 'text-gray-800' : 'text-gray-400'}`}>
                          {step === 1 ? 'Personal Info' : step === 2 ? 'Experience' : 'Cover Letter'}
                        </span>
                      </div>
                      {step < 3 && (
                        <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                          currentStep > step ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-200'
                        }`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-8">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                            errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <FiX size={14} /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                            errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <FiX size={14} /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 12345 67890"
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                            errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <FiX size={14} /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Professional Details */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Professional Details</h3>
                    
                    {/* LinkedIn */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn Profile
                      </label>
                      <div className="relative">
                        <FiLinkedin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          placeholder="https://linkedin.com/in/johndoe"
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                        />
                      </div>
                    </div>

                    {/* Portfolio */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Portfolio Website
                      </label>
                      <div className="relative">
                        <FiGlobe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="url"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleChange}
                          placeholder="https://johndoe.com"
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                        />
                      </div>
                    </div>

                    {/* Experience Level */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          errors.experience ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <option value="">Select experience level</option>
                        <option value="0-1">0-1 years (Entry Level)</option>
                        <option value="1-3">1-3 years (Junior)</option>
                        <option value="3-5">3-5 years (Mid Level)</option>
                        <option value="5-8">5-8 years (Senior)</option>
                        <option value="8+">8+ years (Lead/Principal)</option>
                      </select>
                      {errors.experience && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <FiX size={14} /> {errors.experience}
                        </p>
                      )}
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resume/CV <span className="text-red-500">*</span>
                      </label>
                      <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                        errors.resume 
                          ? 'border-red-300 bg-red-50' 
                          : resumeFile 
                            ? 'border-green-300 bg-green-50' 
                            : 'border-gray-300 hover:border-blue-400 bg-gray-50'
                      }`}>
                        <input
                          type="file"
                          id="resume"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label htmlFor="resume" className="cursor-pointer">
                          {resumeFile ? (
                            <div className="flex items-center justify-center gap-3">
                              <FiCheckCircle className="text-green-500" size={24} />
                              <div className="text-left">
                                <p className="font-semibold text-gray-800">{resumeFile.name}</p>
                                <p className="text-sm text-gray-500">Click to change file</p>
                              </div>
                            </div>
                          ) : (
                            <>
                              <FiUpload className="mx-auto text-gray-400 mb-3" size={32} />
                              <p className="font-medium text-gray-700">Click to upload resume</p>
                              <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                            </>
                          )}
                        </label>
                      </div>
                      {errors.resume && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <FiX size={14} /> {errors.resume}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Cover Letter */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Cover Letter</h3>
                    
                    {/* Cover Letter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Why are you interested in this position? <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleChange}
                          rows={8}
                          placeholder="Tell us about yourself, your experience, and why you're the perfect fit for this role..."
                          className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all ${
                            errors.coverLetter ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        />
                        <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                          {formData.coverLetter.length} characters
                        </div>
                      </div>
                      {errors.coverLetter && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <FiX size={14} /> {errors.coverLetter}
                        </p>
                      )}
                    </div>

                    {/* Terms Agreement */}
                    <div className={`p-4 rounded-xl ${errors.agreeToTerms ? 'bg-red-50' : 'bg-gray-50'}`}>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                        />
                        <span className="text-sm text-gray-600">
                          I confirm that the information provided is accurate and I agree to the 
                          <a href="/terms" className="text-blue-600 hover:underline ml-1">Terms & Conditions</a> and 
                          <a href="/privacy" className="text-blue-600 hover:underline ml-1">Privacy Policy</a>.
                        </span>
                      </label>
                      {errors.agreeToTerms && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <FiX size={14} /> {errors.agreeToTerms}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex items-center gap-2 px-6 py-3 text-gray-600 font-medium hover:text-gray-800 transition-colors"
                    >
                      <FiArrowLeft /> Previous
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                    >
                      Continue <FiArrowRight />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application <FiCheckCircle />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ApplyForm;