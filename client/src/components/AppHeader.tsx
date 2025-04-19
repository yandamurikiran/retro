import { useTheme } from './ThemeProvider';

export default function AppHeader() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800">
      <div className="instagram-gradient h-1"></div>
      <div className="bg-instagram-darkgray py-3 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="font-semibold text-xl tracking-tighter">Instagram</div>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={toggleTheme} 
            className="text-white" 
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18.75 20.25c-1.836 2.47-4.772 4.062-8.126 4.062-5.447 0-9.864-4.416-9.864-9.864 0-3.354 1.592-6.29 4.062-8.126a9.72 9.72 0 0 1 5.248-2.998 9.927 9.927 0 0 0-.38 2.556c0 5.42 4.388 9.807 9.807 9.807.494 0 .986-.04 1.468-.12.483-.08.956-.21 1.408-.378Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
