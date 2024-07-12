export default function Loading() {
  return (
    <div className="flex flex-col gap-5 w-full">
      {[...Array(5)].map((_, index) => (
        <div className="flex gap-3 *:animate-pulse border p-5" key={index}>
          <div className="bg-gray-300 rounded-full size-14"></div>
          <div className="flex flex-col gap-2 w-[calc(100%-4.25rem)]">
            <div className="flex gap-1">
              <span className="w-20 h-5 bg-gray-300 rounded-md"></span>
              <span className="w-20 h-5 bg-gray-300 rounded-md"></span>
              <span className="w-20 h-5 bg-gray-300 rounded-md"></span>
            </div>
            <div className="w-full h-5 bg-gray-300 rounded-md"></div>
            <div className="w-10/12 h-5 bg-gray-300 rounded-md"></div>
            <div className="w-8/12 h-5 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
}