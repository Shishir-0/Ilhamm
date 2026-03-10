// product.js
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { mountNavbar } from '../components/Navbar.js';
import { mountFooter } from '../components/Footer.js';
import { featuredHampers } from '../utils/data.js';
import { createPremiumHamper } from '../utils/models.js';

document.addEventListener('DOMContentLoaded', () => {
    mountNavbar();
    mountFooter();

    // Parse ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Fallback to first if none
    const product = featuredHampers.find(h => h.id === productId) || featuredHampers[0];

    // Update DOM
    if (product) {
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-type').textContent = product.type;
        document.getElementById('product-price').textContent = product.price;
        document.title = `${product.name} | Ilhamm`;
    }

    initProductViewer();
});

function initProductViewer() {
    const container = document.getElementById('product-canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.5, 4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true; // Cinematic slow rotation
    controls.autoRotateSpeed = 1.5;
    controls.enableZoom = true;
    controls.minDistance = 2;
    controls.maxDistance = 6;

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const spotLight = new THREE.SpotLight('#FFF6F2', 2);
    spotLight.position.set(3, 5, 3);
    scene.add(spotLight);

    const fillLight = new THREE.PointLight('#5A0F2E', 1);
    fillLight.position.set(-3, 0, -3);
    scene.add(fillLight);

    // 4. Product Model 
    const productGroup = createPremiumHamper();
    // Scale it up slightly for the product viewer
    productGroup.scale.set(1.5, 1.5, 1.5);
    scene.add(productGroup);

    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // required for damping and autoRotate
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
