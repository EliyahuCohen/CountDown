"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import moment from "moment";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  endTime: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-br from-purple-600 to-blue-500 overflow-hidden">
      <motion.div
        className="absolute w-full h-full top-0 left-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: 'url("/path/to/your/background-image.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <motion.div
        className="relative text-center text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl sm:text-6xl font-bold mb-8">
          Countdown to Talk
        </h1>
        <div className="flex space-x-4 justify-center text-lg sm:text-4xl font-mono">
          <motion.div
            className="time-section"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-4xl md:text-8xl">{timeLeft.days}</span>
            <span>Days</span>
          </motion.div>
          <motion.div
            className="time-section"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-4xl md:text-8xl">{timeLeft.hours}</span>
            <span>Hours</span>
          </motion.div>
          <motion.div
            className="time-section"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-4xl md:text-8xl">
              {timeLeft.minutes}
            </span>
            <span>Minutes</span>
          </motion.div>
          <motion.div
            className="time-section"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-4xl md:text-8xl">
              {timeLeft.seconds}
            </span>
            <span>Seconds</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Page() {
  const endTime = moment().endOf("day").format("YYYY-MM-DD HH:mm:ss");

  return (
    <div>
      <CountdownTimer endTime={endTime} />
    </div>
  );
}
