document.addEventListener('DOMContentLoaded', function() {
  setupNewsletterForm();
  setupReviewCards();
  setupReviewForm();
});

function setupNewsletterForm() {
  var newsletterForm = document.getElementById('newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterFormSubmit);
  }
}

function handleNewsletterFormSubmit(event) {
  event.preventDefault();

  var emailInput = event.target.querySelector('input[type="email"]');
  var email = emailInput.value;

  if (isValidEmail(email)) {
    sendNewsletterEmail(email);
  } else {
    alert('Please enter a valid email address.');
  }
}

function isValidEmail(email) {
  var emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

function sendNewsletterEmail(email) {
  fetch('https://httpbin.org/post', {
    method: 'POST',
    body: JSON.stringify({ email: email, creator_name: 'WAI SUN LAM' }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(function(response) {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    alert('You have successfully joined the newsletter!');
  })
  .catch(function(error) {
    console.error('There has been a problem with your fetch operation: ' + error.message);
  });
}

function setupReviewCards() {
  var reviewsContainer = document.getElementById('reviews-container');

  function generateReviewCards() {
    reviewsContainer.innerHTML = '';
    for(var i=0; i<reviewData.length; i++){
      var review = reviewData[i];
      var card = createReviewCard(review);
      reviewsContainer.appendChild(card);
    }
  }

  generateReviewCards();
}

function createReviewCard(review) {
  var card = document.createElement('div');
  card.classList.add('review-card');

  var nameHeading = document.createElement('h3');
  nameHeading.textContent = review.name;

  var ratingElement = document.createElement('div');
  ratingElement.classList.add('rating');
  ratingElement.textContent = generateRatingStars(review.rating);

  var dateElement = document.createElement('div');
  dateElement.classList.add('date');
  dateElement.textContent = formatDate(review.date);

  var reviewText = document.createElement('p');
  reviewText.textContent = review.text;

  card.appendChild(nameHeading);
  card.appendChild(ratingElement);
  card.appendChild(dateElement);
  card.appendChild(reviewText);

  return card;
}

function generateRatingStars(rating) {
  var fullStars = '';
  for(var i=0; i<rating; i++) fullStars += '★';

  var emptyStars = '';
  for(var i=0; i<(5 - rating); i++) emptyStars += '☆';

  return fullStars + emptyStars;
}

function formatDate(dateString) {
  var date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function setupReviewForm() {
  var reviewForm = document.getElementById('new-review-form');

  if (reviewForm) {
    reviewForm.addEventListener('submit', submitReviewForm);
  }
}

function submitReviewForm(event) {
  event.preventDefault();

  var name = event.target.querySelector('input[name="name"]').value;
  var date = event.target.querySelector('input[name="date"]').value;
  var rating = parseInt(event.target.querySelector('input[name="rating"]').value, 10);
  var text = event.target.querySelector('textarea[name="review-text"]').value;

  reviewData.push({ name: name, date: date, rating: rating, text: text });
  setupReviewCards();
  event.target.reset();
}
