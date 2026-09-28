const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const refPath = path.join(__dirname, '..', 'src', 'assets', 'images', 'reference-mockup.jpg');
const outputDir = path.join(__dirname, '..', 'src', 'assets', 'images');

async function processImages() {
  const metadata = await sharp(refPath).metadata();
  console.log('Reference Mockup dimensions:', metadata.width, 'x', metadata.height);

  const W = metadata.width;
  const H = metadata.height;

  // Let's define the precise bounding boxes in percentage of the reference mockup:
  // [left_pct, top_pct, width_pct, height_pct]
  const crops = [
    // 1. Hero Children (Girl with chin on hands + courtyard children)
    {
      name: 'hero-children.jpg',
      left: Math.round(W * 0.44),
      top: Math.round(H * 0.045),
      width: Math.round(W * 0.54),
      height: Math.round(H * 0.24)
    },
    // 2. Program 1: Gov School Students
    {
      name: 'government-school-students.jpg',
      left: Math.round(W * 0.05),
      top: Math.round(H * 0.327),
      width: Math.round(W * 0.17),
      height: Math.round(H * 0.08)
    },
    // 3. Program 2: School Needs Building
    {
      name: 'government-school-needs.jpg',
      left: Math.round(W * 0.24),
      top: Math.round(H * 0.327),
      width: Math.round(W * 0.17),
      height: Math.round(H * 0.08)
    },
    // 4. Program 3: Cancer Patient Support
    {
      name: 'cancer-patient-support.jpg',
      left: Math.round(W * 0.43),
      top: Math.round(H * 0.327),
      width: Math.round(W * 0.17),
      height: Math.round(H * 0.08)
    },
    // 5. Program 4: AIDS Patient Support (Red ribbon hands)
    {
      name: 'aids-support.jpg',
      left: Math.round(W * 0.61),
      top: Math.round(H * 0.327),
      width: Math.round(W * 0.17),
      height: Math.round(H * 0.08)
    },
    // 6. Program 5: Old Age People Support (Senior couple)
    {
      name: 'senior-citizen-support.jpg',
      left: Math.round(W * 0.79),
      top: Math.round(H * 0.327),
      width: Math.round(W * 0.17),
      height: Math.round(H * 0.08)
    },
    // 7. Impact Section (Boy with backpack facing sunset)
    {
      name: 'impact-children.jpg',
      left: Math.round(W * 0.70),
      top: Math.round(H * 0.49),
      width: Math.round(W * 0.28),
      height: Math.round(H * 0.12)
    },
    // 8. Story Sprout Plant Hands
    {
      name: 'plant-growth-hands.jpg',
      left: Math.round(W * 0.73),
      top: Math.round(H * 0.63),
      width: Math.round(W * 0.25),
      height: Math.round(H * 0.11)
    },
    // 9. Story Collage 1: Students
    {
      name: 'story-education.jpg',
      left: Math.round(W * 0.075),
      top: Math.round(H * 0.635),
      width: Math.round(W * 0.09),
      height: Math.round(H * 0.055)
    },
    // 10. Story Collage 2: Senior
    {
      name: 'story-senior-care.jpg',
      left: Math.round(W * 0.17),
      top: Math.round(H * 0.635),
      width: Math.round(W * 0.09),
      height: Math.round(H * 0.055)
    },
    // 11. Story Collage 3: Healthcare
    {
      name: 'story-healthcare.jpg',
      left: Math.round(W * 0.165),
      top: Math.round(H * 0.675),
      width: Math.round(W * 0.08),
      height: Math.round(H * 0.05)
    },
    // 12. Story Collage 4: Child smile
    {
      name: 'story-community.jpg',
      left: Math.round(W * 0.11),
      top: Math.round(H * 0.69),
      width: Math.round(W * 0.085),
      height: Math.round(H * 0.055)
    },
    // 13. Testimonial 1: Priya
    {
      name: 'testimonial-student.jpg',
      left: Math.round(W * 0.065),
      top: Math.round(H * 0.795),
      width: Math.round(W * 0.055),
      height: Math.round(H * 0.04)
    },
    // 14. Testimonial 2: Ramesh
    {
      name: 'testimonial-patient.jpg',
      left: Math.round(W * 0.295),
      top: Math.round(H * 0.795),
      width: Math.round(W * 0.055),
      height: Math.round(H * 0.04)
    },
    // 15. Testimonial 3: Murugan
    {
      name: 'testimonial-senior.jpg',
      left: Math.round(W * 0.515),
      top: Math.round(H * 0.795),
      width: Math.round(W * 0.055),
      height: Math.round(H * 0.04)
    },
    // 16. Testimonial 4: Arun
    {
      name: 'testimonial-parent.jpg',
      left: Math.round(W * 0.755),
      top: Math.round(H * 0.795),
      width: Math.round(W * 0.055),
      height: Math.round(H * 0.04)
    },
    // 17. Donation CTA Sunset Hands Heart
    {
      name: 'donation-hope.jpg',
      left: Math.round(W * 0.68),
      top: Math.round(H * 0.86),
      width: Math.round(W * 0.30),
      height: Math.round(H * 0.065)
    }
  ];

  for (const crop of crops) {
    try {
      // Ensure crop boundaries stay within the image
      const safeLeft = Math.max(0, Math.min(crop.left, W - 10));
      const safeTop = Math.max(0, Math.min(crop.top, H - 10));
      const safeWidth = Math.min(crop.width, W - safeLeft);
      const safeHeight = Math.min(crop.height, H - safeTop);

      await sharp(refPath)
        .extract({ left: safeLeft, top: safeTop, width: safeWidth, height: safeHeight })
        .jpeg({ quality: 95 })
        .toFile(path.join(outputDir, crop.name));
      console.log(`Extracted: ${crop.name} (${safeWidth}x${safeHeight})`);
    } catch (err) {
      console.error(`Error extracting ${crop.name}:`, err.message);
    }
  }

  console.log('All reference images extracted successfully!');
}

processImages();
