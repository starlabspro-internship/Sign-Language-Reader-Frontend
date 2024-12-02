export function makeVisible(targetSelector, visibleClass) {
    const targets = document.querySelectorAll(targetSelector);
    
    if (!targets.length) {
      console.error(`No elements found for selector: ${targetSelector}`);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(visibleClass); 
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 
    });
  
    targets.forEach(target => observer.observe(target));
  }
  