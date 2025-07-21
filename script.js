// Navbar and dashboard logic
function renderNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.innerHTML = `
        <div class="logo"><a href="home.html" style="color:#fff;text-decoration:none;">HOSTELHUB</a></div>
        <div class="nav-links">
            <a href="about.html">About Us</a>
            <a href="terms.html">Terms</a>
            <a href="help.html">Help & FAQs</a>
            <a href="hostels.html">Available Hostels</a>
            <a href="bookings.html">Bookings</a>
            <a href="login.html" id="loginNav">Login/Register</a>
            <span id="dashboardIcon" style="cursor:pointer; margin-left:18px;">
                <img src="MTN LOGO.png" alt="Dashboard" style="width:32px;height:32px;border-radius:50%;vertical-align:middle;">
            </span>
        </div>
        <div id="dashboardMenu" style="display:none;position:absolute;right:40px;top:70px;background:#fff;color:#222;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.15);padding:18px 24px;z-index:2000;">
            <ul style="list-style:none;padding:0;margin:0;">
                <li><a href="about.html">About Us</a></li>
                <li><a href="terms.html">Terms & Conditions</a></li>
                <li><a href="help.html">Help & FAQs</a></li>
                <li><a href="hostels.html">Available Hostels</a></li>
                <li><a href="bookings.html">Bookings</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><button id="userLogoutBtn" style="background:#ff4d4d;color:#fff;border:none;border-radius:8px;padding:6px 16px;cursor:pointer;">Logout</button></li>
            </ul>
        </div>
    `;
    document.getElementById('dashboardIcon').onclick = function(e) {
        e.stopPropagation();
        const menu = document.getElementById('dashboardMenu');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    };
    document.body.onclick = function(e) {
        const menu = document.getElementById('dashboardMenu');
        if (menu) menu.style.display = 'none';
    };
    // User logout button
    const logoutBtn = document.getElementById('userLogoutBtn');
    if (logoutBtn) {
        logoutBtn.onclick = function() {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        };
    }
}

// Footer logic
function renderFooter() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    footer.innerHTML = `
        <div class="footer-links">
            <a href="https://wa.me/256700000000" target="_blank" title="WhatsApp"><span>📱</span> WhatsApp</a>
            <a href="contact.html" title="Message"><span>💬</span> Message</a>
            <a href="mailto:ampfreytukwasibwe@gmail.com" title="Email"><span>✉️</span> <span class="email-span">ampfreytukwasibwe@gmail.com</span></a>
            <a href="https://twitter.com/yourprofile" target="_blank" title="Twitter"><span>🐦</span> Twitter</a>
            <a href="https://x.com/yourprofile" target="_blank" title="X"><span>❌</span> X</a>
        </div>
        <div>&copy; 2024 Hostelhub. All rights reserved.</div>
    `;
}

// Hostel data (simulate database)
const HOSTELS = [
    {id:1, name:'Sunrise Hostel', type:'single', location:'Kashanyaraze', distance:'500m', price:300000, img:'1 (2).jpg'},
    {id:2, name:'Green Villa', type:'double', location:'Kashanyaraze', distance:'700m', price:250000, img:'1 (2).jpg'},
    {id:3, name:'Elite Suites', type:'self-contained', location:'Kashanyaraze', distance:'400m', price:400000, img:'1 (2).jpg'},
    {id:4, name:'Campus View', type:'single', location:'Kashanyaraze', distance:'600m', price:320000, img:'1 (2).jpg'},
    {id:5, name:'City Lodge', type:'double', location:'Kashanyaraze', distance:'800m', price:270000, img:'1 (2).jpg'},
    {id:6, name:'Royal Residence', type:'self-contained', location:'Kashanyaraze', distance:'300m', price:420000, img:'1 (2).jpg'}
];

function getHostels() {
    try {
        const h = JSON.parse(localStorage.getItem('hostels'));
        if (Array.isArray(h) && h.length > 0) return h;
    } catch {}
    return HOSTELS;
}

// Render hostel grid
function renderHostelGrid(filterType = 'all') {
    const grid = document.getElementById('hostelGrid');
    if (!grid) return;
    let hostels = getHostels();
    if (filterType !== 'all') hostels = hostels.filter(h => h.type === filterType);
    
    grid.innerHTML = hostels.map((h, idx) => `
        <div class="hostel-card" tabindex="0" style="box-shadow:0 2px 12px rgba(69,43,31,0.08);transition:box-shadow 0.2s,transform 0.2s;">
            <img src="${(h.imgs && h.imgs.length) ? h.imgs[0] : (h.imgData || h.img)}" alt="${h.name}" title="${h.name}" style="box-shadow:0 2px 8px rgba(0,0,0,0.08);transition:box-shadow 0.2s;">
            <div class="info">
                <div class="name">${h.name}</div>
                <div class="details">LOCATION: ${h.location}<br>Distance: ${h.distance}</div>
                <div class="price">UGX ${h.price.toLocaleString()}</div>
                <button onclick="bookHostel(${idx})" title="Book this hostel" class="book-btn" tabindex="0" style="transition:background 0.2s,box-shadow 0.2s;box-shadow:0 2px 8px rgba(255,77,77,0.08);">Book</button>
            </div>
        </div>
    `).join('');
    // Add hover/keyboard effects
    document.querySelectorAll('.hostel-card').forEach(card => {
        card.onfocus = card.onmouseover = function(){ this.style.boxShadow='0 4px 24px rgba(255,77,77,0.18)'; this.style.transform='scale(1.02)'; };
        card.onblur = card.onmouseout = function(){ this.style.boxShadow='0 2px 12px rgba(69,43,31,0.08)'; this.style.transform='scale(1)'; };
    });
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.onfocus = btn.onmouseover = function(){ this.style.background='#ff4d4d'; this.style.boxShadow='0 2px 12px rgba(255,77,77,0.18)'; };
        btn.onblur = btn.onmouseout = function(){ this.style.background='#452B1F'; this.style.boxShadow='0 2px 8px rgba(255,77,77,0.08)'; };
    });
}

function filterHostels(type) {
    renderHostelGrid(type);
}

// Booking logic
function bookHostel(idx) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('You must be logged in to book a hostel.');
        window.location.href = 'login.html';
        return;
    }
    const hostels = getHostels();
    const hostel = hostels[idx];
    if (!hostel) return;
    let spinner = document.getElementById('bookingSpinner');
    if (!spinner) {
        spinner = document.createElement('div');
        spinner.id = 'bookingSpinner';
        spinner.style = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);border:6px solid #eee;border-top:6px solid #452B1F;border-radius:50%;width:48px;height:48px;animation:spin 1s linear infinite;z-index:3000;';
        spinner.innerHTML = '';
        document.body.appendChild(spinner);
    }
    spinner.style.display = 'block';
    setTimeout(function() {
        let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push({...hostel, user: loggedInUser});
        localStorage.setItem('bookings', JSON.stringify(bookings));
        spinner.style.display = 'none';
        window.location.href = 'bookings.html';
    }, 700);
}

function renderBookings() {
    const bookingsList = document.getElementById('bookingsList');
    if (!bookingsList) return;
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    if (bookings.length === 0) {
        bookingsList.innerHTML = '<p>No bookings yet.</p>';
        return;
    }
    bookingsList.innerHTML = bookings.map((b, i) => `
        <div class="hostel-card">
            <img src="${b.img}" alt="${b.name}">
            <div class="info">
                <div class="name">${b.name}</div>
                <div class="details">LOCATION: ${b.location}<br>Distance: ${b.distance}</div>
                <div class="price">UGX ${b.price.toLocaleString()}</div>
                <button onclick="payForBooking(${i})">Pay</button>
            </div>
        </div>
    `).join('');
}

function payForBooking(index) {
    localStorage.setItem('payIndex', index);
    window.location.href = 'payment.html';
}

// Payment logic
function handlePaymentForm() {
    const form = document.getElementById('paymentForm');
    if (!form) return;
    form.onsubmit = function(e) {
        e.preventDefault();
        document.getElementById('paymentSuccess').style.display = 'block';
        // Remove booking after payment
        let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        let payIndex = parseInt(localStorage.getItem('payIndex'));
        let loggedInUser = localStorage.getItem('loggedInUser') || 'N/A';
        // Save payment info
        let payments = JSON.parse(localStorage.getItem('payments') || '[]');
        payments.push({
            amount: document.getElementById('amount').value,
            network: document.getElementById('network').value,
            number: document.getElementById('phoneNumber').value,
            user: loggedInUser
        });
        localStorage.setItem('payments', JSON.stringify(payments));
        if (!isNaN(payIndex)) {
            bookings.splice(payIndex, 1);
            localStorage.setItem('bookings', JSON.stringify(bookings));
        }
        setTimeout(() => {
            window.location.href = 'bookings.html';
        }, 2000);
    };
}

// Search logic (on hostels page)
function handleSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    searchInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        let hostels = getHostels().filter(h =>
            h.name.toLowerCase().includes(value) ||
            h.location.toLowerCase().includes(value) ||
            h.type.toLowerCase().includes(value)
        );
        const grid = document.getElementById('hostelGrid');
        if (grid) {
            grid.innerHTML = hostels.map((h, idx) => `
                <div class="hostel-card" tabindex="0" style="box-shadow:0 2px 12px rgba(69,43,31,0.08);transition:box-shadow 0.2s,transform 0.2s;">
                    <img src="${(h.imgs && h.imgs.length) ? h.imgs[0] : (h.imgData || h.img)}" alt="${h.name}" title="${h.name}" style="box-shadow:0 2px 8px rgba(0,0,0,0.08);transition:box-shadow 0.2s;">
                    <div class="info">
                        <div class="name">${h.name}</div>
                        <div class="details">LOCATION: ${h.location}<br>Distance: ${h.distance}</div>
                        <div class="price">UGX ${h.price.toLocaleString()}</div>
                        <button onclick="bookHostel(${idx})" title="Book this hostel" class="book-btn" tabindex="0" style="transition:background 0.2s,box-shadow 0.2s;box-shadow:0 2px 8px rgba(255,77,77,0.08);">Book</button>
                    </div>
                </div>
            `).join('');
        }
    });
}

// Login/Register logic (simulate with localStorage)
function handleLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    form.onsubmit = function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem('loggedInUser', username);
            window.location.href = 'home.html';
        } else {
            alert('Invalid credentials!');
        }
    };
}

function handleRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;
    form.onsubmit = function(e) {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const confirm = document.getElementById('registerConfirmPassword').value;
        if (password !== confirm) {
            alert('Passwords do not match!');
            return;
        }
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.username === username)) {
            alert('Username already exists!');
            return;
        }
        users.push({username, password});
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
    };
}

// On page load, render navbar/footer and page-specific logic
window.onload = function() {
    renderNavbar();
    renderFooter();
    renderHostelGrid && renderHostelGrid();
    renderBookings && renderBookings();
    handlePaymentForm && handlePaymentForm();
    handleSearch && handleSearch();
    handleLoginForm && handleLoginForm();
    handleRegisterForm && handleRegisterForm();
    // Gradient for search bar
    let searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.style.background = 'linear-gradient(90deg,#fff,#fffbe6)';
        searchInput.style.transition = 'box-shadow 0.2s';
        searchInput.onfocus = function(){ this.style.boxShadow='0 2px 12px #ffb84d'; };
        searchInput.onblur = function(){ this.style.boxShadow='none'; };
    }
    let mainImg = document.querySelector('.main-image img');
    if (mainImg) {
        mainImg.style.boxShadow = '0 4px 32px rgba(255,184,77,0.18)';
        mainImg.style.transition = 'box-shadow 0.2s,transform 0.2s';
        mainImg.onmouseover = function(){ this.style.boxShadow='0 8px 48px #ffb84d'; this.style.transform='scale(1.01)'; };
        mainImg.onmouseout = function(){ this.style.boxShadow='0 4px 32px rgba(255,184,77,0.18)'; this.style.transform='scale(1)'; };
    }
};

// Admin-only functions for hostel management (to be used on admin page)
window.deleteHostel = function(idx) {
    if (!confirm('Are you sure you want to delete this hostel?')) return;
    let hostels = getHostels();
    hostels.splice(idx, 1);
    localStorage.setItem('hostels', JSON.stringify(hostels));
    renderHostelGrid(); // Re-render the list on the admin page
};

window.editHostel = function(idx) {
    // This function would typically open a modal or a form to edit hostel details
    // For simplicity, we'll just log it. A full implementation would be similar to addHostel.
    console.log('Editing hostel index:', idx);
    alert('Edit functionality to be implemented. For now, please delete and re-add the hostel.');
};

window.addHostelInline = function() {
    if (!localStorage.getItem('isAdmin') === 'true') return;
    const addHostelContainer = document.getElementById('adminAddHostelContainer');
    if (!addHostelContainer) return;
    // Render add form inline
    let formHtml = `
        <div class="hostel-card" style="background:#e6ffed;padding:16px;">
            <form id="addHostelInlineForm">
                <input type="text" id="addName" placeholder="Name" required style="width:90%;margin-bottom:6px;padding:8px;border-radius:4px;border:1px solid #ddd;">
                <input type="text" id="addType" placeholder="Type" required style="width:90%;margin-bottom:6px;padding:8px;border-radius:4px;border:1px solid #ddd;">
                <input type="text" id="addLocation" placeholder="Location" required style="width:90%;margin-bottom:6px;padding:8px;border-radius:4px;border:1px solid #ddd;">
                <input type="text" id="addDistance" placeholder="Distance" required style="width:90%;margin-bottom:6px;padding:8px;border-radius:4px;border:1px solid #ddd;">
                <input type="number" id="addPrice" placeholder="Price" required style="width:90%;margin-bottom:6px;padding:8px;border-radius:4px;border:1px solid #ddd;">
                <button type="submit" class="book-btn" style="background:#4CAF50;color:#fff;margin-right:8px;">Add</button>
                <button type="button" onclick="renderHostelGrid()" class="book-btn" style="background:#ff4d4d;color:#fff;">Cancel</button>
            </form>
        </div>
    `;
    addHostelContainer.innerHTML = formHtml;
    document.getElementById('addHostelInlineForm').onsubmit = function(e) {
        e.preventDefault();
        let hostels = getHostels();
        hostels.push({
            name: document.getElementById('addName').value,
            type: document.getElementById('addType').value,
            location: document.getElementById('addLocation').value,
            distance: document.getElementById('addDistance').value,
            price: parseInt(document.getElementById('addPrice').value),
            img: '1 (2).jpg' // Default image
        });
        localStorage.setItem('hostels', JSON.stringify(hostels));
        renderHostelGrid();
    };
}; 

// Notification for real-time updates
function showHostelUpdateNotification() {
    let notif = document.getElementById('hostelUpdateNotif');
    if (!notif) {
        notif = document.createElement('div');
        notif.id = 'hostelUpdateNotif';
        notif.style = 'position:fixed;top:18px;left:50%;transform:translateX(-50%);background:#452B1F;color:#fff;padding:10px 24px;border-radius:8px;box-shadow:0 2px 12px #0002;font-size:1.1em;z-index:9999;opacity:0;transition:opacity 0.3s;';
        notif.innerText = 'Hostel list updated!';
        document.body.appendChild(notif);
    }
    notif.style.opacity = '1';
    setTimeout(() => { notif.style.opacity = '0'; }, 2500);
}

// Real-time sync: listen for hostel, user, booking, and payment updates
window.addEventListener('storage', function(e) {
    if (e.key === 'hostels') {
        renderHostelGrid && renderHostelGrid();
        showHostelUpdateNotification && showHostelUpdateNotification();
    }
    if (e.key === 'users') {
        // Re-render user-related UI if present
        if (typeof renderUsers === 'function') renderUsers();
        if (document.getElementById('profileUsername')) {
            // If on profile page, reload username and user info
            location.reload();
        }
        // Optionally show notification
        if (typeof showUserUpdateNotification === 'function') showUserUpdateNotification();
    }
    if (e.key === 'bookings') {
        if (typeof renderBookings === 'function') renderBookings();
        if (document.getElementById('profileBookings')) {
            // If on profile page, reload bookings
            location.reload();
        }
        if (typeof showBookingUpdateNotification === 'function') showBookingUpdateNotification();
    }
    if (e.key === 'payments') {
        if (typeof renderPayments === 'function') renderPayments();
        if (document.getElementById('profilePayments')) {
            // If on profile page, reload payments
            location.reload();
        }
        if (typeof showPaymentUpdateNotification === 'function') showPaymentUpdateNotification();
    }
}); 