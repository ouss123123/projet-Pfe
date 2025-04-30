const Skeleton = () => {
    return (
      <div className="w-full bg-white dark:bg-[#1c2733] p-5 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 h-10 w-10 rounded-full mb-5" />
          <div className="animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 h-5 w-3/5 ml-3 -translate-y-[7px] rounded mb-2" />
        </div>
        <div className="animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 h-4 w-full rounded" />
      </div>
    );
  };
  
  export default Skeleton;