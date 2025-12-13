// Add to cart functionality for homepage book cards
document.addEventListener('DOMContentLoaded', function() {
  // Book data matching the homepage
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

  // Add "Add to Cart" buttons to book cards
  const bookCards = document.querySelectorAll('#best-seller .book-card');
  bookCards.forEach((card, index) => {
    const book = books[index];
    if (book) {
      // Create button
      const addBtn = document.createElement('button');
      addBtn.className = 'add-to-cart-btn';
      addBtn.textContent = 'Додати до кошика';
      addBtn.setAttribute('data-book-id', book.id);
      
      // Add click handler
      addBtn.addEventListener('click', function() {
        if (window.addToCart) {
          window.addToCart(book);
        }
      });
      
      // Append to card
      card.appendChild(addBtn);
    }
  });
});

