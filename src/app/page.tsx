
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000); // 3 second delay

    return () => clearTimeout(timer);
  }, [router]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const nodeVariants = {
    initial: { scale: 0.8, opacity: 0.5 },
    animate: {
      scale: [0.8, 1.1, 0.8],
      opacity: [0.5, 1, 0.5],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
    },
    shift: {
      x: [0, 10, -10, 5, 0],
      y: [0, 10, 5, -10, 0],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  const lineVariants = {
    initial: { opacity: 0.1 },
    animate: {
      opacity: [0.1, 0.3, 0.1],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    }
  }

  const nodes = [
    { size: 'w-4 h-4', left: '10%', top: '20%', delay: 0 },
    { size: 'w-6 h-6', left: '80%', top: '40%', delay: 0.5 },
    { size: 'w-5 h-5', left: '30%', top: '70%', delay: 1 },
    { size: 'w-3 h-3', left: '50%', top: '10%', delay: 1.5 },
    { size: 'w-7 h-7', left: '20%', top: '50%', delay: 2 },
    { size: 'w-4 h-4', left: '90%', top: '80%', delay: 2.5 },
    { size: 'w-5 h-5', left: '40%', top: '30%', delay: 3 },
    { size: 'w-6 h-6', left: '70%', top: '60%', delay: 3.5 },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="bg-[#0F172A] relative min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary rounded-full"
            style={{ 
              width: node.size.split(' ')[0].replace('w-',''), 
              height: node.size.split(' ')[1].replace('h-',''),
              left: node.left,
              top: node.top,
            }}
            variants={nodeVariants}
            initial="initial"
            animate={["animate", "shift"]}
            transition={{
              scale: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: node.delay },
              opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: node.delay },
              x: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: node.delay },
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: node.delay },
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-8 relative">
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <svg
                    className="h-24 w-24 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M12 2L3 9v11a2 2 0 002 2h14a2 2 0 002-2V9L12 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                    <path d="M16 12H8" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary opacity-30 animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">E-Office</h1>
          <p className="text-lg text-gray-300/80 mb-12">Data-Driven Efficiency</p>
          <div className="w-full max-w-xs">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-gray-200/60">
                    Initializing Module...
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/20">
                <motion.div
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: 'easeInOut' }}
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 text-center">
          <p className="text-sm text-gray-100/40">Version 1.0.0</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SplashPage;
