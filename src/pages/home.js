// home.js
import { mountNavbar } from '../components/Navbar.js';
import { initHeroScene } from '../components/HeroScene.js';
import { featuredHampers } from '../utils/data.js';

document.addEventListener('DOMContentLoaded', () => {
    mountNavbar();
    initHeroScene();
    renderFeaturedHampers();
});

function renderFeaturedHampers() {
    const grid = document.getElementById('featured-hampers-grid');
    if (!grid) return;

    featuredHampers.forEach(hamper => {
        const card = document.createElement('a');
        card.href = '/product.html?id=' + hamper.id;
        card.className = "group relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#1a0a10] border border-white/5 cursor-pointer block transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(90,15,46,0.3)]";

        card.innerHTML = `
            <!-- Image -->
            <div class="absolute inset-0 w-full h-full">
                <img src="${hamper.image}" alt="${hamper.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                <div class="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent z-10 pointer-events-none"></div>
            </div>

            <!-- Content -->
            <div class="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-[#111] to-transparent">
                <span class="text-[#E6B7A9] text-xs font-medium tracking-widest uppercase mb-2 block">${hamper.type}</span>
                <h3 class="font-hero text-2xl text-white mb-1 group-hover:text-gold-gradient transition-all">${hamper.name}</h3>
                <div class="flex justify-between items-center mt-4">
                    <span class="text-white/80 font-light">${hamper.price}</span>
                    <span class="text-xs bg-[#5A0F2E] text-white px-2 py-1 rounded-full flex items-center gap-1">
                        ★ ${hamper.rating}
                    </span>
                </div>
            </div>
            
            <!-- Hover Glow Overlay -->
            <div class="absolute inset-0 border-2 border-[#E6B7A9] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 scale-105 group-hover:scale-100 z-30 pointer-events-none"></div>
        `;

        grid.appendChild(card);
    });
}
