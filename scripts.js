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

  // script for the project carousel
  const projectData = [
    { title: 'Book-Shelf Classifier', description: 'Computer vision project to Locate, Classify, and Recommend new books from an image of a user\'s shelf using Optical Ccharacter Recognition.' },
    { title: 'Employee-Turnover Analytics', description: 'The HR department wanted to study the factors that contribute to employee turnover. As an ML developer, I performed an analysis using a clustering algorithm to identify which employees are most likely to leave, and suggest various retention strategies for targeted employees. My final model was able to predict employee turnover with 99% accuracy, with only 26 incorrect predictions in 3000.' },
    { title: 'Linear Regression', description: 'The goal of this project was to create a simple animation depicting how Linear Regression  - A ubiquitous tool used in data analysis - is a simple Neural Network trying to determine the slope and y-intercept of given data.' },
    { title: 'Autoencoders for Medical Imaging', description: 'I used an Encoder/Decoder arcitecture to train a Denoising Neural Netowrk. This was model was trained to help medical professionals, clearly and percisely view x-rays to allow for more acurate diagnosis.' },
    { title: 'Project 5', description: 'Description for Project 5' },
    { title: 'Project 6', description: 'Description for Project ' },
    { title: 'Project 7', description: 'Description for Project ' },
    { title: 'Project 8', description: 'Description for Project ' },
    { title: 'Project 9', description: 'Description for Project ' },
    { title: 'Project 10', description: 'Description for Project ' },
    { title: 'Project 11', description: 'Description for Project ' },
    { title: 'Project 12', description: 'Description for Project ' },
    { title: 'Project 13', description: 'Description for Project ' },
    { title: 'Project 14', description: 'Description for Project ' },
    { title: 'Project 15', description: 'Description for Project ' },
  
  ];


  const projectCarousel = document.getElementById('projectCarousel');
  const indicators = document.getElementById('carouselIndicators');
  let activeIndex = 0; // Keeps track of the active project
  let autoScrollInterval; // To store the interval ID
  
  // Populate projects and dots dynamically
  projectData.forEach((project, index) => {
    // Add project cards
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
    projectCarousel.appendChild(card);
  
    // Add dots
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active'); // Set the first dot as active
    dot.addEventListener('click', () => {
      activeIndex = index;
      updateCarouselPosition();
      updateIndicators();
      restartAutoScroll(); // Restart auto-scroll after manual navigation
    });
    indicators.appendChild(dot);
  });
  
  // Update carousel position based on active index
  function updateCarouselPosition() {
    const cardWidth = projectCarousel.children[0].offsetWidth;
    projectCarousel.style.transform = `translateX(-${activeIndex * cardWidth}px)`;
    projectCarousel.style.transition = 'transform 0.5s ease';
  }
  
  // Update indicators
  function updateIndicators() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }
  
  // Auto-scroll function
  function autoScroll() {
    autoScrollInterval = setInterval(() => {
      activeIndex = (activeIndex + 1) % projectData.length; // Loop through projects
      updateCarouselPosition();
      updateIndicators();
    }, 5000); // Auto-scroll every 5000 mili-seconds
  }
  
  // Restart auto-scroll after interaction
  function restartAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScroll();
  }
  
  // Pause/resume auto-scroll on hover
  const carouselContainer = document.getElementById('carousel');
  carouselContainer.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  carouselContainer.addEventListener('mouseleave', () => autoScroll());
  
  // Start auto-scroll on page load
  autoScroll();

});
