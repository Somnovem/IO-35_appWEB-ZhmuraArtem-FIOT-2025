// Book data with all properties including release year
const books = [
  {
    id: 1,
    title: "Ненавиджу тебе кохати",
    author: "Романтика",
    description: "Романтична драма про силу почуттів",
    price: 450,
    image: "assets/images/book_cart1.png",
    year: 2021
  },
  {
    id: 2,
    title: "Емілі Вайлд",
    author: "Літня історія",
    description: "Літня історія з нотками гумору",
    price: 580,
    image: "assets/images/book_cart2.png",
    year: 2022
  },
  {
    id: 3,
    title: "Цирцея",
    author: "Поетична збірка",
    description: "Поетична збірка про сонце й життя",
    price: 320,
    image: "assets/images/book_cart3.png",
    year: 2020
  },
  {
    id: 4,
    title: "Тресс зі смарагдового моря",
    author: "Фантастика",
    description: "Фантастичний роман про новий світ",
    price: 800,
    image: "assets/images/book_cart4.png",
    year: 2023
  },
  {
    id: 5,
    title: "Прокляття справжнього кохання",
    author: "Сучасна проза",
    description: "Сучасна проза про сімейні цінності",
    price: 740,
    image: "assets/images/book_cart5.png",
    year: 2022
  },
  {
    id: 6,
    title: "Невеличка драма",
    author: "Класика",
    description: "Збірка класичних любовних романів",
    price: 654,
    image: "assets/images/book_cart6.png",
    year: 2019
  }
];

let filteredBooks = [...books];
let currentSort = 'default';

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  renderBooks(books);
  setupFilters();
  setupSearch();
  updateResultsCount(books.length);
  
  // Load burger menu functionality from index.js if needed
  setupBurgerMenu();
  
  // Add fade-in animation for sections
  setupFadeInAnimation();
});

// Setup filter event listeners
function setupFilters() {
  const sortSelect = document.getElementById('sort-select');
  const nameFilter = document.getElementById('name-filter');
  const yearFilter = document.getElementById('year-filter');
  const clearFilters = document.getElementById('clear-filters');

  sortSelect.addEventListener('change', handleSort);
  nameFilter.addEventListener('input', handleFilter);
  yearFilter.addEventListener('input', handleFilter);
  clearFilters.addEventListener('click', clearAllFilters);
}

// Setup search functionality
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', handleSearch);
}

// Handle sorting
function handleSort(e) {
  currentSort = e.target.value;
  applyFiltersAndSort();
}

// Handle filtering
function handleFilter() {
  applyFiltersAndSort();
}

// Handle search
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase().trim();
  const nameFilter = document.getElementById('name-filter');
  
  // Update name filter with search term
  if (nameFilter.value !== searchTerm) {
    nameFilter.value = searchTerm;
  }
  
  applyFiltersAndSort();
}

// Apply all filters and sorting
function applyFiltersAndSort() {
  const nameFilter = document.getElementById('name-filter').value.toLowerCase().trim();
  const yearFilter = document.getElementById('year-filter').value;

  // Filter by name
  filteredBooks = books.filter(book => {
    const matchesName = !nameFilter || book.title.toLowerCase().includes(nameFilter);
    const matchesYear = !yearFilter || book.year === parseInt(yearFilter);
    return matchesName && matchesYear;
  });

  // Apply sorting
  sortBooks(filteredBooks, currentSort);

  // Render results
  renderBooks(filteredBooks);
  updateResultsCount(filteredBooks.length);
}

// Sort books based on selected option
function sortBooks(booksArray, sortOption) {
  switch(sortOption) {
    case 'price-asc':
      booksArray.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      booksArray.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      booksArray.sort((a, b) => a.title.localeCompare(b.title, 'uk'));
      break;
    case 'name-desc':
      booksArray.sort((a, b) => b.title.localeCompare(a.title, 'uk'));
      break;
    case 'year-asc':
      booksArray.sort((a, b) => a.year - b.year);
      break;
    case 'year-desc':
      booksArray.sort((a, b) => b.year - a.year);
      break;
    default:
      // Keep original order
      break;
  }
}

// Clear all filters
function clearAllFilters() {
  document.getElementById('sort-select').value = 'default';
  document.getElementById('name-filter').value = '';
  document.getElementById('year-filter').value = '';
  document.getElementById('search-input').value = '';
  currentSort = 'default';
  filteredBooks = [...books];
  renderBooks(books);
  updateResultsCount(books.length);
}

// Render books to the grid
function renderBooks(booksArray) {
  const booksGrid = document.getElementById('books-grid');
  const noResults = document.getElementById('no-results');

  if (booksArray.length === 0) {
    booksGrid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';
  booksGrid.innerHTML = booksArray.map(book => `
    <article class="book-card" data-book-id="${book.id}">
      <div class="book-cover">
        <img src="${book.image}" alt="${book.title}">
      </div>
      <h3>${book.title}</h3>
      <p class="author">${book.author}</p>
      <p class="book-year">Рік видання: ${book.year}</p>
      <div class="price">${book.price} ₴</div>
      <button class="add-to-cart-btn" data-book-id="${book.id}">
        Додати до кошика
      </button>
    </article>
  `).join('');

  // Add event listeners to add to cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const bookId = parseInt(this.getAttribute('data-book-id'));
      const book = books.find(b => b.id === bookId);
      if (book && window.addToCart) {
        window.addToCart(book);
      }
    });
  });
  
  // Add fade-in class to newly rendered book cards
  document.querySelectorAll('.book-card').forEach(card => {
    if (!card.classList.contains('fade-in')) {
      // Use a small delay to trigger the animation
      setTimeout(() => {
        card.classList.add('fade-in');
      }, 10);
    }
  });
}

// Update results count
function updateResultsCount(count) {
  const resultsCount = document.getElementById('results-count');
  resultsCount.innerHTML = `Знайдено книг: <strong>${count}</strong>`;
}

// Setup burger menu (reuse from index.js)
function setupBurgerMenu() {
  const burgerToggle = document.querySelector('.burger-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (burgerToggle && navMenu) {
    burgerToggle.addEventListener('click', function() {
      const isExpanded = burgerToggle.getAttribute('aria-expanded') === 'true';
      burgerToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      burgerToggle.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        burgerToggle.classList.remove('active');
        burgerToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });

    document.addEventListener('click', function(event) {
      const isClickInsideNav = navMenu.contains(event.target) || burgerToggle.contains(event.target);
      if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        burgerToggle.classList.remove('active');
        burgerToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
  }
}

// Setup fade-in animation for sections
function setupFadeInAnimation() {
  // Immediately make catalogue section visible
  const catalogueSection = document.getElementById('catalogue');
  if (catalogueSection) {
    catalogueSection.classList.add('fade-in');
  }
  
  const catalogueFilters = document.getElementById('catalogue-filters');
  if (catalogueFilters) {
    catalogueFilters.classList.add('fade-in');
  }
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document.querySelectorAll('section, .book-card, .category, .feature').forEach(el => {
    observer.observe(el);
  });
}

