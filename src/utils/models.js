import * as THREE from 'three';

// Create a high-quality empty procedural luxury hamper model
export function createEmptyHamperBase() {
    const group = new THREE.Group();

    // 1. The Velvet Base Box
    const baseGeo = new THREE.BoxGeometry(2, 1.2, 1.5);
    const baseMat = new THREE.MeshStandardMaterial({
        color: '#2a0a14', // Deep Burgundy Velvet
        roughness: 0.9,
        metalness: 0.1,
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.6;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    // 2. Gold Trim / Rim
    const trimGeo = new THREE.BoxGeometry(2.05, 0.05, 1.55);
    const goldMat = new THREE.MeshStandardMaterial({
        color: '#d4af37', // Gold
        roughness: 0.2,
        metalness: 0.8,
    });
    const trim = new THREE.Mesh(trimGeo, goldMat);
    trim.position.y = 1.18;
    group.add(trim);

    const bottomTrim = new THREE.Mesh(trimGeo, goldMat);
    bottomTrim.position.y = 0.05;
    group.add(bottomTrim);

    // 3. Ribbon wrapped around the box
    const ribbonGeo1 = new THREE.BoxGeometry(2.02, 1.21, 0.2);
    const roseGoldMat = new THREE.MeshStandardMaterial({
        color: '#E6B7A9', // Rose gold
        roughness: 0.3,
        metalness: 0.6,
    });
    const ribbon1 = new THREE.Mesh(ribbonGeo1, roseGoldMat);
    ribbon1.position.y = 0.6;
    group.add(ribbon1);

    const ribbonGeo2 = new THREE.BoxGeometry(0.2, 1.21, 1.52);
    const ribbon2 = new THREE.Mesh(ribbonGeo2, roseGoldMat);
    ribbon2.position.y = 0.6;
    group.add(ribbon2);

    // 4. Large Bow on front
    const bowGeo = new THREE.TorusGeometry(0.25, 0.06, 16, 50);
    const bowL = new THREE.Mesh(bowGeo, roseGoldMat);
    bowL.position.set(-0.25, 0.6, 0.76);
    bowL.rotation.x = Math.PI / 4;
    group.add(bowL);

    const bowR = new THREE.Mesh(bowGeo, roseGoldMat);
    bowR.position.set(0.25, 0.6, 0.76);
    bowR.rotation.x = -Math.PI / 4;
    group.add(bowR);

    // Slight scale down so it matches bounds roughly 1 unit sized
    group.scale.set(0.7, 0.7, 0.7);

    return group;
}

// Create a high-quality procedural luxury hamper model with items
export function createPremiumHamper() {
    const group = createEmptyHamperBase();

    // 5. Some elements peeking out of the top (Wine, Chocolates, Flowers)
    const itemsGroup = new THREE.Group();
    itemsGroup.name = "itemsGroup";
    itemsGroup.position.y = 1.2;

    const goldMat = new THREE.MeshStandardMaterial({
        color: '#d4af37', // Gold
        roughness: 0.2,
        metalness: 0.8,
    });

    // Wine Bottle
    const wineGeo = new THREE.CylinderGeometry(0.15, 0.18, 1.2, 16);
    const wineMat = new THREE.MeshStandardMaterial({ color: '#050505', metalness: 0.9, roughness: 0.1 });
    const wine = new THREE.Mesh(wineGeo, wineMat);
    wine.name = "wineItem";
    wine.position.set(-0.5, 0.4, -0.3);
    wine.rotation.z = -0.15;
    wine.rotation.x = 0.1;

    // Wine label
    const labelGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.4, 16);
    const labelMat = new THREE.MeshStandardMaterial({ color: '#E6B7A9', roughness: 0.8 });
    const label = new THREE.Mesh(labelGeo, labelMat);
    label.position.set(0, 0, 0);
    wine.add(label);
    itemsGroup.add(wine);

    // Chocolate Box
    const chocGeo = new THREE.BoxGeometry(0.8, 0.1, 0.6);
    const chocMat = new THREE.MeshStandardMaterial({ color: '#5A0F2E', metalness: 0.5, roughness: 0.5 });
    const choc = new THREE.Mesh(chocGeo, chocMat);
    choc.name = "chocItem";
    choc.position.set(0.4, 0.2, 0);
    choc.rotation.y = 0.3;
    choc.rotation.z = 0.2;

    // Chocolate ribbon
    const chocRibbon = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.11, 0.61), goldMat);
    choc.add(chocRibbon);
    itemsGroup.add(choc);

    // Flowers (Abstract spheres cluster)
    const flowerMat = new THREE.MeshStandardMaterial({ color: '#FFF6F2', roughness: 0.9 });
    for (let i = 0; i < 5; i++) {
        const flower = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), flowerMat);
        flower.position.set(
            (Math.random() - 0.5) * 0.8,
            Math.random() * 0.3,
            0.2 + (Math.random() * 0.4)
        );
        itemsGroup.add(flower);
    }

    group.add(itemsGroup);

    return group;
}
