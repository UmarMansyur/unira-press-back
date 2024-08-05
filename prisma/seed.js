const prisma = require("../utils/client");
const bcrypt = require('bcrypt');
async function main() {
  await prisma.$transaction(async (tx) => {
    await tx.admin.create({
      data: {
        username: 'Administrator',
        email: 'admin@unira.com',
        password: bcrypt.hashSync('admin', 10),
        thumbnail: "https://api3.simantappamekasan.com/uploads/default.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    await tx.readerCategory.createMany({
      data: [
        {
          name: 'Annak-Anak',
        },
        {
          name: 'Remaja'
        },
        {
          name: 'Dewasa'
        },
        {
          name: 'Umum'
        }
      ]
    });

    await tx.referenceType.createMany({
      data: [
        {
          name: 'Fiksi'
        },
        {
          name: 'Non-Fiksi'
        }
      ]
    });

    await tx.typeCategory.createMany({
      data: [
        {
          name: 'Terjemahan'
        },
        {
          name: 'Non Terjemahan'
        },
      ]
    });
    
    await tx.media.createMany({
      data: [
        {
          name: 'Buku'
        },
        {
          name: 'Pdf'
        },
        {
          name: 'Epub'
        },
        {
          name: 'Audio Book'
        }
      ]
    });

  });
}

main().then(() => {
  console.log("Seed success");
  process.exit(0);
}).catch((e) => {
  console.error(e);
  process.exit(1);
});