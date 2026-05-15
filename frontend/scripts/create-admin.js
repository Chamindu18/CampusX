#!/usr/bin/env node
/**
 * Create or promote a user to ADMIN.
 * Usage:
 *   node scripts/create-admin.js email password "Full Name"
 */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] || 'admin@campusx.test';
  const password = process.argv[3] || 'ChangeMe123!';
  const name = process.argv[4] || 'CampusX Admin';

  try {
    const hashed = await bcrypt.hash(password, 10);

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      await prisma.user.update({
        where: { email },
        data: {
          name,
          password: hashed,
          role: 'ADMIN',
        },
      });

      console.log(`Promoted existing user to ADMIN: ${email}`);
    } else {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashed,
          role: 'ADMIN',
        },
      });

      console.log(`Created ADMIN user: ${user.email}`);
    }
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
