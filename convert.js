import sharp from 'sharp';
import process from 'process';

const action = process.argv[2];
const inputPath = process.argv[3];
const outputPath = process.argv[4];

if (!action || !inputPath || !outputPath) {
  console.error('Usage: node convert.js <to_jpg|to_avif> <input> <output>');
  process.exit(1);
}

try {
  if (action === 'to_jpg') {
    await sharp(inputPath)
      .jpeg({ quality: 90 })
      .toFile(outputPath);
    console.log(`Converted ${inputPath} to JPEG at ${outputPath}`);
  } else if (action === 'to_avif') {
    await sharp(inputPath)
      .avif({ quality: 90 })
      .toFile(outputPath);
    console.log(`Converted ${inputPath} to AVIF at ${outputPath}`);
  } else {
    console.error('Unknown action:', action);
    process.exit(1);
  }
} catch (err) {
  console.error('Error processing image:', err);
  process.exit(1);
}
