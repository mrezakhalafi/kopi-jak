// Global variables
let currentProductId = null;
let cart = [];
let currentUser = null;
let selectedPaymentMethod = null;
let currentQuantity = 1;

// Sample products data
const products = [
    {
        id: 1,
        name: "Espresso",
        price: 25000,
        category: "coffee",
        description: "Minuman kopi pekat yang diseduh dengan air panas melalui biji kopi yang digiling halus. Rasanya kuat dan penuh aroma.",
        image: "assets/product1.svg"
    },
    {
        id: 2,
        name: "Cappuccino",
        price: 30000,
        category: "coffee",
        description: "Kombinasi espresso dengan susu uap dan busa susu tebal di atasnya. Rasa yang seimbang antara pahit kopi dan lembut susu.",
        image: "assets/product2.svg"
    },
    {
        id: 3,
        name: "Latte",
        price: 35000,
        category: "coffee",
        description: "Espresso dengan banyak susu uap dan sedikit busa susu. Lebih lembut dan creamy dibanding cappuccino.",
        image: "assets/product3.svg"
    },
    {
        id: 4,
        name: "Americano",
        price: 28000,
        category: "coffee",
        description: "Espresso yang ditambahkan air panas, menghasilkan kopi yang lebih ringan dari espresso biasa.",
        image: "assets/product1.svg"
    },
    {
        id: 5,
        name: "Mocha",
        price: 37000,
        category: "coffee",
        description: "Kombinasi espresso, cokelat, dan susu dengan sedikit busa di atasnya.",
        image: "assets/product1.svg"
    },
    {
        id: 6,
        name: "Macchiato",
        price: 32000,
        category: "coffee",
        description: "Espresso dengan sentuhan kecil susu uap, memberikan rasa kopi yang kuat dengan sedikit kelembutan.",
        image: "assets/product1.svg"
    },
    {
        id: 7,
        name: "Chocolate Milkshake",
        price: 40000,
        category: "non-coffee",
        description: "Milkshake cokelat dingin yang lembut dan creamy dengan potongan marshmallow di atasnya.",
        image: "assets/product4.svg"
    },
    {
        id: 8,
        name: "Strawberry Milkshake",
        price: 40000,
        category: "non-coffee",
        description: "Milkshake stroberi dingin yang lembut dan creamy dengan potongan stroberi segar.",
        image: "assets/product4.svg"
    },
    {
        id: 9,
        name: "Iced Tea",
        price: 22000,
        category: "non-coffee",
        description: "Teh dingin segar dengan es batu dan irisan lemon.",
        image: "assets/product4.svg"
    },
    {
        id: 10,
        name: "Orange Juice",
        price: 25000,
        category: "non-coffee",
        description: "Jus jeruk segar yang baru diperas dengan irisan jeruk.",
        image: "assets/product4.svg"
    },
    {
        id: 11,
        name: "Croissant",
        price: 20000,
        category: "food",
        description: "Pastry Prancis berbentuk bulan sabit yang renyah di luar dan lembut di dalam. Disajikan hangat.",
        image: "assets/product5.svg"
    },
    {
        id: 12,
        name: "Sandwich",
        price: 35000,
        category: "food",
        description: "Roti isi dengan daging asap, keju, sayuran segar, dan saus spesial. Cocok sebagai teman minum kopi.",
        image: "assets/product6.svg"
    },
    {
        id: 13,
        name: "Toast Bread",
        price: 18000,
        category: "food",
        description: "Roti panggang gandum dengan mentega dan selai pilihan.",
        image: "assets/product5.svg"
    },
    {
        id: 14,
        name: "French Fries",
        price: 22000,
        category: "snack",
        description: "Kentang goreng renyah yang disajikan hangat dengan saus sambal atau mayones.",
        image: "assets/product6.svg"
    },
    {
        id: 15,
        name: "Onion Rings",
        price: 25000,
        category: "snack",
        description: "Cincin bawang goreng renyah yang gurih dan nikmat sebagai camilan.",
        image: "assets/product6.svg"
    },
    {
        id: 16,
        name: "Donut",
        price: 15000,
        category: "dessert",
        description: "Donat empuk dengan topping gula bubuk atau cokelat yang lezat.",
        image: "assets/product5.svg"
    },
    {
        id: 17,
        name: "Brownies",
        price: 20000,
        category: "dessert",
        description: "Kue cokelat padat yang lembut dan manis, cocok dengan secangkir kopi.",
        image: "assets/product5.svg"
    },
    {
        id: 18,
        name: "Ice Cream",
        price: 18000,
        category: "dessert",
        description: "Es krim lembut dengan berbagai pilihan rasa: vanila, cokelat, stroberi.",
        image: "assets/product4.svg"
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    initCarousel();

    // Initialize event listeners
    initEventListeners();

    // Load sample user data
    loadSampleUserData();

    // Initialize bottom navigation
    initBottomNav();
});

// Initialize carousel
function initCarousel() {
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.banner-slide');
    let currentIndex = 0;
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel(currentIndex);
    }, 5000);
}

// Update carousel display
function updateCarousel(index) {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

// Initialize event listeners
function initEventListeners() {
    // Category filtering
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            categoryItems.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Filter products based on category
            const category = item.getAttribute('data-category');
            filterProducts(category);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        filterProductsBySearch(searchTerm);
    });
    
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// Filter products by category
function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
        } else {
            const cardCategory = card.getAttribute('data-category');
            card.style.display = cardCategory === category ? 'block' : 'none';
        }
    });
}

// Filter products by search term
function filterProductsBySearch(searchTerm) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = productName.includes(searchTerm) ? 'block' : 'none';
    });
}

// Open product detail modal
function openProductDetail(productId) {
    currentProductId = productId;
    const product = products.find(p => p.id === productId);
    
    if (product) {
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = formatRupiah(product.price);
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-image').src = product.image;
        currentQuantity = 1;
        document.getElementById('quantity').textContent = currentQuantity;
        
        document.getElementById('product-modal').classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

// Close product detail modal
function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
    document.body.style.overflow = 'auto'; // Enable scrolling again
}

// Increase quantity
function increaseQuantity() {
    currentQuantity++;
    document.getElementById('quantity').textContent = currentQuantity;
}

// Decrease quantity
function decreaseQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        document.getElementById('quantity').textContent = currentQuantity;
    }
}

// Add to cart
function addToCart() {
    if (!currentUser) {
        alert('Silakan login terlebih dahulu untuk menambahkan ke keranjang');
        openLoginModal();
        return;
    }

    const product = products.find(p => p.id === currentProductId);
    if (product) {
        // Check if product already exists in cart
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += currentQuantity;
        } else {
            cart.push({
                ...product,
                quantity: currentQuantity
            });
        }

        updateCartCount();
        closeProductModal();
        showNotification(`${product.name} ditambahkan ke keranjang`);
    }
}

// Direct add to cart from product list
function addToCartDirect(productId, event) {
    event.stopPropagation(); // Prevent triggering the product detail modal

    if (!currentUser) {
        alert('Silakan login terlebih dahulu untuk menambahkan ke keranjang');
        openLoginModal();
        return;
    }

    const product = products.find(p => p.id === productId);
    if (product) {
        // Check if product already exists in cart
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCartCount();
        showNotification(`${product.name} ditambahkan ke keranjang`);
    }
}

// Update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
    updateBottomCartCount();
    updateCheckoutButtonState(); // Update checkout button state when cart changes
}

// Update checkout button state based on cart contents
function updateCheckoutButtonState() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        const cartIsEmpty = cart.length === 0;
        checkoutBtn.disabled = cartIsEmpty;
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '80px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = '#ffffffff';
    notification.style.color = '#8B4513';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '9999';
    notification.style.width = '90%';
    notification.style.fontWeight = 'bold';
    notification.style.fontSize = '14px';
    notification.style.textAlign = 'center';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Open cart modal
function openCart(event) {
    if (event) event.preventDefault();

    if (!currentUser) {
        alert('Silakan login terlebih dahulu untuk melihat keranjang');
        openLoginModal();
        return;
    }

    renderCartItems();
    updateCheckoutButtonState(); // Update checkout button state based on cart contents
    document.getElementById('cart-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Update active nav item
    if (event) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
    }
}

// Close cart modal
function closeCart() {
    document.getElementById('cart-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total-price');

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Keranjang belanja kosong</p>';
        cartTotalElement.textContent = 'Rp 0';
        updateCheckoutButtonState(); // Update button state when cart is empty
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image.replace('.jpg', '.svg').replace('.png', '.svg')}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatRupiah(item.price)} × ${item.quantity}</div>
                <div class="cart-item-subtotal">${formatRupiah(itemTotal)}</div>
                <div class="cart-item-quantity">
                    <button onclick="updateCartItem(${item.id}, 'decrease')">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartItem(${item.id}, 'increase')">+</button>
                    <span class="remove-item" onclick="removeFromCart(${item.id})">Hapus</span>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotalElement.textContent = formatRupiah(total);
    updateCheckoutButtonState(); // Update button state after rendering items
}

// Update cart item quantity
function updateCartItem(productId, action) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        if (action === 'increase') {
            item.quantity++;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity--;
        }
        
        renderCartItems();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCartItems();
    updateCartCount();
    updateCheckoutButtonState(); // Update button state after removing item
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Keranjang belanja masih kosong');
        return;
    }
    
    if (!currentUser) {
        alert('Silakan login terlebih dahulu untuk checkout');
        openLoginModal();
        return;
    }
    
    // Render order summary
    renderOrderSummary();
    
    // Close cart and open checkout
    closeCart();
    document.getElementById('checkout-modal').classList.remove('hidden');
}

// Render order summary in checkout modal
function renderOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items-summary');
    const orderTotalElement = document.getElementById('order-total-price');
    
    orderItemsContainer.innerHTML = '';
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const orderItemElement = document.createElement('div');
        orderItemElement.className = 'order-item';
        orderItemElement.innerHTML = `
            <div>${item.name} × ${item.quantity}</div>
            <div>${formatRupiah(itemTotal)}</div>
        `;
        
        orderItemsContainer.appendChild(orderItemElement);
    });
    
    orderTotalElement.textContent = formatRupiah(total);
}

// Select payment method
function selectPaymentMethod(method) {
    // Remove selected class from all options
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => option.classList.remove('selected'));
    
    // Add selected class to clicked option
    event.currentTarget.classList.add('selected');
    
    selectedPaymentMethod = method;
}

// Confirm order
function confirmOrder() {
    if (!selectedPaymentMethod) {
        alert('Silakan pilih metode pembayaran terlebih dahulu');
        return;
    }

    // Show processing animation
    showProcessingAnimation();

    // Simulate processing time
    setTimeout(() => {
        // Generate order number
        const orderNumber = generateOrderNumber();

        // Display order confirmation
        document.getElementById('order-number').textContent = orderNumber;

        // Generate barcode (simulated)
        generateBarcode(orderNumber);

        // Hide processing animation and show confirmation
        hideProcessingAnimation();

        // Close checkout modal and open confirmation
        closeCheckoutModal();
        document.getElementById('order-confirmation-modal').classList.remove('hidden');

        // Clear cart after successful order
        cart = [];
        updateCartCount();
        updateCheckoutButtonState(); // Update button state after clearing cart
    }, 2000); // Simulate 2 seconds processing time
}

// Show processing animation
function showProcessingAnimation() {
    // Disable the confirm button
    const confirmBtn = document.querySelector('.confirm-order-btn');
    if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
    }

    // Create processing overlay
    const processingOverlay = document.createElement('div');
    processingOverlay.id = 'processing-overlay';
    processingOverlay.innerHTML = `
        <div class="processing-content">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Memproses pembayaran Anda...</p>
        </div>
    `;
    document.body.appendChild(processingOverlay);
}

// Hide processing animation
function hideProcessingAnimation() {
    // Remove processing overlay
    const processingOverlay = document.getElementById('processing-overlay');
    if (processingOverlay) {
        processingOverlay.remove();
    }

    // Re-enable the confirm button
    const confirmBtn = document.querySelector('.confirm-order-btn');
    if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = 'Konfirmasi Pesanan';
    }
}

// Generate order number
function generateOrderNumber() {
    const timestamp = new Date().getTime();
    return '#' + timestamp.toString().substr(-5);
}

// Generate barcode (simulated)
function generateBarcode(orderNumber) {
    const canvas = document.getElementById('barcode-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 200;
    canvas.height = 50;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw a simulated barcode
    ctx.fillStyle = '#000';
    let x = 0;
    for (let i = 0; i < orderNumber.length; i++) {
        // Draw alternating bars
        if (i % 2 === 0) {
            ctx.fillRect(x, 5, 8, 40);
            x += 10;
        } else {
            ctx.fillRect(x, 10, 4, 35);
            x += 6;
        }
    }
    
    // Draw order number text below barcode
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(orderNumber, canvas.width / 2, canvas.height - 5);
}

// Close order confirmation
function closeOrderConfirmation() {
    document.getElementById('order-confirmation-modal').classList.add('hidden');
}

// Open login modal
function openLoginModal() {
    document.getElementById('login-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close login modal
function closeLoginModal() {
    document.getElementById('login-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Silakan lengkapi email dan password');
        return;
    }
    
    // In a real app, you would validate credentials with a server
    // For demo purposes, accept any non-empty credentials
    currentUser = {
        name: 'Pengguna',
        email: email
    };
    
    // Update profile info
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-email').textContent = currentUser.email;
    
    closeLoginModal();
    showNotification('Login berhasil');
}

// Show register form (placeholder)
function showRegisterForm() {
    alert('Fitur registrasi akan segera tersedia');
}

// Close checkout modal
function closeCheckoutModal() {
    document.getElementById('checkout-modal').classList.add('hidden');
}

// Open profile modal
function openProfile(event) {
    if (event) event.preventDefault();

    if (!currentUser) {
        alert('Silakan login terlebih dahulu');
        openLoginModal();
        return;
    }

    document.getElementById('profile-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Update active nav item
    if (event) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
    }
}

// Close profile modal
function closeProfile() {
    document.getElementById('profile-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Edit profile (removed as per request)
// function editProfile() {
//     alert('Fitur edit profil akan segera tersedia');
// }

// View order history
function viewOrderHistory() {
    // Close profile modal and open order history
    closeProfile();

    // Create order history modal if it doesn't exist
    let orderHistoryModal = document.getElementById('order-history-modal');
    if (!orderHistoryModal) {
        // Create modal element
        orderHistoryModal = document.createElement('div');
        orderHistoryModal.id = 'order-history-modal';
        orderHistoryModal.className = 'modal hidden';
        orderHistoryModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Riwayat Pesanan</h2>
                    <i class="fas fa-times close-modal" onclick="closeOrderHistory()"></i>
                </div>
                <div class="modal-body">
                    <div id="order-history-list">
                        <!-- Order history items will be loaded here -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="done-btn" onclick="closeOrderHistory()">Tutup</button>
                </div>
            </div>
        `;
        document.body.appendChild(orderHistoryModal);
    }

    // Load order history
    loadOrderHistory();

    // Show modal
    orderHistoryModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Load order history
function loadOrderHistory() {
    const orderHistoryList = document.getElementById('order-history-list');

    // For demo purposes, create sample order history
    // In a real app, this would come from a server
    const sampleOrders = [
        {
            id: '#12345',
            date: '2 Jan 2026',
            items: [
                { name: 'Espresso', quantity: 2, price: 25000 },
                { name: 'Croissant', quantity: 1, price: 20000 }
            ],
            total: 70000,
            status: 'Selesai'
        },
        {
            id: '#12344',
            date: '30 Des 2025',
            items: [
                { name: 'Cappuccino', quantity: 1, price: 30000 },
                { name: 'Sandwich', quantity: 1, price: 35000 }
            ],
            total: 65000,
            status: 'Selesai'
        },
        {
            id: '#12343',
            date: '28 Des 2025',
            items: [
                { name: 'Latte', quantity: 1, price: 35000 },
                { name: 'Chocolate Milkshake', quantity: 1, price: 40000 }
            ],
            total: 75000,
            status: 'Selesai'
        }
    ];

    if (sampleOrders.length === 0) {
        orderHistoryList.innerHTML = '<p>Belum ada riwayat pesanan</p>';
        return;
    }

    orderHistoryList.innerHTML = '';

    sampleOrders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-history-card';
        orderCard.innerHTML = `
            <div class="order-header">
                <div class="order-id">Nomor: ${order.id}</div>
                <div class="order-date">${order.date}</div>
                <div class="order-status ${order.status === 'Selesai' ? 'status-completed' : 'status-pending'}">${order.status}</div>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.name} × ${item.quantity}</span>
                        <span>${formatRupiah(item.price * item.quantity)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                Total: <strong>${formatRupiah(order.total)}</strong>
            </div>
        `;

        orderHistoryList.appendChild(orderCard);
    });
}

// Close order history
function closeOrderHistory() {
    const orderHistoryModal = document.getElementById('order-history-modal');
    if (orderHistoryModal) {
        orderHistoryModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// View about us
function viewAboutUs() {
    closeProfile();
    document.getElementById('about-us-modal').classList.remove('hidden');
}

// Close about us modal
function closeAboutUs() {
    document.getElementById('about-us-modal').classList.add('hidden');
}

// Logout
function logout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        currentUser = null;
        closeProfile();
        showNotification('Logout berhasil');
    }
}

// Edit profile (removed as per request)
// function editProfile() {
//     alert('Fitur edit profil akan segera tersedia');
// }

// Format currency to Indonesian Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

// Load sample user data for demo
function loadSampleUserData() {
    // This is just for demo purposes
    // In a real app, user data would come from a server
    currentUser = {
        name: 'Meja 001',
        email: 'meja001@kopijak.com'
    };

    // Update profile info
    if (document.getElementById('user-name')) {
        document.getElementById('user-name').textContent = currentUser.name;
    }
    if (document.getElementById('user-email')) {
        document.getElementById('user-email').textContent = currentUser.email;
    }
}

// Initialize bottom navigation
function initBottomNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
}

// Toggle sidebar menu
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar-menu');
    if (!sidebar) {
        createSidebarMenu();
    } else {
        sidebar.classList.toggle('active');
    }
}

// Create sidebar menu
function createSidebarMenu() {
    // Create sidebar element
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar-menu';
    sidebar.className = 'sidebar-menu';
    sidebar.innerHTML = `
        <div class="sidebar-header">
            <h3>Menu Kopi Jak</h3>
            <i class="fas fa-times close-sidebar"></i>
        </div>
        <ul class="sidebar-menu-items">
            <li><a href="#" onclick="goToHomeSidebar()"><i class="fas fa-home"></i> Beranda</a></li>
            <li><a href="#" onclick="openProfileSidebar()"><i class="fas fa-user"></i> Profil Saya</a></li>
            <li><a href="#" onclick="viewOrderHistorySidebar()"><i class="fas fa-history"></i> Riwayat Pesanan</a></li>
            <li><a href="#" onclick="viewAboutUsSidebar()"><i class="fas fa-info-circle"></i> Tentang Kami</a></li>
        </ul>
    `;

    document.body.appendChild(sidebar);

    // Add event listener to close button
    const closeBtn = sidebar.querySelector('.close-sidebar');
    closeBtn.addEventListener('click', toggleSidebar);

    // Show sidebar
    setTimeout(() => {
        sidebar.classList.add('active');
    }, 10);
}

// Close sidebar when clicking outside
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar-menu');
    const menuToggle = document.querySelector('.menu-toggle');

    if (sidebar && sidebar.classList.contains('active') &&
        !sidebar.contains(event.target) &&
        !menuToggle.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// Navigation functions
function goToHome() {
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toggleSidebar(); // Close sidebar after navigation
}

// Bottom navigation functions
function goToHomeNav(event) {
    event.preventDefault();
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    // Add active class to clicked item
    event.currentTarget.classList.add('active');

    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCategories(event) {
    event.preventDefault();
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    // Add active class to clicked item
    event.currentTarget.classList.add('active');

    // Scroll to categories section
    const categoriesSection = document.querySelector('.categories-container');
    if (categoriesSection) {
        categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Sidebar menu item functions
function goToHomeSidebar() {
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toggleSidebar(); // Close sidebar after navigation
}

function openProfileSidebar() {
    openProfile();
    toggleSidebar(); // Close sidebar after opening profile
}

function viewOrderHistorySidebar() {
    viewOrderHistory();
    toggleSidebar(); // Close sidebar after opening order history
}

function viewAboutUsSidebar() {
    viewAboutUs();
    toggleSidebar(); // Close sidebar after opening about us
}

function logoutSidebar() {
    logout();
    toggleSidebar(); // Close sidebar after logout
}

function updateBottomCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const bottomCartCount = document.getElementById('bottom-cart-count');
    if (bottomCartCount) {
        bottomCartCount.textContent = totalItems;
    }
}