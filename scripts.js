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
      "turnover-images/13 Best Predictors of Employee Turnover from LassoCV Model - How these features Correlate with Eachother.png",
      "turnover-images/Clusters of Employee Turnover.png",
      "turnover-images/Confusion Matrix for GBC.png",
      "turnover-images/Confusion Matrix for Logistic Regresion.png",
      "turnover-images/Confusion Matrix for Random Forest.png",
      "turnover-images/Correlation Heatmap of the all Orignal Dataset Features.png",
      "turnover-images/Count of Predicted Risk Classes.png",
      "turnover-images/Data Descriptors.png",
      "turnover-images/Employee Turnover.png",
      "turnover-images/Gradient Boosing Classifier Model Performance - 5 Fold CV.png",
      "turnover-images/Gradient Boosting Classifier Model Performance.png",
      "turnover-images/Lasso Model Furtest Coefficents from 0 - Most Influential Features for Predicting Employee Retention.png",
      "turnover-images/Logistic Regression Model Performance - 5 Fold CV.png",
      "turnover-images/Logistic Regression Model Performance.png",
      "turnover-images/Number of Projetcts.png",
      "turnover-images/Predicted Turnover Probability, Ground Truth, and Risk Class - Data Frame.png",
      "turnover-images/ROC Graph.png",
      "turnover-images/Random Forest Classifer Model Performance - 5 Fold CV.png",
      "turnover-images/Random Forest Classifier Model Performance.png",
      "turnover-images/Risk Classes (Ground Truth).png",
      "turnover-images/Risk Classes Boxen vs Ground Truth.png",
      "turnover-images/Risk Classes Violin vs Ground Truth.png",
      "turnover-images/Risk Classes.png",
      "turnover-images/Satisfaction vs Evaluation - Heatmap Department.png",
      "turnover-images/Satisfaction vs Evaluation - Heatmap Project Count.png",
      "turnover-images/Satisfaction vs Evaluation - Heatmap Promotion.png",
      "turnover-images/Satisfaction vs Evaluation - Heatmap Salary.png",
      "turnover-images/Satisfaction vs Evaluation - Heatmap Turnover.png",
      "turnover-images/Satisfaction vs Evaluation - Heatmap WorkAccident.png",
      "turnover-images/Satisfaction vs Evaluation - Heatmap Years at Company.png",
    ],
    "bookshelf-images": [
      "bookshelf-images/F1_curve.png",
      "bookshelf-images/after augmentation.jpg",
      "bookshelf-images/confusion_matrix.png",
      "bookshelf-images/image1.jpg",
      "bookshelf-images/labels.jpg",
      "bookshelf-images/labels_correlogram.jpg",
      "bookshelf-images/results.png",
      "bookshelf-images/roboflow hand annotations (for presenation).jpg",
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
