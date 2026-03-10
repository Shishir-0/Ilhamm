// ShowroomScene.js
import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';
import { featuredHampers } from '../utils/data.js';
import { createPremiumHamper } from '../utils/models.js';

export function initShowroom() {
    const container = document.getElementById('showroom-canvas-container');
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a0406'); // Very dark background
    scene.fog = new THREE.FogExp2('#0a0406', 0.03); // Match bg

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 5); // Average eye height

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting (Luxury moody lighting)
    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);

    const light1 = new THREE.PointLight('#E6B7A9', 1.5, 20); // Rose gold
    light1.position.set(0, 4, 0);
    light1.castShadow = true;
    scene.add(light1);

    const light2 = new THREE.PointLight('#5A0F2E', 2, 20); // Burgundy
    light2.position.set(-5, 3, -5);
    scene.add(light2);

    // 3. Environment Architecture (Boutique)
    // Floor (Marble-like reflective)
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
        color: '#111',
        roughness: 0.1, // Shiny
        metalness: 0.4
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Walls
    const wallGeo = new THREE.BoxGeometry(30, 8, 1);
    const wallMat = new THREE.MeshStandardMaterial({ color: '#1a0a10', roughness: 0.9 });

    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.set(0, 4, -15);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Pedestals & Hampers
    const interactableObjects = [];
    const raycaster = new THREE.Raycaster();
    const centerPoint = new THREE.Vector2(0, 0);

    featuredHampers.forEach((hamper, index) => {
        // Pedestal
        const pedGeo = new THREE.CylinderGeometry(0.5, 0.6, 1, 32);
        const pedMat = new THREE.MeshStandardMaterial({ color: '#222', metalness: 0.8, roughness: 0.2 });
        const pedestal = new THREE.Mesh(pedGeo, pedMat);

        // Position them in a semi-circle
        const angle = (index / (featuredHampers.length - 1)) * Math.PI - Math.PI / 2;
        const radius = 6;
        pedestal.position.x = Math.sin(angle) * radius;
        pedestal.position.z = -Math.cos(angle) * radius - 2;
        pedestal.position.y = 0.5;
        pedestal.receiveShadow = true;
        pedestal.castShadow = true;
        scene.add(pedestal);

        // Hamper Model (Procedural high-quality)
        const hamperGroup = createPremiumHamper();
        hamperGroup.position.copy(pedestal.position);
        hamperGroup.position.y += 0.8; // On top of pedestal
        hamperGroup.scale.set(0.8, 0.8, 0.8);

        // Add spotlight above hamper
        const spot = new THREE.SpotLight(0xffffff, 2);
        spot.position.set(hamperGroup.position.x, 6, hamperGroup.position.z);
        spot.target = hamperGroup;
        spot.angle = 0.2;
        spot.penumbra = 1;
        scene.add(spot);

        // Invisible Hit Box for raycasting
        const hitGeo = new THREE.BoxGeometry(2, 2, 2);
        const hitMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitBox = new THREE.Mesh(hitGeo, hitMat);
        hitBox.position.y = 0.5;
        hitBox.userData = { id: hamper.id, name: hamper.name, renderGroup: hamperGroup };
        hamperGroup.add(hitBox);

        interactableObjects.push(hitBox);

        scene.add(hamperGroup);
    });

    // 4. Controls (Pointer Lock for FPS feel)
    const controls = new PointerLockControls(camera, document.body);

    const clickToStartContent = document.createElement('div');
    clickToStartContent.className = "absolute inset-0 bg-black/80 z-50 flex items-center justify-center cursor-pointer backdrop-blur-sm transition-opacity duration-300";
    clickToStartContent.innerHTML = `<span class="text-[#E6B7A9] font-hero text-2xl tracking-widest uppercase border border-[#E6B7A9] px-8 py-4 rounded-full hover:bg-[#E6B7A9] hover:text-[#111] transition-colors">Enter Showroom</span>`;
    document.body.appendChild(clickToStartContent);

    clickToStartContent.addEventListener('click', () => {
        controls.lock();
    });

    controls.addEventListener('lock', () => {
        clickToStartContent.style.opacity = '0';
        setTimeout(() => clickToStartContent.style.display = 'none', 300);
    });

    controls.addEventListener('unlock', () => {
        clickToStartContent.style.display = 'flex';
        setTimeout(() => clickToStartContent.style.opacity = '1', 10);
    });

    // Handle Movement
    const movement = { forward: false, backward: false, left: false, right: false };
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();

    document.addEventListener('keydown', (e) => {
        if (e.code === 'KeyW') movement.forward = true;
        if (e.code === 'KeyS') movement.backward = true;
        if (e.code === 'KeyA') movement.left = true;
        if (e.code === 'KeyD') movement.right = true;
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === 'KeyW') movement.forward = false;
        if (e.code === 'KeyS') movement.backward = false;
        if (e.code === 'KeyA') movement.left = false;
        if (e.code === 'KeyD') movement.right = false;
    });

    // Handle Interactions (Clicking on hamper)
    document.addEventListener('mousedown', () => {
        if (controls.isLocked) {
            raycaster.setFromCamera(centerPoint, camera);
            const intersects = raycaster.intersectObjects(interactableObjects);
            if (intersects.length > 0) {
                const target = intersects[0].object;
                const id = target.userData.id;
                // Navigate to product
                window.location.href = `/product.html?id=${id}`;
            }
        }
    });

    // Create a HUD tooltip
    const tooltip = document.createElement('div');
    tooltip.className = "absolute top-1/2 left-1/2 transform translate-x-4 -translate-y-4 text-white text-sm bg-[#5A0F2E]/80 backdrop-blur px-3 py-1 rounded hidden pointer-events-none transition-opacity";
    document.body.appendChild(tooltip);

    // 5. Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();

        // Raycasting for hover effect
        if (controls.isLocked) {
            raycaster.setFromCamera(centerPoint, camera);
            const intersects = raycaster.intersectObjects(interactableObjects);

            if (intersects.length > 0) {
                const target = intersects[0].object;
                tooltip.style.display = 'block';
                tooltip.textContent = "View " + target.userData.name;
                // Add slight glow or scale to the group
                target.userData.renderGroup.scale.set(0.85, 0.85, 0.85);
            } else {
                tooltip.style.display = 'none';
                interactableObjects.forEach(obj => obj.userData.renderGroup.scale.set(0.8, 0.8, 0.8));
            }

            // Movement physics
            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            direction.z = Number(movement.forward) - Number(movement.backward);
            direction.x = Number(movement.right) - Number(movement.left);
            direction.normalize();

            if (movement.forward || movement.backward) velocity.z -= direction.z * 40.0 * delta;
            if (movement.left || movement.right) velocity.x -= direction.x * 40.0 * delta;

            controls.moveRight(-velocity.x * delta);
            controls.moveForward(-velocity.z * delta);

            // Constrain to room bounds
            const pos = camera.position;
            pos.y = 1.6; // Keep height locked
            if (pos.x > 14) pos.x = 14;
            if (pos.x < -14) pos.x = -14;
            if (pos.z > 14) pos.z = 14;
            if (pos.z < -14) pos.z = -14; // Back wall limit
        }

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
