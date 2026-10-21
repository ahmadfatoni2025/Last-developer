export function Header() {
  return (
    <header
      className="relative z-50 max-w-6xl mx-auto px-6 pt-6 pb-4 flex items-center justify-between"
      data-purpose="site-navigation"
    >
      <a href="#" aria-label="leam homepage" className="flex items-center gap-2 group tracking-tight">
        <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center p-[2px]">
          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
        </div>
        <span className="text-xl font-bold tracking-tight text-white group-hover:opacity-90 transition-opacity">
          leam
        </span>
      </a>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-700 bg-neutral-900 hidden sm:block">
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm5CzbekrgDh0hzwpgF7Oe4AMRbSHUVhzFIo8pKRQLkweWvbSDr_XGUF20uvrv82qUjTlSweIEpo9B4mnnhsWcc2xt0IbcUN_TlfnId33hgz64VTqB1rx31pOTupJBB_MxmuhZroriszXmiKG4B6xqddgIfy0ml6I7-aUYaKazYSh2zY8Hg3x3SRpQwwQq7B__zPJ2AdCrrsNtgse_9j1AvEQwyshM-y8F8DP5dEKrQh1q8B8RnYtS"
          />
        </div>
        <a
          href="#get-the-app"
          className="bg-white text-black hover:bg-neutral-200 transition-all font-medium text-xs sm:text-sm px-4 py-2 rounded-full tracking-normal flex items-center gap-1.5 shadow-sm"
        >
          <span>Get the app</span>
        </a>
      </div>
    </header>
  );
}
