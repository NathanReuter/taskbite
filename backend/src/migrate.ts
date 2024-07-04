import 'dotenv/config';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import db from '../src/config/database';

(async () => {
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log(`Migration completed!`);
  process.exit(0);
})();
