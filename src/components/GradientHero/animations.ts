const easing = [0.22, 1, 0.36, 1];

export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 30
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: easing 
    }
  }
};

export const fadeInScale = {
  hidden: { 
    opacity: 0, 
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: easing 
    }
  }
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const navAnimation = {
  hidden: { 
    y: -20, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6, 
      ease: easing 
    }
  }
};
