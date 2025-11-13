import Link from "next/link";

export default function NotFound() {
  const mainColor = "#" + (process.env.MAIN_COLOR || "153c7a");

  return (
    <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1
          className="text-8xl sm:text-9xl font-bold mb-4"
          style={{
            backgroundImage: `linear-gradient(135deg, ${mainColor} 0%, ${mainColor}dd 50%, #ffffff 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-4">
          Page Not Found
        </h2>
        <p className="text-base sm:text-lg text-gray-400 mb-8">Hmm... what?</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${mainColor} 0%, ${mainColor}dd 100%)`,
          }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
