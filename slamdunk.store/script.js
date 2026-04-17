/* ===========================
   PRODUCTS DATA
=========================== */
const products = [
  {
    id: 1,
    name: "Air Max 270",
    category: "running",
    tag: "Новинка",
    price: 12990,
    desc: "Самая большая воздушная подошва в истории Nike — 270° обзора.",
    img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/air-max-270-shoes-2V5C4p.png"
  },
  {
    id: 2,
    name: "Air Force 1 '07",
    category: "lifestyle",
    tag: "Хит",
    price: 8990,
    desc: "Культовая обувь, ставшая символом стиля уже несколько десятилетий.",
    img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/air-force-1-07-shoes-WrLlWX.png"
  },
  {
    id: 3,
    name: "Blazer mid 77",
    category: "lifestyle",
    tag: "Популярное",
    price: 9490,
    desc: "Классический баскетбольный силуэт, переосмысленный в современном стиле.",
    img: "img/Nike Blazer Mid jpg.jpg"
  },
  {
    id: 4,
    name: "Nike air zoom Alphafly",
    category: "running",
    tag: "Лидер",
    price: 10990,
    desc: "React Foam + Air Zoom — идеальный баланс мягкости и отклика.",
    img: "img/alphafly.jpg"
  },
  {
    id: 5,
    name: "Kobe 9 christmas",
    category: "basketball",
    tag: "Pro",
    price: 18990,
    desc: "Технологии для профессиональных игроков. Скорость, мощь, точность.",
    img: "img/nike kobe 9 christmas.jpg"
  },
  {
    id: 6,
    name: "Nike vomero 18",
    category: "running",
    tag: "Новинка",
    price: 16490,
    desc: "Максимальная амортизация для длинных забегов. Мягкость ZoomX.",
    img: "img/nike vomero18.jpg"
  }
];

/* ===========================
   CART STATE
=========================== */
let cart = [];

function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelector('.cart-count').textContent = count;

  const body = document.getElementById('cartBody');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = total.toLocaleString('ru-RU') + ' ₽';

  if (cart.length === 0) {
    body.innerHTML = '<p class="cart-empty">Корзина пуста</p>';
    return;
  }

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" />
      <div class="cart-item__info">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__price">${(item.price * item.qty).toLocaleString('ru-RU')} ₽ × ${item.qty}</div>
      </div>
      <button class="cart-item__remove" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join('');
}

function openCart() {
  document.getElementById('cartModal').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}

function closeCart() {
  document.getElementById('cartModal').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

/* ===========================
   RENDER CARDS
=========================== */
function renderCards(filter = 'all') {
  const container = document.getElementById('cards');
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  container.innerHTML = filtered.map((p, i) => `
    <div class="card" style="animation-delay: ${i * 0.07}s">
      <div class="card__img-wrap">
        ${p.tag ? `<div class="card__badge">${p.tag}</div>` : ''}
        <img class="card__img" src="${p.img}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="card__body">
        <div class="card__category">${categoryLabel(p.category)}</div>
        <div class="card__name">${p.name}</div>
        <div class="card__desc">${p.desc}</div>
        <div class="card__footer">
          <div class="card__price">${p.price.toLocaleString('ru-RU')} ₽</div>
          <button class="card__btn" onclick='addToCart(${JSON.stringify(p)})' title="В корзину">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function categoryLabel(cat) {
  return { running: 'Бег', lifestyle: 'Стиль', basketball: 'Баскетбол' }[cat] || cat;
}

/* ===========================
   FILTER TABS
=========================== */
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderCards(tab.dataset.filter);
  });
});

/* ===========================
   NAV SCROLL EFFECT
=========================== */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ===========================
   CART CONTROLS
=========================== */
document.querySelector('.nav__cart').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

/* ===========================
   SMOOTH SCROLL HELPER
=========================== */
window.scrollTo = function(target) {
  const el = document.querySelector(target);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

/* ===========================
   INTERSECTION OBSERVER
=========================== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

function observeSections() {
  document.querySelectorAll('.feat-card, .model-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    io.observe(el);
  });
}

/* ===========================
   INIT
=========================== */
renderCards();
observeSections();