// Footer.js
export function mountFooter() {
    const container = document.getElementById('footer-container');
    if (!container) return;

    container.innerHTML = `
        <footer class="bg-[#0a0406] text-[#FFF6F2]/70 pt-20 pb-10 border-t border-[#5A0F2E]/30 relative overflow-hidden">
            <!-- Decorative Background Element -->
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-[#5A0F2E]/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                <div class="col-span-1 md:col-span-2">
                    <a href="/index.html" class="flex items-center gap-2 mb-6 group inline-block">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5A0F2E] to-[#E6B7A9] flex items-center justify-center text-[#111111] font-hero font-bold text-xl">
                            E
                        </div>
                        <span class="font-hero text-2xl tracking-widest text-[#FFF6F2]">ILHAMM</span>
                    </a>
                    <p class="text-sm leading-relaxed max-w-sm font-light">
                        Curating the world's finest gifts into unforgettable hamper experiences. Delivered with elegance, crafted with love.
                    </p>
                </div>
                
                <div>
                    <h4 class="font-hero text-[#E6B7A9] text-xl mb-6">Explore</h4>
                    <ul class="space-y-4 text-sm font-light">
                        <li><a href="/marketplace.html" class="hover:text-[#E6B7A9] transition-colors">Marketplace</a></li>
                        <li><a href="/showroom.html" class="hover:text-[#E6B7A9] transition-colors">Metaverse Showroom</a></li>
                        <li><a href="/configurator.html" class="hover:text-[#E6B7A9] transition-colors">Bespoke Configurator</a></li>
                        <li><a href="/about.html" class="hover:text-[#E6B7A9] transition-colors">Our Story</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="font-hero text-[#E6B7A9] text-xl mb-6">Contact</h4>
                    <ul class="space-y-4 text-sm font-light">
                        <li class="flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">✉</span>
                            concierge@ilhamm.com
                        </li>
                        <li class="flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">☏</span>
                            +1 (800) LUX-GIFT
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs font-light">
                <p>&copy; ${new Date().getFullYear()} Ilhamm. All rights reserved.</p>
                <div class="flex gap-6 mt-4 md:mt-0">
                    <a href="#" class="hover:text-[#E6B7A9]">Privacy Policy</a>
                    <a href="#" class="hover:text-[#E6B7A9]">Terms of Service</a>
                </div>
            </div>
        </footer>
    `;
}
