// src/components/ui/RadialProgress.jsx

import React from 'react';
import { motion } from 'framer-motion';

const RadialProgress = ({ percentage, color, size = 100, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <motion.svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="text-slate-700/50"
          fill="transparent"
          stroke="currentColor"
        />
        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </motion.svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-white">{`${Math.round(percentage)}%`}</span>
      </div>
    </div>
  );
};

export default RadialProgress;