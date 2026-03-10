// configurator.js
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import gsap from 'gsap';
import { mountNavbar } from '../components/Navbar.js';
import { createEmptyHamperBase } from '../utils/models.js';

document.addEventListener('DOMContentLoaded', () => {
    mountNavbar();
    initConfigurator();
});

let scene, camera, renderer, hamperGroup;
let currentTotal = 4500; // Base velvet box
const addedItems = [];

function initConfigurator() {
    const container = document.getElementById('configurator-canvas-container');
    if (!container) return;

    // 1. Scene Setup
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 3, 5);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2 - 0.1; // Don't go below floor

    // 3. Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight('#E6B7A9', 1.5);
    dirLight.position.set(2, 5, 2);
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight('#5A0F2E', 1);
    fillLight.position.set(-2, 3, -2);
    scene.add(fillLight);

    // 4. Base Hamper (Velvet Box Default)
    hamperGroup = createEmptyHamperBase();
    hamperGroup.position.set(0, -0.6, 0); // Drop down slightly

    // Scale up slightly for the configurator
    hamperGroup.scale.set(1.0, 1.0, 1.0);

    scene.add(hamperGroup);

    // Grid helper (subtle floor)
    const gridHelper = new THREE.GridHelper(10, 20, '#5A0F2E', '#222222');
    gridHelper.position.y = -0.4;
    gridHelper.material.opacity = 0.2;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Make global for onclick handlers in HTML
    window.addConfigItem = addConfigItem;

    // 5. Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // 6. Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function addConfigItem(type, price) {
    if (!hamperGroup) return;

    // Visual Feedback Data
    let geo, mat, mesh;

    if (type === 'wine') {
        geo = new THREE.CylinderGeometry(0.2, 0.2, 1.8, 16);
        mat = new THREE.MeshStandardMaterial({ color: '#050203', metalness: 0.9, roughness: 0.1 });
    } else if (type === 'chocolate') {
        geo = new THREE.BoxGeometry(0.8, 0.15, 0.8);
        mat = new THREE.MeshStandardMaterial({ color: '#d4af37', metalness: 0.6, roughness: 0.3 });
    } else if (type === 'flower') {
        geo = new THREE.SphereGeometry(0.3, 16, 16);
        mat = new THREE.MeshStandardMaterial({ color: '#E6B7A9', roughness: 0.8 });
    }

    mesh = new THREE.Mesh(geo, mat);

    // Randomize position inside basket slightly
    const randomX = (Math.random() - 0.5) * 1.5;
    const randomZ = (Math.random() - 0.5) * 1;

    mesh.position.set(0, 3, 0); // Start high up
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

    hamperGroup.add(mesh);
    addedItems.push(mesh);

    // Animate falling into basket
    gsap.to(mesh.position, {
        y: 0.2,
        x: randomX,
        z: randomZ,
        duration: 1,
        ease: "bounce.out"
    });

    gsap.to(mesh.rotation, {
        x: type === 'wine' ? Math.PI / 2 - 0.2 : 0,
        y: Math.random() * 0.5,
        z: type === 'wine' ? Math.random() * 0.2 : 0,
        duration: 1,
        ease: "power2.out"
    });

    // Update Price
    currentTotal += price;
    updatePriceDisplay();
}

function updatePriceDisplay() {
    const el = document.getElementById('config-total');
    if (el) {
        // Animate price change
        gsap.to(el, {
            scale: 1.2,
            color: '#E6B7A9',
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                el.innerText = '₹' + currentTotal.toLocaleString('en-IN');
            }
        });
    }
}
