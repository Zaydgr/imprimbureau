const products = [
    {
      id: 1,
      name: "Blue Ballpoint Pen",
      brand: "Bic",
      category: "Writing Tools",
      image: "Screenshots/pen.png",
      description: "Smooth writing pen, perfect for everyday use.",
      price: "2.00 DH"
    },
    {
      id: 2,
      name: "White Eraser",
      brand: "Faber-Castell",
      category: "Accessories",
      image: "Screenshots/white erase.png",
      description: "Soft eraser that doesn't damage paper.",
      price: "5.00 DH"
    },
    {
      id: 3,
      name: "Permanent Marker",
      brand: "Bic",
      category: "Writing Tools",
      image: "Screenshots/permanent marker.png",
      description: "Bold, waterproof marker for all surfaces.",
      price: "10.00 DH"
    },
    {
      id: 4,
      name: "Marker",
      brand: "Bic",
      category: "Writing Tools",
      image: "Screenshots/marker.png",
      description: "Bold, waterproof marker for all surfaces.",
      price: "10.00 DH"
    },
    {
      id: 5,
      name: "Pencil",
      brand: "Maped",
      category: "Writing Tools",
      image: "Screenshots/pencil.png",
      description: "Classic HB pencil for smooth, precise writing and drawing.",
      price: "4.00 DH"
    },
    {
      id: 6,
      name: "Ruller",
      brand: "Maped",
      category: "Measuring Tools",
      image: "Screenshots/ruller.png",
      description: "Durable, transparent ruler for accurate and easy measurements.",
      price: "4.00 DH"
    },
    {
      id: 7,
      name: "Pencil Sharpener",
      brand: "Maped",
      category: "Accessories",
      image: "Screenshots/pencil sharpener.png",
      description: "Compact and efficient sharpener for clean, precise pencil tips",
      price: "6.00 DH"
    }
  ];
  
  // Elements
  const productList = document.getElementById('product-list');
  const searchInput = document.getElementById('searchInput');
  const categoryFilters = document.getElementById('categoryFilters');
  
  let selectedCategory = 'All';
  
  // Modal elements
  const modal = document.getElementById('productModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalImage = document.getElementById('modalImage');
  const modalName = document.getElementById('modalName');
  const modalBrand = document.getElementById('modalBrand');
  const modalCategory = document.getElementById('modalCategory');
  const modalDescription = document.getElementById('modalDescription');
  const modalPrice = document.getElementById('modalPrice');
  
  // Navigation elements for mobile menu close logic
  const nav = document.getElementById("mobileNav");
  const overlay = document.getElementById("overlay");
  
  // Display products
  function displayProducts(filteredProducts) {
    productList.innerHTML = '';
  
    if (filteredProducts.length === 0) {
      productList.innerHTML = `
        <div class="no-results">
          <p>😕 No products found.</p>
        </div>
      `;
      return;
    }
  
    filteredProducts.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product');
      card.dataset.id = product.id; // store product ID in dataset
  
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p><strong>Brand:</strong> ${product.brand}</p>
        <p>${product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
      `;
      productList.appendChild(card);
    });
  
    addProductClickEvents();
  }
  
  // Add click event to product cards after display
  function addProductClickEvents() {
    const productCards = document.querySelectorAll('.product');
    productCards.forEach(card => {
      card.style.cursor = 'pointer';
      const productId = parseInt(card.dataset.id);
  
      card.addEventListener('click', () => {
        const product = products.find(p => p.id === productId);
        if (product) {
          openModal(product);
        }
  
        // Close mobile nav menu if open
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          overlay.classList.remove('show');
        }
      });
    });
  }
  
  // Open modal with product details
  function openModal(product) {
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalName.textContent = product.name;
    modalBrand.textContent = product.brand;
    modalCategory.textContent = product.category;
    modalDescription.textContent = product.description;
    modalPrice.textContent = product.price;
  
    modal.style.display = 'flex';
  }
  
  // Close modal function
  function closeModal() {
    modal.style.display = 'none';
  }
  
  // Filter by search and category
  function filterAndDisplay() {
    const query = searchInput.value.toLowerCase();
  
    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query);
  
      return matchesCategory && matchesSearch;
    });
  
    displayProducts(filtered);
  }
  
  // Event listeners
  searchInput.addEventListener('input', filterAndDisplay);
  
  categoryFilters.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      // Remove active class from all buttons
      categoryFilters.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
  
      // Add active class to clicked button
      e.target.classList.add('active');
  
      // Update selected category
      selectedCategory = e.target.getAttribute('data-category');
  
      // Filter and display products
      filterAndDisplay();
    }
  });
  
  // Close modal when clicking the close button
  closeModalBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside modal content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Mobile menu toggle function
  function toggleMenu() {
    nav.classList.toggle("open");
    overlay.classList.toggle("show");
  }
  
  // Initial display
  filterAndDisplay();
  