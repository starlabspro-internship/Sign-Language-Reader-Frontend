// document.addEventListener("DOMContentLoaded", function () {
//   const sr = ScrollReveal({ reset: true });

//   function revealContent() {
//     const elementsLeft = document.querySelectorAll(".js--fadeInLeft");
//     const elementsRight = document.querySelectorAll(".js--fadeInRight");

//     // Check screen width
//     if (window.innerWidth < 768) {
//       // Change js--fadeInLeft to js--fadeInRight
//       elementsLeft.forEach((element) => {
//         element.classList.remove("js--fadeInLeft");
//         element.classList.add("js--fadeInRight");
//       });
//     } else {
//       // Reset back js--fadeInRight to js--fadeInLeft for desktop view
//       elementsRight.forEach((element) => {
//         if (
//           element.classList.contains("js--fadeInRight") &&
//           !element.closest(".timeline-item:nth-child(even)")
//         ) {
//           element.classList.remove("js--fadeInRight");
//           element.classList.add("js--fadeInLeft");
//         }
//       });
//     }

//     // Apply ScrollReveal
//     sr.reveal(".js--fadeInLeft", {
//       origin: "left",
//       distance: "300px",
//       easing: "ease-in-out",
//       duration: 800,
//     });
//     sr.reveal(".js--fadeInRight", {
//       origin: "right",
//       distance: "300px",
//       easing: "ease-in-out",
//       duration: 800,
//     });
//   }

//   // Initial call
//   revealContent();

//   // Call revealContent on resize to adjust classes for responsive views
//   window.addEventListener("resize", revealContent);
// });
