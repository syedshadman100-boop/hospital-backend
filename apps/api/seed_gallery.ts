import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const galleryImages = [
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/pic.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/08/WhatsApp-Image-2024-07-27-at-13.27.41_f032e903.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal1b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal2b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal3b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal4b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal5b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal6b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal7b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal8b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal10b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal11b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal12b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal13b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal14b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal16b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal17b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal18b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal19b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal20b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal23b.jpg",
  "https://www.agraheartcentre.com/wp-content/uploads/2024/07/gal9b.jpg"
];

async function main() {
  console.log('Clearing existing gallery...');
  await prisma.gallery.deleteMany();
  
  console.log('Seeding new gallery images from live site...');
  for (let i = 0; i < galleryImages.length; i++) {
    await prisma.gallery.create({
      data: {
        fileUrl: galleryImages[i],
        fileType: 'image',
        category: 'Hospital',
        sortOrder: i,
        isActive: true,
        title: `Agra Heart Centre Gallery Image ${i + 1}`
      }
    });
  }
  
  console.log('Successfully seeded gallery!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
