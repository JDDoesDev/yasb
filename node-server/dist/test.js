import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});
const results = async () => {
    const resultSet = await prisma.user.findUnique({
        where: {
            userName: "testuser",
        },
    });
    return resultSet;
};
results()
  .then(
    (result) => {
      return result.userName
    }
  )
  .then(
    console.log
  )
export default results;
