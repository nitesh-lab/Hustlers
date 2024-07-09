import { Job_type } from "@/Context/JobProvider";

interface JobCardProps {
    company: string;
    title: string;
    location: string;
    salary: string;
    posted: string;
  }
  
  function convertTimestamp(timestamp:string) {
    const dateObj = new Date(timestamp); // Original timestamp in UTC
    
    const istTimestamp = new Date(); // Current timestamp in IST
    istTimestamp.setHours(istTimestamp.getHours() + 5); // Add 5 hours for IST
    istTimestamp.setMinutes(istTimestamp.getMinutes() + 30); // Add 30 minutes for IST

    // Calculate the time difference in milliseconds
    const timeDifference = istTimestamp.getTime() - dateObj.getTime();
    
    // Convert milliseconds to seconds
    const secondsDifference = Math.floor(timeDifference / 1000);

    // Handle different cases based on the time difference
    if (secondsDifference < 60) {
        return `${secondsDifference} seconds ago`;
    } else if (secondsDifference < 3600) {
        const minutesDifference = Math.floor(secondsDifference / 60);
        return `${minutesDifference} minutes ago`;
    } else if (istTimestamp.getDate() === dateObj.getDate()) {
        const hours = dateObj.getUTCHours();
        const minutes = dateObj.getUTCMinutes();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return `Today at ${formattedTime}`;
    } else {
        const daysDifference = Math.floor(secondsDifference / 86400); // 86400 seconds in a day
        return `${daysDifference} days ago`;
    }
}

 const JobCard = ({ obj }:{obj :Job_type}) => {

  return  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-3">
      <div className="flex items-center space-x-3">
        <img src={obj.company.image} alt={""} className="w-10 h-10" />
        <div>
          <h3 className="text-lg font-semibold">{obj.jobTitle}</h3>
          <span className="text-sm text-gray-500">{obj.company.name}</span>
        </div>
      </div>
      <div className="text-gray-500">
        <span className="block">City:{obj.company.location}</span>
        {/* <span className="block">{obj.stipend}</span> */}
        <span className="block">Posted:{convertTimestamp(obj.posted_time as unknown as string)}</span>
      </div>
      <button className="self-start px-3 py-1 bg-blue-400 text-white rounded-md">
        Details
      </button>
    </div>
 };

  export default JobCard;