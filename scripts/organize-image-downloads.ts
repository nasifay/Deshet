#!/usr/bin/env tsx
/**
 * Image Download Organizer Script
 * 
 * This script helps organize manual image downloads for the Deshet Medical Center website.
 * It provides:
 * - Checklist of required images
 * - Search query suggestions
 * - File validation
 * - Automatic organization into correct directories
 * - Progress tracking
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface ImageRequirement {
  category: string;
  priority: 'high' | 'medium' | 'low';
  files: {
    name: string;
    description: string;
    minWidth: number;
    minHeight: number;
    format: string[];
    searchQueries: string[];
  }[];
}

const IMAGE_REQUIREMENTS: ImageRequirement[] = [
  {
    category: 'hero',
    priority: 'high',
    files: [
      {
        name: 'hero-landscape.jpg',
        description: 'Traditional Ethiopian medical practitioner or herbal medicine scene (landscape)',
        minWidth: 1920,
        minHeight: 1080,
        format: ['jpg', 'png'],
        searchQueries: [
          'traditional ethiopian medicine',
          'herbal medicine preparation',
          'traditional healing tools',
          'ethiopian medical practitioner',
          'herbal medicine landscape'
        ]
      },
      {
        name: 'hero-left-1.jpg',
        description: 'Herbal plants and botanicals',
        minWidth: 1920,
        minHeight: 1080,
        format: ['jpg', 'png'],
        searchQueries: ['herbal plants', 'medicinal herbs', 'botanical medicine', 'natural healing plants']
      },
      {
        name: 'hero-middle-1.jpg',
        description: 'Traditional healing tools and instruments',
        minWidth: 1920,
        minHeight: 1080,
        format: ['jpg', 'png'],
        searchQueries: ['traditional medicine tools', 'herbal preparation tools', 'mortar pestle medicine']
      },
      {
        name: 'hero-right-1.jpg',
        description: 'Medical center facility or natural wellness imagery',
        minWidth: 1920,
        minHeight: 1080,
        format: ['jpg', 'png'],
        searchQueries: ['medical center', 'wellness center', 'natural medicine clinic', 'herbal medicine center']
      }
    ]
  },
  {
    category: 'about',
    priority: 'high',
    files: [
      {
        name: 'about-1.jpg',
        description: 'Medical center facilities',
        minWidth: 800,
        minHeight: 600,
        format: ['jpg', 'png'],
        searchQueries: ['medical center interior', 'clinic facilities', 'traditional medicine center']
      },
      {
        name: 'about-2.jpg',
        description: 'Traditional healing practices',
        minWidth: 800,
        minHeight: 600,
        format: ['jpg', 'png'],
        searchQueries: ['traditional healing', 'herbal medicine practice', 'traditional therapy']
      },
      {
        name: 'about-3.jpg',
        description: 'Herbal medicine preparation',
        minWidth: 800,
        minHeight: 600,
        format: ['jpg', 'png'],
        searchQueries: ['herbal preparation', 'making herbal medicine', 'herbal medicine making']
      },
      {
        name: 'about-4.jpg',
        description: 'Patient care scenes (with consent)',
        minWidth: 800,
        minHeight: 600,
        format: ['jpg', 'png'],
        searchQueries: ['patient care', 'medical consultation', 'healthcare professional']
      }
    ]
  },
  {
    category: 'services',
    priority: 'high',
    files: [
      {
        name: 'traditional-consultation.jpg',
        description: 'Traditional Medical Consultation',
        minWidth: 1200,
        minHeight: 800,
        format: ['jpg', 'png'],
        searchQueries: ['medical consultation', 'doctor patient', 'traditional medicine consultation']
      },
      {
        name: 'herbal-preparation.jpg',
        description: 'Herbal Medicine Preparation',
        minWidth: 1200,
        minHeight: 800,
        format: ['jpg', 'png'],
        searchQueries: ['herbal medicine preparation', 'making herbal remedies', 'herbal medicine making']
      },
      {
        name: 'detox-therapy.jpg',
        description: 'Detox & Cleansing Therapy',
        minWidth: 1200,
        minHeight: 800,
        format: ['jpg', 'png'],
        searchQueries: ['detox therapy', 'cleansing therapy', 'natural detox', 'wellness therapy']
      },
      {
        name: 'diagnostic-techniques.jpg',
        description: 'Traditional Diagnostic Techniques',
        minWidth: 1200,
        minHeight: 800,
        format: ['jpg', 'png'],
        searchQueries: ['traditional diagnosis', 'alternative medicine diagnosis', 'holistic diagnosis']
      }
    ]
  },
  {
    category: 'products',
    priority: 'medium',
    files: [
      {
        name: 'product-placeholder.png',
        description: 'Herbal product photography (square format)',
        minWidth: 800,
        minHeight: 800,
        format: ['jpg', 'png'],
        searchQueries: ['herbal products', 'natural medicine products', 'herbal supplements']
      }
    ]
  },
  {
    category: 'gallery',
    priority: 'medium',
    files: [
      {
        name: 'facility-1.jpg',
        description: 'Medical center facilities',
        minWidth: 1200,
        minHeight: 800,
        format: ['jpg', 'png'],
        searchQueries: ['medical center', 'clinic interior', 'wellness center']
      },
      {
        name: 'herbal-garden-1.jpg',
        description: 'Herbal garden/plant cultivation',
        minWidth: 1200,
        minHeight: 800,
        format: ['jpg', 'png'],
        searchQueries: ['herbal garden', 'medicinal plants garden', 'herb cultivation']
      }
    ]
  }
];

const BASE_DIR = path.join(process.cwd(), 'public', 'images');
const DOWNLOADS_DIR = path.join(process.cwd(), 'downloads', 'images');

// Create directories if they don't exist
function ensureDirectories() {
  const dirs = [
    BASE_DIR,
    DOWNLOADS_DIR,
    path.join(BASE_DIR, 'hero'),
    path.join(BASE_DIR, 'about'),
    path.join(BASE_DIR, 'services'),
    path.join(BASE_DIR, 'products'),
    path.join(BASE_DIR, 'gallery')
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✓ Created directory: ${dir}`);
    }
  });
}

// Check if image file exists
function fileExists(category: string, filename: string): boolean {
  const filePath = path.join(BASE_DIR, category, filename);
  return fs.existsSync(filePath);
}

// Get image dimensions (requires imagemagick or similar)
function getImageDimensions(filePath: string): { width: number; height: number } | null {
  try {
    // Try using identify from ImageMagick
    const output = execSync(`identify -format "%wx%h" "${filePath}"`, { encoding: 'utf-8' });
    const [width, height] = output.trim().split('x').map(Number);
    return { width, height };
  } catch (error) {
    // Fallback: try to read basic file info
    try {
      const stats = fs.statSync(filePath);
      return null; // Can't determine without imagemagick
    } catch {
      return null;
    }
  }
}

// Validate image file
function validateImage(category: string, filename: string, requirement: ImageRequirement['files'][0]): {
  valid: boolean;
  errors: string[];
} {
  const filePath = path.join(BASE_DIR, category, filename);
  const errors: string[] = [];

  if (!fs.existsSync(filePath)) {
    return { valid: false, errors: ['File does not exist'] };
  }

  const stats = fs.statSync(filePath);
  const ext = path.extname(filename).toLowerCase().slice(1);

  // Check format
  if (!requirement.format.includes(ext)) {
    errors.push(`Invalid format: ${ext}. Expected: ${requirement.format.join(', ')}`);
  }

  // Check file size (should be reasonable, not too small)
  if (stats.size < 10000) {
    errors.push(`File too small: ${stats.size} bytes. May be corrupted or placeholder.`);
  }

  // Try to get dimensions
  const dimensions = getImageDimensions(filePath);
  if (dimensions) {
    if (dimensions.width < requirement.minWidth) {
      errors.push(`Width too small: ${dimensions.width}px. Minimum: ${requirement.minWidth}px`);
    }
    if (dimensions.height < requirement.minHeight) {
      errors.push(`Height too small: ${dimensions.height}px. Minimum: ${requirement.minHeight}px`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Move file from downloads to correct location
function organizeFile(sourcePath: string, category: string, filename: string): boolean {
  const destPath = path.join(BASE_DIR, category, filename);

  try {
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✓ Organized: ${filename} → ${category}/`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`✗ Error organizing ${filename}:`, error);
    return false;
  }
}

// Generate search URLs
function generateSearchUrls(queries: string[]): string[] {
  const baseUrls = {
    pexels: 'https://www.pexels.com/search/',
    unsplash: 'https://unsplash.com/s/photos/',
    pixabay: 'https://pixabay.com/images/search/'
  };

  return queries.flatMap(query => [
    `${baseUrls.pexels}${encodeURIComponent(query)}/`,
    `${baseUrls.unsplash}${encodeURIComponent(query)}`,
    `${baseUrls.pixabay}${encodeURIComponent(query)}/`
  ]);
}

// Print checklist
function printChecklist() {
  console.log('\n📋 IMAGE DOWNLOAD CHECKLIST\n');
  console.log('=' .repeat(80));

  IMAGE_REQUIREMENTS.forEach(req => {
    const priorityEmoji = req.priority === 'high' ? '🔴' : req.priority === 'medium' ? '🟡' : '🟢';
    console.log(`\n${priorityEmoji} ${req.category.toUpperCase()} (${req.priority} priority)`);
    console.log('-'.repeat(80));

    req.files.forEach(file => {
      const exists = fileExists(req.category, file.name);
      const status = exists ? '✓' : '☐';
      console.log(`  ${status} ${file.name}`);
      console.log(`     ${file.description}`);
      console.log(`     Requirements: ${file.minWidth}x${file.minHeight}px, ${file.format.join('/')}`);
      
      if (!exists) {
        console.log(`     Search queries:`);
        file.searchQueries.forEach(query => {
          console.log(`       - "${query}"`);
        });
        console.log(`     URLs:`);
        const urls = generateSearchUrls(file.searchQueries);
        urls.slice(0, 3).forEach(url => {
          console.log(`       ${url}`);
        });
      }
      console.log('');
    });
  });
}

// Print summary
function printSummary() {
  console.log('\n📊 DOWNLOAD PROGRESS SUMMARY\n');
  console.log('='.repeat(80));

  let total = 0;
  let completed = 0;

  IMAGE_REQUIREMENTS.forEach(req => {
    const categoryTotal = req.files.length;
    const categoryCompleted = req.files.filter(f => fileExists(req.category, f.name)).length;
    total += categoryTotal;
    completed += categoryCompleted;

    const percentage = Math.round((categoryCompleted / categoryTotal) * 100);
    const bar = '█'.repeat(Math.floor(percentage / 5)) + '░'.repeat(20 - Math.floor(percentage / 5));
    
    console.log(`${req.category.padEnd(15)} [${bar}] ${percentage}% (${categoryCompleted}/${categoryTotal})`);
  });

  const overallPercentage = Math.round((completed / total) * 100);
  const overallBar = '█'.repeat(Math.floor(overallPercentage / 5)) + '░'.repeat(20 - Math.floor(overallPercentage / 5));
  console.log(`\nOverall Progress: [${overallBar}] ${overallPercentage}% (${completed}/${total} images)`);
}

// Validate all existing images
function validateAll() {
  console.log('\n🔍 VALIDATING EXISTING IMAGES\n');
  console.log('='.repeat(80));

  let validCount = 0;
  let invalidCount = 0;

  IMAGE_REQUIREMENTS.forEach(req => {
    req.files.forEach(file => {
      if (fileExists(req.category, file.name)) {
        const validation = validateImage(req.category, file.name, file);
        if (validation.valid) {
          console.log(`✓ ${req.category}/${file.name} - Valid`);
          validCount++;
        } else {
          console.log(`✗ ${req.category}/${file.name} - Invalid:`);
          validation.errors.forEach(error => console.log(`    - ${error}`));
          invalidCount++;
        }
      }
    });
  });

  console.log(`\nValidation complete: ${validCount} valid, ${invalidCount} invalid`);
}

// Main function
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'checklist';

  ensureDirectories();

  switch (command) {
    case 'checklist':
      printChecklist();
      printSummary();
      break;

    case 'summary':
      printSummary();
      break;

    case 'validate':
      validateAll();
      break;

    case 'organize':
      // Look for files in downloads directory and organize them
      console.log('\n📁 ORGANIZING DOWNLOADED FILES\n');
      console.log('='.repeat(80));
      
      if (!fs.existsSync(DOWNLOADS_DIR)) {
        console.log(`Downloads directory not found: ${DOWNLOADS_DIR}`);
        console.log('Please download images to this directory first.');
        break;
      }

      const downloadedFiles = fs.readdirSync(DOWNLOADS_DIR);
      console.log(`Found ${downloadedFiles.length} files in downloads directory`);
      console.log('\nPlease manually organize files using the following mapping:');
      printChecklist();
      break;

    case 'help':
    default:
      console.log(`
📦 Image Download Organizer

Usage: tsx scripts/organize-image-downloads.ts [command]

Commands:
  checklist  Show complete checklist with search queries (default)
  summary    Show progress summary only
  validate   Validate all existing images
  organize   Help organize downloaded files
  help       Show this help message

Examples:
  tsx scripts/organize-image-downloads.ts checklist
  tsx scripts/organize-image-downloads.ts validate
      `);
      break;
  }
}

main();

