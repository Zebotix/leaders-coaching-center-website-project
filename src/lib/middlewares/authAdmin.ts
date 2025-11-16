import prisma from '../prisma';
async function authAdmin(userId: string) {
  try {
    const admin = await prisma.user.findUnique({
      where: { id: userId },
    });
    const isSuperAdmin = admin?.email === process.env.ADMIN_EMAIL;
    await prisma.user.update({
      where: { id: userId },
      data: { role: isSuperAdmin ? 'ADMIN' : 'USER' },
    });

    const isAdmin = admin?.role === 'ADMIN' ? admin : false;
    return isAdmin;
  } catch (error) {
    console.log(error);
    return false;
  }
}
