import * as React from 'react';

interface XpProgressProps {
  xp: number; // total XP
  xpNext: number; // XP needed for next level
  level: number;
}

export function XpProgressBar({ xp, xpNext, level }: XpProgressProps) {
  const percentage = xpNext > 0 ? Math.min(100, (xp / xpNext) * 100) : 0;

  const [animated, setAnimated] = React.useState(0);

  React.useEffect(() => {
    requestAnimationFrame(() => {
      setAnimated(percentage);
    });
  }, [percentage]);

  return (
    <div className="w-full space-y-1.5">
      <div className="flex justify-between items-center text-[11px] text-gray-400 font-mono">
        <span>LVL {level}</span>
        <span>
          {xp} / {xpNext} XP
        </span>
      </div>

      {/* background (empty 30%) */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        {/* filled (70%) */}
        <div
          className="h-full bg-gray-900 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${animated}%` }}
        />
      </div>
    </div>
  );
}
