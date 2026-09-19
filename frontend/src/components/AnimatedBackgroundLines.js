import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackgroundLines = () => {
  const numLines = 50;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-80 dark:opacity-60 flex justify-center">
      <style>{`
        @keyframes flyPlane {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .flying-plane {
          offset-rotate: auto 90deg;
          animation: flyPlane linear infinite;
        }
      `}</style>
      <svg
        className="w-full h-full absolute top-0 left-0"
        viewBox="-300 0 1600 3000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.0" />  {/* Transparent at top */}
            <stop offset="5%" stopColor="#dc2626" stopOpacity="0.7" /> {/* Red */}
            <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.9" /> {/* Amber/Gold */}
            <stop offset="70%" stopColor="#ef4444" stopOpacity="0.7" /> {/* Red */}
            <stop offset="95%" stopColor="#f59e0b" stopOpacity="0.6" /> {/* Amber */}
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" /> {/* Transparent at very bottom */}
          </linearGradient>
          
          <linearGradient id="ribbonGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.0" /> 
            <stop offset="5%" stopColor="#dc2626" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.8" /> 
            <stop offset="70%" stopColor="#f87171" stopOpacity="0.6" /> 
            <stop offset="95%" stopColor="#fbbf24" stopOpacity="0.5" /> 
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.0" /> 
          </linearGradient>
        </defs>

        {/* We animate the entire group slightly floating up and down */}
        <motion.g
          animate={{
            y: [0, 30, 0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          {Array.from({ length: numLines }).map((_, i) => {
            // Center the index around 0 for symmetric fanning
            const n = i - numLines / 2;
            
            // Generate sweeping, 3D ribbon-like paths that reach the bottom of a long page
            // Path 1 (Default state)
            const path1 = `M${100 + n * 7},${-100} 
                           C${300 + n * 2},${150} ${450 + n * 0.5},${300} ${400 + n * 1.5},${450} 
                           C${350 + n * 2.5},${650} ${150 + n * 14},${800} ${350 + n * 17},${1100} 
                           C${550 + n * 20},${1400} ${850 + n * 14},${1600} ${750 + n * 11},${1900} 
                           C${650 + n * 8},${2200} ${250 + n * 12},${2400} ${350 + n * 8},${2700}
                           C${450 + n * 4},${3000} ${550 + n * 4},${3100} ${650 + n * 3},${3200}`;

            // Path 2 (Slightly morphed state for breathing effect)
            const path2 = `M${100 + n * 7},${-100} 
                           C${280 + n * 2},${150} ${430 + n * 0.5},${300} ${380 + n * 1.5},${450} 
                           C${330 + n * 2.5},${650} ${120 + n * 14},${800} ${320 + n * 17},${1100} 
                           C${520 + n * 20},${1400} ${820 + n * 14},${1600} ${720 + n * 11},${1900} 
                           C${620 + n * 8},${2200} ${220 + n * 12},${2400} ${320 + n * 8},${2700}
                           C${420 + n * 4},${3000} ${520 + n * 4},${3100} ${620 + n * 3},${3200}`;

            return (
              <React.Fragment key={i}>
                <motion.path
                  d={path1}
                  fill="none"
                  className="stroke-[url(#ribbonGradient)] dark:stroke-[url(#ribbonGradientDark)]"
                  strokeWidth={1}
                  animate={{
                    d: [path1, path2, path1]
                  }}
                  transition={{
                    duration: 8 + Math.abs(n) * 0.2, // Outer lines move slightly slower
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.05 // Staggered animation
                  }}
                />
                
                {/* Add a few planes flying along specific paths */}
                {(i === 10 || i === 25 || i === 40) && (
                  <g 
                    className="flying-plane" 
                    style={{ 
                      offsetPath: `path('${path1}')`,
                      animationDuration: `${25 + (i % 3) * 5}s`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  >
                    {/* Plane SVG */}
                    <svg x="-20" y="-20" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#ribbonGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-[url(#ribbonGradientDark)]">
                      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21.5 4c0 0-2-.5-3.5 1.5L14.5 9 6.3 7.2C5.9 7.1 5.5 7.2 5.2 7.5L3 9.7c-.4.4-.3 1.1.2 1.4l6.1 3.5 2.2 6.1c.3.5 1 .6 1.4.2l2.2-2.2c.3-.3.4-.7.3-1.1z" />
                    </svg>
                  </g>
                )}
              </React.Fragment>
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
};

export default AnimatedBackgroundLines;
