import { promises as fs } from 'node:fs';
import path from 'node:path';

const createMigration = async (migrationName: string) => {
  const timestamp = new Date().getTime();
  const migrationFileName = `${timestamp}_${migrationName}.ts`;
  const migrationFilePath = path.join(__dirname, '/migrations', migrationFileName);

  const migrationFileContent = `import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
}
  
export async function down(db: Kysely<any>): Promise<void> {
}
`;

  await fs.writeFile(migrationFilePath, migrationFileContent);
};

if (!process.env.NAME) {
  console.error('NAME env variable is required');
  process.exit(1);
}

(async () => {
  await createMigration(process.env.NAME as string);
  process.exit(1);
})();
