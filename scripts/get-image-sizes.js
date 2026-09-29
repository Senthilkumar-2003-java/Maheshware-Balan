const fs = require('fs');
const path = require('path');

// Function to read basic JPEG/PNG dimensions from file buffer
function getImageDimensions(buffer) {
  // Check PNG
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height, format: 'PNG' };
  }
  // Check JPEG
  if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xFF) break;
      const marker = buffer[offset + 1];
      if (marker === 0xC0 || marker === 0xC2) { // SOF0, SOF2
        const height = buffer.readUInt16BE(offset + 5);
        const width = buffer.readUInt16BE(offset + 7);
        return { width, height, format: 'JPEG' };
      }
      const length = buffer.readUInt16BE(offset + 2);
      offset += 2 + length;
    }
  }
  return { width: 'Unknown', height: 'Unknown', format: 'Other' };
}

function scanDir(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(scanDir(fullPath));
    } else if (/\.(jpg|jpeg|png|svg|webp)$/i.test(file)) {
      const buffer = fs.readFileSync(fullPath);
      const dims = getImageDimensions(buffer);
      results.push({
        fileName: file,
        relativePath: path.relative(path.join(__dirname, '..'), fullPath).replace(/\\/g, '/'),
        sizeKB: (stat.size / 1024).toFixed(1) + ' KB',
        dimensions: dims.width !== 'Unknown' ? `${dims.width} x ${dims.height} px` : 'Vector / SVG',
        format: dims.format
      });
    }
  });
  return results;
}

const assets = scanDir(path.join(__dirname, '..', 'frontend', 'src', 'assets'));
console.log(JSON.stringify(assets, null, 2));
