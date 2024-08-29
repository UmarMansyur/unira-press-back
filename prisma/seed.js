const prisma = require("../utils/client");
const bcrypt = require('bcrypt');

async function main() {
  await prisma.role.createMany({
    data: [
      { name: 'Administrator' },
      { name: 'Pengguna' },
      { name: 'Desainer' },
      { name: 'Layouter' },
      { name: 'Editor' },
      { name: 'Proofreader' },
    ]
  });

  const user = await prisma.pengguna.create({
    data: {
      username: "Administrator",
      email: "admin@gmail.com",
      password: bcrypt.hashSync('admin', 10),
      nama: "Administrator",
      phone: "081234567890",
      is_simat: false,
      thumbnail: "https://api.unira.ac.id/img/profil/dkr/7104313501_thumb.jpg",
      has_verified_email: true,
      type: 'ADMIN'
    }
  });

  await prisma.userPrivillege.createMany({
    data: [
      { user_id: user.id, role_id: 1 },
      { user_id: user.id, role_id: 3 },
      { user_id: user.id, role_id: 4 },
      { user_id: user.id, role_id: 5 },
    ]
  });

  await prisma.bookCategory.createMany({
    data: [
      { name: 'Novel' },
      { name: 'Komik' },
      { name: 'Ensiklopedia' },
      { name: 'Biografi' },
      { name: 'Fiksi' },
    ]
  });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });