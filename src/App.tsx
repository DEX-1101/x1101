/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Cpu, Box, FileText, Image, Folder, X } from 'lucide-react';

interface NetworkInfo {
  location: string;
  isp: string;
  browser: string;
  os: string;
}

const XIcon = ({ size = 24, className, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const DiscordIcon = ({ size = 24, className, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const GithubIcon = ({ size = 24, className, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const YoutubeIcon = ({ size = 24, className, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const PatreonIcon = ({ size = 24, className, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M15.386 0c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 3.876 20.136 0 15.386 0zM0 24h5.49V0H0v24z" />
  </svg>
);

const PixivIcon = ({ size = 24, className, ...props }: any) => (
  <img 
    src="https://cdn.brandfetch.io/idIlKj_n7C/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1748201937135" 
    width={size} 
    height={size} 
    className={className} 
    alt="Pixiv" 
    {...props} 
  />
);

const PixivSocialIcon = ({ size = 24, className, ...props }: any) => (
  <svg width={size} height={size} viewBox="6 4 16 16" fill="currentColor" className={className} {...props}>
    <path d="M9.704 6.772v10.456h2.812v-2.094h1.006c2.812 0 4.77-1.876 4.77-4.18 0-2.306-1.958-4.182-4.77-4.182H9.704zm2.812 2.25h.92c1.236 0 2.03.816 2.03 1.932 0 1.114-.794 1.93-2.03 1.93h-.92V9.022z" />
  </svg>
);

const ColabIcon = ({ size = 24, className, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M16.9414 4.9757a7.033 7.033 0 0 0-4.9308 2.0646 7.033 7.033 0 0 0-.1232 9.8068l2.395-2.395a3.6455 3.6455 0 0 1 5.1497-5.1478l2.397-2.395a7.033 7.033 0 0 0-4.8877-1.9336zm-9.8828 0a7.033 7.033 0 0 0-4.8877 1.9336 7.033 7.033 0 0 0-.1232 9.8068l2.395-2.395a3.6455 3.6455 0 0 1 5.1497-5.1478l2.397-2.395a7.033 7.033 0 0 0-4.9308-2.0646zM7.0586 19.0243a7.033 7.033 0 0 0 4.9308-2.0646 7.033 7.033 0 0 0 .1232-9.8068l-2.395 2.395a3.6455 3.6455 0 0 1-5.1497 5.1478l-2.397 2.395a7.033 7.033 0 0 0 4.8877 1.9336zm9.8828 0a7.033 7.033 0 0 0 4.8877-1.9336 7.033 7.033 0 0 0 .1232-9.8068l-2.395 2.395a3.6455 3.6455 0 0 1-5.1497 5.1478l-2.397 2.395a7.033 7.033 0 0 0 4.9308 2.0646z"/>
  </svg>
);

const HuggingFaceIcon = ({ size = 24, className, ...props }: any) => (
  <img 
    src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg" 
    width={size} 
    height={size} 
    className={className} 
    alt="Hugging Face" 
    {...props} 
  />
);

const DeviantArtIcon = ({ size = 24, className, ...props }: any) => (
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/DeviantArt_Logo2.svg/500px-DeviantArt_Logo2.svg.png" 
    width={size} 
    height={size} 
    className={className} 
    alt="DeviantArt" 
    {...props} 
  />
);

const CZNIcon = ({ size = 24, className, ...props }: any) => (
  <img 
    src="https://raw.githubusercontent.com/DEX-1101/CZN-Save-Data-Tracker/refs/heads/main/asset/zx.svg" 
    width={size} 
    height={size} 
    className={className} 
    alt="CZN" 
    {...props} 
  />
);

const mainLinks = [
  { name: 'LoRA Trainer Colab', icon: ColabIcon, url: 'https://github.com/DEX-1101/kohya-trainer', color: '#F9AB00' },
  { name: 'Pixiv Request Proof', icon: PixivIcon, url: 'https://www.pixiv.net/en/users/51671453/illustrations/x1101', color: '#0096FA' },
  { name: 'My Lora, Dataset and Model Collection', icon: HuggingFaceIcon, url: 'https://huggingface.co/x1101', color: '#FFD21E' },
  { name: 'DeviantArt', icon: DeviantArtIcon, url: 'https://www.deviantart.com/frostx00001101', color: '#05CC47' },
  { name: 'CZN Save Data Tracker', icon: CZNIcon, url: 'https://czn-save-data-tracker.vercel.app/', color: '#FFFFFF' },
  { name: 'Character Request', icon: Box, url: '#', color: '#9CA3AF', disabled: true },
];

const socialLinks = [
  { name: 'X', icon: XIcon, url: 'https://x.com/x1101_idx', color: '#FFFFFF' },
  { name: 'Discord', icon: DiscordIcon, url: 'https://discord.com/users/512044995696525322', color: '#5865F2' },
  { name: 'GitHub', icon: GithubIcon, url: 'https://github.com/DEX-1101', color: '#FFFFFF' },
  { name: 'YouTube', icon: YoutubeIcon, url: 'https://www.youtube.com/@x1101_id', color: '#FF0000' },
  { name: 'Pixiv', icon: PixivSocialIcon, url: 'https://pixiv.me/x1101_id', color: '#0096FA' },
  { name: 'Patreon', icon: PatreonIcon, url: 'https://www.patreon.com/x1101_id', color: '#FF424D' },
];

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHoveringMain, setIsHoveringMain] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    if (isAboutOpen) {
      setAboutText("Loading...");
      fetch(`https://raw.githubusercontent.com/DEX-1101/x1101/refs/heads/main/about.txt?t=${new Date().getTime()}`)
        .then(res => res.text())
        .then(text => setAboutText(text))
        .catch(err => {
          console.error("Failed to fetch about text", err);
          setAboutText("Failed to load content.");
        });
    }
  }, [isAboutOpen]);

  useEffect(() => {
    const ua = navigator.userAgent;
    let browser = "Unknown Browser";
    if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("SamsungBrowser")) browser = "Samsung Internet";
    else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
    else if (ua.includes("Trident") || ua.includes("MSIE")) browser = "IE";
    else if (ua.includes("Edg")) browser = "Edge";
    else if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Safari")) browser = "Safari";

    let os = "Unknown OS";
    if (ua.includes("Win")) os = "Windows";
    else if (ua.includes("Mac")) os = "macOS";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("like Mac")) os = "iOS";

    setNetworkInfo({ location: "Loading...", isp: "Loading...", browser, os });

    const fetchNetworkData = async () => {
      if (!navigator.onLine) {
        setNetworkInfo(prev => prev ? { ...prev, location: "Offline", isp: "Offline" } : null);
        return;
      }

      try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();
        if (data && data.success) {
          const loc = data.city && data.country ? `${data.city}, ${data.country}` : data.ip || "Unknown Location";
          setNetworkInfo(prev => prev ? { ...prev, location: loc, isp: data.connection?.isp || data.connection?.org || "Unknown ISP" } : null);
          return;
        }
      } catch (e) {
        console.warn("ipwho.is failed, trying fallback...");
      }

      try {
        const res = await fetch("https://ipinfo.io/json");
        const data = await res.json();
        if (data && data.ip) {
          const loc = data.city && data.country ? `${data.city}, ${data.country}` : data.ip || "Unknown Location";
          setNetworkInfo(prev => prev ? { ...prev, location: loc, isp: data.org || "Unknown ISP" } : null);
          return;
        }
      } catch (e) {
        console.warn("ipinfo.io fallback failed.");
      }
      
      setNetworkInfo(prev => prev ? { ...prev, location: "Unknown Location", isp: "Unknown ISP" } : null);
    };

    fetchNetworkData();

    window.addEventListener('online', fetchNetworkData);
    window.addEventListener('offline', fetchNetworkData);

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      connection.addEventListener('change', fetchNetworkData);
    }

    return () => {
      window.removeEventListener('online', fetchNetworkData);
      window.removeEventListener('offline', fetchNetworkData);
      if (connection) {
        connection.removeEventListener('change', fetchNetworkData);
      }
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    const imagesToPreload = [
      'https://raw.githubusercontent.com/DEX-1101/SecretNAI/refs/heads/main/avatar.png',
      'https://cdn.countryflags.com/thumbs/indonesia/flag-400.png',
      'https://raw.githubusercontent.com/DEX-1101/x1101/refs/heads/main/src/reona.webp',
      'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/DeviantArt_Logo2.svg/500px-DeviantArt_Logo2.svg.png',
      'https://raw.githubusercontent.com/DEX-1101/CZN-Save-Data-Tracker/refs/heads/main/asset/zx.svg',
      'https://cdn.brandfetch.io/idIlKj_n7C/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1748201937135',
      'https://cdn3.emoji.gg/emojis/2255-18.png'
    ];
    imagesToPreload.forEach(src => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-white font-sans relative flex flex-col items-center justify-between py-12 overflow-hidden">
      {/* Background Image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 0.30 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://raw.githubusercontent.com/DEX-1101/x1101/refs/heads/main/src/reona.webp)' }}
      />
      
      <AnimatePresence>
        {showSplash ? (
          <motion.div
            key="splash"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Shiny Background Animation */}
            <motion.div
              className="absolute top-0 bottom-0 w-full block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none"
              initial={{ left: "-100%" }}
              animate={{ left: "200%" }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            
            <motion.div layoutId="profile-container" className="flex flex-col items-center gap-6 relative z-10">
              <motion.img 
                layoutId="profile-avatar"
                src="https://raw.githubusercontent.com/DEX-1101/SecretNAI/refs/heads/main/avatar.png" 
                alt="x1101" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-[4px] border-white/10 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <motion.div layoutId="profile-text" className="flex flex-col items-center gap-2 text-center">
                <motion.h1 layoutId="profile-name" className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg flex items-center gap-3">
                  x1101 
                  <img src="https://cdn.countryflags.com/thumbs/indonesia/flag-400.png" alt="ID" className="w-8 h-auto md:w-10 rounded-sm shadow-sm" referrerPolicy="no-referrer" />
                </motion.h1>
                <motion.p layoutId="profile-subtitle" className="text-base md:text-lg text-white/70 font-medium tracking-wide">
                  Your Waifu are mine...
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Loading Bar */}
            <motion.div 
              exit={{ opacity: 0, y: -20 }}
              className="absolute bottom-1/4 w-48 h-1 bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div 
                className="h-full bg-white rounded-full w-1/2"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="main"
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 flex flex-col items-center w-full max-w-6xl px-6 flex-grow justify-center gap-16 md:gap-24"
          >
            {/* Profile & Time */}
            <motion.div 
              layout
              layoutId="profile-container"
              className="flex items-center gap-4 md:gap-6"
            >
              <motion.img 
                layoutId="profile-avatar"
                src="https://raw.githubusercontent.com/DEX-1101/SecretNAI/refs/heads/main/avatar.png" 
                alt="x1101" 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-[3px] border-white/10 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <motion.div layout layoutId="profile-text" className="flex flex-col items-start justify-center h-16 md:h-20 gap-0.5 md:gap-1">
                <motion.h1 layout layoutId="profile-name" className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-lg flex items-center gap-2">
                  x1101 
                  <img src="https://cdn.countryflags.com/thumbs/indonesia/flag-400.png" alt="ID" className="w-6 h-auto md:w-8 rounded-sm shadow-sm" referrerPolicy="no-referrer" />
                </motion.h1>
                <motion.div layout layoutId="profile-subtitle">
                  <motion.button 
                    onClick={() => setIsAboutOpen(!isAboutOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative overflow-hidden px-4 py-1.5 rounded-none text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer group w-32 md:w-36 ${
                      isAboutOpen 
                        ? 'bg-red-500/20 border border-red-500/50 text-red-100' 
                        : 'bg-blue-500/20 border border-blue-500/50 text-blue-100'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={isAboutOpen ? 'close' : 'about'}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 block"
                      >
                        {isAboutOpen ? 'Close' : 'About me'}
                      </motion.span>
                    </AnimatePresence>
                    <motion.div
                      className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-transparent skew-x-[-20deg] ${
                        isAboutOpen ? 'via-red-200/40' : 'via-blue-200/40'
                      }`}
                      animate={{ left: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>

            <AnimatePresence mode="wait">
              {!isAboutOpen ? (
                <motion.div
                  key="tiles-view"
                  layout
                  className="w-full"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <motion.div 
                    className="relative w-full"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  >
              {/* Hover Reveal Text */}
          <motion.div
            initial={false}
            animate={{ 
              opacity: isHoveringMain ? 1 : 0, 
              y: isHoveringMain ? 0 : 15,
              scale: isHoveringMain ? 1 : 0.95,
              filter: isHoveringMain ? 'blur(0px)' : 'blur(8px)'
            }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="absolute -top-12 left-0 right-0 text-center pointer-events-none"
          >
            <h2 className="text-sm md:text-base font-semibold text-white/70 tracking-[0.2em] uppercase">
              My Stuff
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate="visible"
            onMouseEnter={() => setIsHoveringMain(true)}
            onMouseLeave={() => setIsHoveringMain(false)}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 0.99,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
          >
            {mainLinks.map((link) => {
              const isDisabled = link.disabled;
              const Component = isDisabled ? motion.div : motion.a;
              
              return (
                <Component
                  key={link.name}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 0.99, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  {...(!isDisabled ? {
                    href: link.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    whileHover: { scale: 1.03 },
                    whileTap: { scale: 0.97 }
                  } : {
                    tabIndex: 0
                  })}
                  className={`relative flex items-center gap-4 p-6 bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300 group ${
                    isDisabled 
                      ? 'opacity-60 cursor-not-allowed grayscale hover:grayscale-0 hover:opacity-100 active:grayscale-0 active:opacity-100 focus:grayscale-0 focus:opacity-100' 
                      : 'hover:bg-white/20 hover:border-white/30 hover:shadow-cyan-500/20'
                  }`}
                >
                  {isDisabled && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-zinc-800 text-white text-sm font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-white/10 z-20">
                      Coming soon...
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-800 border-b border-r border-white/10 rotate-45"></div>
                    </div>
                  )}
                  <div 
                    className={`relative z-10 flex-shrink-0 p-4 bg-white/5 transition-all duration-300 ${!isDisabled ? 'group-hover:bg-white/10' : ''}`}
                    style={{ color: link.color }}
                  >
                    <link.icon size={32} strokeWidth={1.5} />
                  </div>
                  <span className={`text-xl font-medium transition-colors ${isDisabled ? 'text-white/80' : 'text-white/90 group-hover:text-white'}`}>
                    {link.name}
                  </span>
                  {!isDisabled && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" 
                      style={{ backgroundColor: link.color }}
                    />
                  )}
                </Component>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    ) : (
      <motion.div
        key="about-view"
                  layout
                  className="w-full relative bg-white/5 backdrop-blur-lg border border-white/5 rounded-none shadow-2xl overflow-hidden flex flex-col"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="p-8 md:p-10 overflow-y-auto max-h-[60vh] whitespace-pre-wrap text-white/90 text-sm md:text-base leading-relaxed font-mono">
                    {aboutText}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Secondary Tiles (Socials) */}
            <motion.div 
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full max-w-3xl mt-8"
            >
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 0.99,
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  }
                }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full"
              >
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 0.99, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                    }}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden flex items-center justify-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl transition-all duration-300 group hover:bg-white/15 hover:border-white/20"
                  >
                    <link.icon size={20} className="transition-colors opacity-80 group-hover:opacity-100 relative z-10" style={{ color: link.color }} strokeWidth={2} />
                    <span className="text-base font-medium text-white/80 group-hover:text-white transition-colors relative z-10">
                      {link.name}
                    </span>
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center z-10" 
                      style={{ backgroundColor: link.color }} 
                    />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

  {/* Copyright & Time & Network Info */}
      <motion.div 
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 mt-12 text-sm font-medium tracking-wide flex flex-wrap items-center justify-center gap-2 text-center pb-8"
      >
        <span className="text-white/40">
          &copy; {new Date().getFullYear()}
        </span>
        <span className="text-white/20">|</span>
        <span className="tabular-nums text-white/40">{formattedTime}</span>
        
        {networkInfo && (
          <>
            <span className="text-white/20 hidden md:inline">|</span>
            <span className="text-white/40 text-xs md:text-sm w-full md:w-auto mt-2 md:mt-0">
              {networkInfo.location} • {networkInfo.isp} • {networkInfo.browser} • {networkInfo.os}
            </span>
          </>
        )}
      </motion.div>
    </div>
  );
}
