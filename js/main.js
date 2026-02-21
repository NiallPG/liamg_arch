document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("lightbox-overlay");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  // Collect all gallery images (exclude logo/favicon)
  const galleryImages = Array.from(
    document.querySelectorAll(".gallery > img")
  );

  // Placeholder descriptions — Liam can fill these in later
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

  // Click on gallery images
  galleryImages.forEach((img, i) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => openLightbox(i));
  });

  // Close
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

  // Navigation
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigate(-1);
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigate(1);
  });
});