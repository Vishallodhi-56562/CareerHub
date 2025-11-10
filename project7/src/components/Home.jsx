
import React, {useRef, useState} from "react";
import Navbar from "./Navbar";
import Category from "./Category";
import JobCard from "./JobCard";
import Resources from "./Resources";
import Footer from "./Footer";

export default function Home({ isLoggedIn, setIsLoggedIn, jobs }) {


    const [selectedCategory, setSelectedCategory] = useState("");

 const jobCardRef = useRef(null)
const resourcesRef = useRef(null)

const scrollToJobCard = () => {
    if(jobCardRef.current){
        jobCardRef.current.scrollIntoView({behavior: 'smooth'})
    }
}


const scrollToResources = () => {
    if(resourcesRef.current){
        resourcesRef.current.scrollIntoView({behavior: 'smooth'})
    }
}



  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Navbar always on top */}
      <Navbar scrollToResources={scrollToResources}
              scrollToJobCard={scrollToJobCard} 
              isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
              />

      {/* Add spacing because navbar is fixed */}
      <div className="pt-20">
        <Category onCategorySelect={setSelectedCategory} />
  <h2 className="text-2xl font-bold text-center mt-5 text-gray-700">
        {selectedCategory ? `${selectedCategory} Jobs` : "All Jobs"}
      </h2>


      </div>
      <div ref={jobCardRef}>
        <JobCard jobs={jobs} selectedCategory={selectedCategory}/>

        </div>
      <div ref={resourcesRef}>
        <Resources/>
      </div>
       <div>
        <Footer/>
       </div>

            {/* Below carousel you can add more home content */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold text-orange-700 mb-4">
          Find Your Dream Remote Job
        </h2>
        <p className="text-gray-600">
          Search thousands of verified remote jobs and connect with top
          companies.
        </p>
      </section>
    </div>
  );
}
