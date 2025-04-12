// import React from "react";
// import { FaSearch, FaTimes } from "react-icons/fa";

// const SearchBar = ({ searchTerm, setSearchTerm }) => {
//   return (
//     <div className="flex items-center justify-center p-4">
//       <form className="flex  items-center justify-between gap-4 bg-gray-100 p-2 rounded-md w-full sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px] 2xl:w-[600px]">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="bg-transparent outline-none w-full"
//         />
//         {searchTerm && (
//           <FaTimes
//             className="cursor-pointer text-gray-500 hover:text-red-500"
//             onClick={() => setSearchTerm("")}
//           />
//         )}
//         <FaSearch className="text-gray-500" />
//       </form>
//     </div>
//   );
// };

// export default SearchBar;


import { FaSearch, FaTimes } from "react-icons/fa";
import React from "react";

const SearchbarSmall = ({ searchTerm, setSearchTerm }) => {
  return (
    <form className=" md:hidden sm:flex flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md w-full my-2">
       <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none w-full"
        />
        {searchTerm && (
          <FaTimes
            className="cursor-pointer text-gray-500 hover:text-red-500"
            onClick={() => setSearchTerm("")}
          />
        )}
        <FaSearch className="text-gray-500" />
    </form>
  );
}

export default SearchbarSmall;
