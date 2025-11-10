const breedSelect = document.getElementById('breed-select');
const gallery = document.getElementById('gallery');

// Fetch the list of breeds from the Dog API and add them to the select menu
fetch('https://dog.ceo/api/breeds/list/all')
  .then(response => response.json())
  .then(data => {
    const breeds = data.message;
    // Loop over each breed name in the response and add an option
    for (const breedName in breeds) {
      const option = document.createElement('option');
      option.value = breedName;
      option.textContent = `${breedName.charAt(0).toUpperCase()}${breedName.slice(1)}`;
      breedSelect.appendChild(option);
    }
  });

// When the user selects a breed, fetch images for that breed
breedSelect.addEventListener('change', (event) => {
  const breed = event.target.value;

  // Clear any previous images from the gallery
  gallery.innerHTML = '';

  // If no breed is selected, stop here
  if (!breed) {
    return;
  }

  // Fetch one random image for the selected breed and display it
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => response.json())
    .then(data => {
      // Create an image element for the featured image
      const featured = document.createElement('img');
      featured.src = data.message;
      featured.alt = `${breed} dog`;
      featured.className = 'featured-image';
      // Add the featured image to the gallery
      gallery.appendChild(featured);
    });

  // Fetch 9 random images for the selected breed and show them in a gallery grid
  fetch(`https://dog.ceo/api/breed/${breed}/images/random/9`)
    .then(response => response.json())
    .then(data => {
      const images = data.message;
      // Create a container for the gallery thumbnails
      const grid = document.createElement('div');
      grid.className = 'image-grid';
      // Add each image as a thumbnail in the grid
      images.forEach(src => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.alt = `${breed} dog`;
        thumb.className = 'gallery-thumb';
        grid.appendChild(thumb);
      });
      gallery.appendChild(grid);
    });
});