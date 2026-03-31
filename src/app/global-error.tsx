"use client";

//interface
interface IErrorComponentProps {
  reset?: () => void;
}

//component
const ErrorComponent = ({ reset }: IErrorComponentProps) => {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
          <div className="flex items-center justify-center mb-8 select-none">
            <span className="text-[120px] md:text-[180px] font-extrabold text-black leading-none">
              5
            </span>
            <span className="text-[120px] md:text-[180px] font-extrabold text-black leading-none tracking-tighter">
              00
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              Something went wrong <span className="text-xl">🛠️</span>
            </h1>
            <p className="text-gray-500 max-w-sm mx-auto">
              An unexpected error occurred. Please try again or return home.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {reset && (
              <button
                onClick={() => reset()}
                className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium transition-all hover:bg-gray-800 active:scale-95 duration-200 shadow-lg"
              >
                Try again
              </button>
            )}

            <a
              href="/"
              className="inline-block border-2 border-black text-black px-8 py-3 rounded-lg font-medium transition-all hover:bg-gray-50 active:scale-95 duration-200"
            >
              Back to home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
};

export default ErrorComponent;
