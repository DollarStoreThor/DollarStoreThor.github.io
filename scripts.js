document.addEventListener("DOMContentLoaded", () => {
  const slideshowModal = document.getElementById("slideshow-modal");
  const slideshowContainer = document.getElementById("slideshow-container");
  const closeModal = document.querySelector(".close");
  const prevSlide = document.getElementById("prev-slide");
  const nextSlide = document.getElementById("next-slide");
  let currentSlideIndex = 0;
  let images = [];

  // Function to fetch random images
  function fetchImages(folder) {
    // Simulate fetching images from a folder (e.g., replace this array with an API call)
    return [
      `${folder}/image1.jpg`,
      `${folder}/image2.jpg`,
      `${folder}/image3.jpg`,
      `${folder}/image4.jpg`,
    ];
  }

  // Function to show the slideshow modal
  function showSlideshow(folder) {
    images = fetchImages(folder);
    currentSlideIndex = 0;
    slideshowContainer.innerHTML = `<img src="${images[currentSlideIndex]}" alt="Slideshow Image">`;
    slideshowModal.style.display = "block";
  }

  // Function to change slides
  function changeSlide(step) {
    currentSlideIndex = (currentSlideIndex + step + images.length) % images.length;
    slideshowContainer.innerHTML = `<img src="${images[currentSlideIndex]}" alt="Slideshow Image">`;
  }

  // Add event listeners to project buttons
  document.querySelectorAll(".view-slideshow").forEach((button) => {
    button.addEventListener("click", () => {
      const folder = button.getAttribute("data-folder");
      showSlideshow(folder);
    });
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    slideshowModal.style.display = "none";
  });

  // Slide navigation
  prevSlide.addEventListener("click", () => changeSlide(-1));
  nextSlide.addEventListener("click", () => changeSlide(1));

  // Close modal when clicking outside the modal content
  window.addEventListener("click", (event) => {
    if (event.target === slideshowModal) {
      slideshowModal.style.display = "none";
    }
  });
});
