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
    { title: 'Book-Shelf Classifier', description: 'The project uses computer vision to locate, classify, and recommend books from an image of a user’s bookshelf. It employs Optical Character Recognition (OCR) to extract text from book spines, then classifies the books based on their titles. The system can recommend new books by comparing the extracted titles to a database, making it easier for users to discover new reads based on their current shelf. The process includes image enhancement, text extraction, and machine learning-based recommendations.' },
    { title: 'Employee Turnover Clustering - 3 Types Employees: KMeans', description: 'In this Scenario the HR department  at a Tech company wanted to study the factors that contribute to Employee Turnover. I performed an analysis using a clustering algorithm to identify which employees are most likely to leave, and suggest various retention strategies for targeted employee groupings. My final model was able to predict employee turnover with 99% accuracy, with only 26 incorrect predictions in 3000.' },
    { title: 'Linear Regression - Animation', description: 'The project aimed to create an animation illustrating how Linear Regression, a common data analysis tool, functions as a simple neural network. The animation shows how the model tries to determine the optimal slope and y-intercept by fitting a line to a given set of data points. The goal was to highlight the relationship between Linear Regression and neural networks, simplifying the understanding of the process and its application in data analysis.' },
    { title: 'Autoencoders for Medical ImagingMedical Xray - Denoiser via Autoencoder Architecture', description: 'In this Scenario I was contacted by a Medical Imaging Service, which aimed to leverage machine learning and deep learning capabilities to enhance services and retain existing patients. I developed an image Denoiser to clean X-ray images, providing better-quality historical X-rays; a key factor in customer retention.' },
    { title: 'Predictions of Sales - Custom Arima Model', description: 'In this scenario I was contacted by a champagne distributor company. The company wanted to understand and forecast its monthly champagne sales to better plan inventory and marketing strategies. They provided me with a dataset containing historical monthly champagne sales. My task was to analyze the data, create visualizations to understand sales patterns, build a time series forecasting model using ARIMA, and evaluate its performance: Mean Absolute Percentage Error (MAPE) of ± 0.154%' },
    { title: 'Early Sepsis Predictions - Random Forest Classifier', description: 'In this scenario, I was approached by a hospital to develop a model to predict the onset of Sepsis in Patients. I developed and tested multiple classifiers utilizing electronic clinical health data and predicted the outcome of the class label sepsis or no-sepsis for invisible health records. The best model was a Random Forest Classifier and had a Perfect Recall rate; i.e. 0 False Negatives in over 15,000 test cases.' },
    { title: 'Movie Recommendations - Item Based Collaborative Filtering', description: "In this scenario I was approached by the CPO of a company specializing in movie recommendations. The company aimed to integrate a recommender system based on collaborative filtering. A dataset of 100,000+ movie ratings by 700 individuals was used to find similarities between both User Movie Preferences, and Movie-to-Movie based similarities. I was able to construct a system to recommend Movies to Users based on an initial 'seed' movie and predict the ratings the User would give each movie." },
    { title: 'Article Text Classification - Recurrent Neural Network', description: "In this Scenario a News aggregator platform that collects articles from various sources wanted to improve user experience, by automatically categorizing articles into relevant topics. This categorization helped users discover articles of interest more efficiently. I developed a text classification model using a Deep Learning practice called a Recurrent Neural Network. The final model classified these articles into predefined categories: 'sport', 'business', 'politics', 'entertainment', 'tech'. "},
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
