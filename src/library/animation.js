import { gsap } from "gsap";


export function initMenu(menuElement) {
  gsap.set(menuElement, {
    y: window.innerHeight,
    opacity: 0
  });
}

export function openMenuAnimation(menuElement, buttonRef) {
    const timeline = gsap.timeline()

    timeline.to(buttonRef, {
        y: () => window.innerHeight - buttonRef.getBoundingClientRect().top + 100, // descend sous l’écran
        scale: 0.9, // effet organique
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
    })
    .to(menuElement, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.2)" // 🔥 effet vivant
    }, "-=0.1"); // overlap pour fluidité

    return timeline;
}

export function closeMenuAnimation(menuElement, buttonRef) {
    const timeline = gsap.timeline()

    timeline.to(menuElement, {
        y: () => window.innerHeight,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
    })
    .to(buttonRef, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out"
    }, "-=0.2");

    return timeline;
}

export async function logginAnimation() {
    const timeline = gsap.timeline();
    timeline.to(".home-title", {
      opacity: 0,
      duration: 0
    }, 0)
    
    timeline.to(".google-button", {
      opacity: 0,
      duration: 0
    }, 0)
    timeline.to(".blob-top", {
      y: "-120%",
      duration: 1,
      ease: "power2.in"
    }, 0);

    timeline.to(".blob-bottom", {
      y: "120%",
      duration: 1,
      ease: "power2.in"
    }, 0);

    timeline.to(".background-layer", {
      opacity: 0,
      duration: 0.8
    }, 0.2);

    return timeline;
}