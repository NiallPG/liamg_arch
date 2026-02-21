document.addEventListener("DOMContentLoaded", () => {

  /* ── Hamburger Menu ── */
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileNav.classList.toggle("open");
    });

    // Close nav when a link is tapped
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileNav.classList.remove("open");
      });
    });
  }

  /* ── Lightbox ── */
  const overlay = document.getElementById("lightbox-overlay");
  if (!overlay) return; // Not on a page with a lightbox

  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  const galleryImages = Array.from(
    document.querySelectorAll(".gallery > img")
  );

  const descriptions = galleryImages.map(
    (_, i) => `Project ${i + 1} — Description coming soon.`
  );

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightboxDesc.textContent = descriptions[index];
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function navigate(direction) {
    currentIndex =
      (currentIndex + direction + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxDesc.textContent = descriptions[currentIndex];
  }

  galleryImages.forEach((img, i) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => openLightbox(i));
  });

  closeBtn.addEventListener("click", closeLightbox);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigate(-1);
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigate(1);
  });
});