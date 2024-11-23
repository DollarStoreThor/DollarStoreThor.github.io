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
  const imageMap = {
    "turnover-images": [
      "turnover-images/13%20Best%20Predictors%20of%20Employee%20Turnover%20from%20LassoCV%20Model%20-%20How%20these%20features%20Correlate%20with%20Eachother.png",
      "turnover-images/Clusters%20of%20Employee%20Turnover.png",
      "turnover-images/Confusion%20Matrix%20for%20GBC.png",
    ],
    "bookshelf-images": [
      "bookshelf-images/book1.jpg",
      "bookshelf-images/book2.jpg",
      "bookshelf-images/classifier-demo.png",
    ],
    "realestate-images": [
      "realestate-images/map-analysis.jpg",
      "realestate-images/clustering.png",
      "realestate-images/prediction-results.png",
    ],
  };

  return imageMap[folder] || [];
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
