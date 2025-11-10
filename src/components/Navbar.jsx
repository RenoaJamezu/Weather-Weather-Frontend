function Navbar() {
  return (
    <nav className="w-full bg-transparent py-3">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            WW
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-semibold">Weather Weather</h1>
            <p className="text-xs text-gray-500 hidden sm:block">Simple real-time weather lookup</p>
          </div>
        </div>
        <div className="text-xs text-gray-500 hidden sm:block">Powered by OpenWeatherMap</div>
      </div>
    </nav>
  );
}

export default Navbar;