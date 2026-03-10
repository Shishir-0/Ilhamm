// Navbar.js - Generates the glassmorphism navbar

export function mountNavbar() {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    container.innerHTML = `
        <nav class="fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-auto" id="main-nav">
            <div class="glass mx-4 mt-4 px-6 py-4 rounded-full flex justify-between items-center z-50 relative">
                
                <!-- Logo -->
                <a href="/index.html" class="flex items-center gap-2 group">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5A0F2E] to-[#E6B7A9] flex items-center justify-center text-[#111111] font-hero font-bold text-lg group-hover:scale-110 transition-transform">
                        E
                    </div>
                    <span class="font-hero text-xl tracking-widest text-[#FFF6F2] group-hover:text-[#E6B7A9] transition-colors">ILHAMM</span>
                </a>

                <!-- Desktop Menu -->
                <div class="hidden md:flex gap-8 items-center font-body text-sm tracking-wider uppercase">
                    <a href="/marketplace.html" class="text-[#FFF6F2]/80 hover:text-[#E6B7A9] transition-colors">Marketplace</a>
                    <a href="/showroom.html" class="text-[#FFF6F2]/80 hover:text-[#E6B7A9] transition-colors">Showroom 3D</a>
                    <a href="/configurator.html" class="text-[#FFF6F2]/80 hover:text-[#E6B7A9] transition-colors">Build a Hamper</a>
                    <a href="/about.html" class="text-[#FFF6F2]/80 hover:text-[#E6B7A9] transition-colors">Our Story</a>
                </div>

                <!-- Actions -->
                <div class="flex items-center gap-6">
                    <button class="text-[#FFF6F2]/80 hover:text-[#E6B7A9] transition-colors" aria-label="Search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="M21 21L16.65 16.65"/>
                        </svg>
                    </button>
                    <!-- Cart Button -->
                    <button id="cart-toggle" class="text-[#FFF6F2]/80 hover:text-[#E6B7A9] transition-colors relative" aria-label="Cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke-linejoin="round"/>
                            <path d="M3 6H21" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="absolute -top-2 -right-2 bg-[#5A0F2E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
                    </button>
                    
                    <!-- Mobile Menu Toggle -->
                    <button class="md:hidden text-[#FFF6F2]/80 hover:text-[#E6B7A9]" aria-label="Menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 12H21M3 6H21M3 18H21" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    `;

    // Add scroll listener for navbar background style change (optional enhancement)
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (window.scrollY > 50) {
            nav.classList.add('py-2');
            nav.querySelector('.glass').classList.add('bg-[#111111]/80');
        } else {
            nav.classList.remove('py-2');
            nav.querySelector('.glass').classList.remove('bg-[#111111]/80');
        }
    });
}
