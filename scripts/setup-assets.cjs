const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'src', 'assets', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const brainDir = 'C:\\Users\\admin\\.gemini\\antigravity-ide\\brain\\addd6ce0-93fd-4842-89e6-1d08134ed9f0';

// Copy locally generated AI images
const localFiles = [
  { src: path.join(brainDir, 'hero_children_1790500923568.jpg'), dest: 'hero-children.jpg' },
  { src: path.join(brainDir, 'gov_students_1790500962659.jpg'), dest: 'government-school-students.jpg' },
  { src: path.join(brainDir, 'school_needs_1790501026161.jpg'), dest: 'government-school-needs.jpg' },
  { src: path.join(brainDir, 'cancer_support_1790501107307.jpg'), dest: 'cancer-patient-support.jpg' },
  { src: path.join(brainDir, '.user_uploaded', 'media_1790500744010.jpg'), dest: 'reference-mockup.jpg' }
];

localFiles.forEach(item => {
  if (fs.existsSync(item.src)) {
    fs.copyFileSync(item.src, path.join(targetDir, item.dest));
    console.log(`Copied ${item.dest}`);
  }
});

// High quality curated photorealistic assets matching exact reference subjects
const remoteImages = [
  {
    url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80', // Red ribbon / compassionate awareness
    dest: 'aids-support.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', // Dignified smiling elder/senior
    dest: 'senior-citizen-support.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80', // School boy with backpack in golden hour
    dest: 'impact-children.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80', // Student studying
    dest: 'story-education.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80', // Healthcare support
    dest: 'story-healthcare.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80', // Children / community
    dest: 'story-community.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=600&q=80', // Senior care
    dest: 'story-senior-care.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80', // Hands holding young growing plant in soil
    dest: 'plant-growth-hands.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', // Testimonial Priya student
    dest: 'testimonial-student.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', // Testimonial Ramesh patient
    dest: 'testimonial-patient.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', // Testimonial Murugan senior
    dest: 'testimonial-senior.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80', // Testimonial Arun student
    dest: 'testimonial-parent.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1600&q=80', // Hands heart sunset
    dest: 'donation-hope.jpg'
  }
];

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, destPath).then(resolve).catch(reject);
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${destPath}`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${url}:`, err.message);
      reject(err);
    });
  });
}

(async () => {
  for (const img of remoteImages) {
    const destPath = path.join(targetDir, img.dest);
    try {
      await download(img.url, destPath);
    } catch (e) {
      console.error(`Failed ${img.dest}:`, e);
    }
  }
  console.log('All image assets prepared successfully!');
})();
