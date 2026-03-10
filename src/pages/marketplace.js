// marketplace.js
import { mountNavbar } from '../components/Navbar.js';
import { mountFooter } from '../components/Footer.js';
import { featuredHampers } from '../utils/data.js';

document.addEventListener('DOMContentLoaded', () => {
    mountNavbar();
    mountFooter();
    renderMarketplace();
});

function renderMarketplace() {
    const grid = document.getElementById('marketplace-grid');
    if (!grid) return;

    // Use duplicated mock data for the grid
    const allProducts = [...featuredHampers, ...featuredHampers, ...featuredHampers].map((p, i) => ({ ...p, id: 'mk_' + i }));

    allProducts.forEach(hamper => {
        const card = document.createElement('a');
        card.href = '/product.html?id=' + hamper.id;
        card.className = "group relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#1a0a10] border border-white/5 cursor-pointer block transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(90,15,46,0.3)] flex flex-col";

        card.innerHTML = `
            <!-- Top Image Area -->
            <div class="relative w-full h-[65%] bg-[#111] overflow-hidden flex items-center justify-center">
                <img src="${hamper.image}" alt="${hamper.name}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                <div class="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent z-10"></div>


                <!-- Quick Add Button (Hidden initially) -->
                <button class="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-[#FFF6F2] text-xs uppercase tracking-widest px-4 py-2 rounded-full hover:bg-[#E6B7A9] hover:text-[#111]">
                    Quick Add
                </button>
            </div>

            <!-- Bottom Content Area -->
            <div class="flex-1 p-6 z-20 bg-[#111] flex flex-col justify-between border-t border-white/5">
                <div>
                    <span class="text-[#E6B7A9] text-[10px] font-medium tracking-widest uppercase mb-1 block">${hamper.type}</span>
                    <h3 class="font-hero text-lg text-white group-hover:text-gold-gradient transition-colors line-clamp-1">${hamper.name}</h3>
                </div>
                <div class="flex justify-between items-center mt-4">
                    <span class="text-white/90 font-light">${hamper.price}</span>
                    <span class="text-xs text-[#E6B7A9] font-medium flex items-center gap-1">
                        ★ ${hamper.rating}
                    </span>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}
