// import axios from "axios";
// import React, { useEffect } from "react";
// import { Job_API_END_POINT } from "@/utils/constant";
// import { useDispatch } from "react-redux";
// import { setAllAdminJobs } from "../redux/jobSlice";

// const useGetAllAdminJobs = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const fetchAllAdminJobs = async () => {
//       try {
//         const res = await axios.get(`${Job_API_END_POINT}/getadminjobs`, {
//           withCredentials: true,
//         });
//         console.log("API Response:", res.data); // Log the entire response
//         if (!res.data.jobs || res.data.jobs.length === 0) {
//           console.log("API Response:", res.data); // Log the entire response
//           console.log("no jobs found:");
//           return; // You can also handle state or display a message if desired
//         }
//         if (res.data.success) {
//           dispatch(setAllAdminJobs(res.data.jobs));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchAllAdminJobs();
//   }, []);
// };

// export default useGetAllAdminJobs;

import axios from "axios";
import React, { useEffect } from "react";
import { Job_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "../redux/jobSlice";
const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${Job_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        console.log("API Response:", res.data);

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        } else {
          console.log("No jobs found or unsuccessful response:", res.data);
        }
      } catch (error) {
        console.error("Error fetching admin jobs:", error);
        // Optionally, set error state here
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]); // Add dispatch to dependencies if you have it in the closure
};

export default useGetAllAdminJobs;
