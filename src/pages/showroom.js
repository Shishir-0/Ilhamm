// showroom.js
import { mountNavbar } from '../components/Navbar.js';
import { initShowroom } from '../components/ShowroomScene.js';

document.addEventListener('DOMContentLoaded', () => {
    mountNavbar();
    initShowroom();
});
