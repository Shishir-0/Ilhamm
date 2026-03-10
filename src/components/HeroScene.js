// HeroScene.js
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createPremiumHamper } from '../utils/models.js';

gsap.registerPlugin(ScrollTrigger);

export function initHeroScene() {
    const container = document.getElementById('hero-canvas-container');
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // Add subtle ambient fog for cinematic depth
    scene.fog = new THREE.FogExp2('#111111', 0.05);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize
    container.appendChild(renderer.domElement);

    // 2. Lighting (Luxury Setup)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffdfd3, 2); // Rose gold tint
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x5a0f2e, 1.5); // Burgundy fill
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    // 3. The "Hamper" (High Quality Procedural Mod)
    const hamperGroup = createPremiumHamper();
    hamperGroup.position.y = -1.5; // Move down to not block text
    const itemsGroup = hamperGroup.getObjectByName("itemsGroup");

    // We expect these names from createPremiumHamper
    const wine = itemsGroup.getObjectByName("wineItem");
    const choc = itemsGroup.getObjectByName("chocItem");
    const items = [wine, choc];

    scene.add(hamperGroup);

    // 4. Magic Particles (Floating Petals/Sparkles)
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 200;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15; // Spread around
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMat = new THREE.PointsMaterial({
        size: 0.05,
        color: '#E6B7A9',
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // 5. Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Gentle rotation of the hamper
        hamperGroup.rotation.y = elapsedTime * 0.1;

        // Floating effect
        hamperGroup.position.y = Math.sin(elapsedTime * 1) * 0.2;

        // Particle subtle movement
        particlesMesh.rotation.y = -elapsedTime * 0.05;
        particlesMesh.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

        renderer.render(scene, camera);
    }
    animate();

    // 6. Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 7. GSAP Scroll Story Integration
    // Transfer camera control to scroll after hero
    setupScrollAnimations(camera, hamperGroup, items);
}

function setupScrollAnimations(camera, hamperGroup, items) {
    // Reveal story texts
    const storyTexts = document.querySelectorAll('.story-text');
    storyTexts.forEach((text, i) => {
        gsap.to(text, {
            scrollTrigger: {
                trigger: text.parentElement,
                start: "top 60%",
                end: "bottom 80%",
                scrub: 1,
            },
            opacity: 1,
            y: -20,
            ease: "power2.out"
        });
    });

    // Section 1: "Handpicked Luxury" - Explode effect
    gsap.to(items[0].position, { // Wine
        scrollTrigger: {
            trigger: ".story-section:nth-child(2)",
            start: "top bottom",
            end: "top top",
            scrub: 1
        },
        y: 3,
        x: -3,
        z: 1
    });
    gsap.to(items[0].rotation, {
        scrollTrigger: {
            trigger: ".story-section:nth-child(2)",
            start: "top bottom",
            end: "top top",
            scrub: 1
        },
        z: -0.5
    });

    gsap.to(items[1].position, { // Chocolate
        scrollTrigger: {
            trigger: ".story-section:nth-child(2)",
            start: "top bottom",
            end: "top top",
            scrub: 1
        },
        y: 2,
        x: 3,
        z: 2
    });
    gsap.to(items[1].rotation, {
        scrollTrigger: {
            trigger: ".story-section:nth-child(2)",
            start: "top bottom",
            end: "top top",
            scrub: 1
        },
        y: Math.PI
    });

    // Camera movement pulling back to see the explosion
    gsap.to(camera.position, {
        scrollTrigger: {
            trigger: ".story-section:nth-child(2)",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        z: 12,
        y: 2
    });

    // Section 2: "Crafted with Care" - Reassemble into hamper
    gsap.to(items[0].position, { // Wine return
        scrollTrigger: {
            trigger: ".story-section:nth-child(3)",
            start: "top bottom",
            end: "top center",
            scrub: 1
        },
        x: -0.5,
        y: 0.4,
        z: -0.3
    });
    gsap.to(items[0].rotation, {
        scrollTrigger: {
            trigger: ".story-section:nth-child(3)",
            start: "top bottom",
            end: "top center",
            scrub: 1
        },
        z: -0.15,
        x: 0.1
    });

    gsap.to(items[1].position, { // Chocolate return
        scrollTrigger: {
            trigger: ".story-section:nth-child(3)",
            start: "top bottom",
            end: "top center",
            scrub: 1
        },
        x: 0.4,
        y: 0.2,
        z: 0
    });
    gsap.to(items[1].rotation, {
        scrollTrigger: {
            trigger: ".story-section:nth-child(3)",
            start: "top bottom",
            end: "top center",
            scrub: 1
        },
        y: 0.3,
        z: 0.2
    });

    // Section 3: "Step Inside" - Zoom into the hamper
    gsap.to(camera.position, {
        scrollTrigger: {
            trigger: ".story-section:nth-child(4)",
            start: "top center",
            end: "bottom bottom",
            scrub: 1
        },
        z: 4,
        y: 1
    });

    // Tie the canvas position to the scroll container to keep it fixed while scrubbing sequence
    const container = document.getElementById('hero-canvas-container');
    const scrollContainer = document.getElementById('scroll-story-container');

    ScrollTrigger.create({
        trigger: scrollContainer,
        start: "top top",
        end: "bottom bottom",
        onEnter: () => container.style.position = 'fixed',
        onLeaveBack: () => container.style.position = 'absolute'
    });
}
