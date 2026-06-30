import * as THREE from 'three';

// Curved parabolic video screen geometry.
export function createParabolicScreenGeometry(width, height, widthSegments = 48, heightSegments = 28, depth = 0.42) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const uvs = [];
  const indices = [];

  for (let y = 0; y <= heightSegments; y++) {
    const v = y / heightSegments;
    const py = (0.5 - v) * height;
    const ny = (py / (height * 0.5));
    for (let x = 0; x <= widthSegments; x++) {
      const u = x / widthSegments;
      const px = (u - 0.5) * width;
      const nx = px / (width * 0.5);
      const pz = depth * (nx * nx + 0.16 * ny * ny);
      positions.push(px, py, pz);
      uvs.push(u, 1 - v);
    }
  }

  for (let y = 0; y < heightSegments; y++) {
    for (let x = 0; x < widthSegments; x++) {
      const a = y * (widthSegments + 1) + x;
      const b = a + 1;
      const c = a + (widthSegments + 1);
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();
  return geometry;
}

