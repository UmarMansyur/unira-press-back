const prisma = require("../utils/client");

const create = async () => {
  const result = await prisma.role.create({
    data: {
      name: "Role Test"
    }
  });
  prisma.$disconnect();
  return result;
}

const destroy = async () => {
  await prisma.role.deleteMany({
    where: {
      id: {
        notIn: [1, 2, 3, 4, 5]
      }
    }
  });
  prisma.$disconnect();
}

module.exports = {
  create,
  destroy
}