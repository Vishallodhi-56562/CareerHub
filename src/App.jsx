import React from 'react'

import Card from './Components/Card'

const App = (props) => {

const jobPostings = [
  {
    company: "Tech Innovators",
    logo: "https://via.placeholder.com/80?text=TI",
    time: "2 days ago",
    tag1: ["Full Time"],
    tag2: ["Senior Level"],
    pay: "$150/hr",
    location: "Mumbai, India"
  },
  {
    company: "Digital Solutions Inc",
    logo: "https://via.placeholder.com/80?text=DS",
    time: "5 days ago",
    tag1: ["Part Time"],
    tag2: ["Mid Level"],
    pay: "$120/hr",
    location: "Delhi, India"
  },
  {
    company: "CloudWorks Global",
    logo: "https://via.placeholder.com/80?text=CW",
    time: "1 day ago",
    tag1: ["Full Time"],
    tag2: ["Entry Level"],
    pay: "$80/hr",
    location: "Bangalore, India"
  },
  {
    company: "DataStream Technologies",
    logo: "https://via.placeholder.com/80?text=DT",
    time: "3 days ago",
    tag1: ["Contract"],
    tag2: ["Senior Level"],
    pay: "$180/hr",
    location: "Pune, India"
  },
  {
    company: "NextGen Systems",
    logo: "https://via.placeholder.com/80?text=NG",
    time: "1 week ago",
    tag1: ["Part Time"],
    tag2: ["Junior Level"],
    pay: "$95/hr",
    location: "Hyderabad, India"
  },
  {
    company: "InnovateTech Labs",
    logo: "https://via.placeholder.com/80?text=IL",
    time: "4 days ago",
    tag1: ["Full Time"],
    tag2: ["Lead Level"],
    pay: "$200/hr",
    location: "Chennai, India"
  },
  {
    company: "QuantumSoft",
    logo: "https://via.placeholder.com/80?text=QS",
    time: "6 days ago",
    tag1: ["Remote"],
    tag2: ["Mid Level"],
    pay: "$130/hr",
    location: "Kolkata, India"
  },
  {
    company: "FutureVision Corp",
    logo: "https://via.placeholder.com/80?text=FV",
    time: "2 hours ago",
    tag1: ["Internship"],
    tag2: ["Entry Level"],
    
    pay: "$50/hr",
    location: "Mumbai, India"
  },
  {
    company: "AlphaTech Ventures",
    logo: "https://via.placeholder.com/80?text=AV",
    time: "5 days ago",
    tag1: ["Part Time"],
    tag2: ["Senior Level"],
    pay: "$165/hr",
    location: "Ahmedabad, India"
  },
  {
    company: "CyberCore Solutions",
    logo: "https://via.placeholder.com/80?text=CC",
    time: "3 days ago",
    tag1: ["Full Time"],
    tag2: ["Expert Level"],
    pay: "$220/hr",
    location: "Noida, India"
  }
];
  return(
    <div className="parent">
      {jobPostings.map(function(elem,idx){
        return <div key={idx}>
          <Card company={elem.company} time={elem.time} tag1={elem.tag1} tag2={elem.tag2} pay={elem.pay} location={elem.location}/>
        </div>
      })}
    </div>
  )
}

export default App