import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <button
            onClick={toggleDarkMode}
            className="group flex items-center gap-2 text-sm tracking-wide transition-colors"
            style={{ fontFamily: 'system-ui, sans-serif' }}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <span className="text-stone-500 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors hidden sm:inline">
                {isDarkMode ? 'Lights on' : 'Lights off'}
            </span>
            <div className="relative w-12 h-6 bg-stone-200 dark:bg-stone-700 rounded-full transition-colors duration-300 cursor-pointer">
                <div 
                    className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isDarkMode 
                            ? 'left-6 bg-stone-900' 
                            : 'left-0.5 bg-white shadow-sm'
                    }`}
                >
                    {isDarkMode ? (
                        <Moon className="w-3 h-3 text-blue-400" />
                    ) : (
                        <Sun className="w-3 h-3 text-amber-500" />
                    )}
                </div>
            </div>
        </button>
    );
};

export default DarkModeToggle;
