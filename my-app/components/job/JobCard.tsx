interface JobCardProps {
    company: string;
    title: string;
    location: string;
    salary: string;
    posted: string;
  }
  

 const JobCard = ({ company, title, location, salary, posted }: JobCardProps) => (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-3">
      <div className="flex items-center space-x-3">
        <img src={`/logos/${company.toLowerCase()}.png`} alt={company} className="w-10 h-10" />
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-sm text-gray-500">{company}</span>
        </div>
      </div>
      <div className="text-gray-500">
        <span className="block">{location}</span>
        <span className="block">{salary}</span>
        <span className="block">{posted}</span>
      </div>
      <button className="self-start px-3 py-1 bg-blue-400 text-white rounded-md">
        Details
      </button>
    </div>
  );

  export default JobCard;