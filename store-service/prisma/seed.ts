import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser'; 

const prisma = new PrismaClient();

async function readCSV<T>(filePath: string): Promise<T[]> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo não encontrado no caminho: ${filePath}`);
  }
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(filePath).pipe(csv()).on('data', (data) => results.push(data)).on('end', () => resolve(results)).on('error', (error) => reject(error));
  });
}

async function main() {
  console.log(`Iniciando o povoamento (seeding) para store-service...`);
  const dataPath = path.join(process.cwd(), 'prisma', 'data');

  try {
    console.log('--- Processando Estados (Store Service) ---');
    const statesPath = path.join(dataPath, 'estados.csv');
    const statesData = await readCSV<{ COD: string; NOME: string; SIGLA: string }>(statesPath);
    if (statesData.length > 0) {
      const statesToCreate = statesData.map((s) => ({ id: parseInt(s.COD), name: s.NOME, uf: s.SIGLA }));
      await prisma.state.createMany({ data: statesToCreate, skipDuplicates: true });
      console.log(`${statesData.length} estados processados para store-service.`);
    }
  } catch (e) { console.error('ERRO ao processar estados no store-service:', e); throw e; }

  try {
    console.log('\n--- Processando Cidades (Store Service) ---');
    const citiesPath = path.join(dataPath, 'cidades.csv');
    const citiesData = await readCSV<{ 'COD UF': string; COD: string; NOME: string }>(citiesPath);
    if (citiesData.length > 0) {
      const citiesToCreate = citiesData.map((c) => ({ id: parseInt(c.COD), name: c.NOME, stateId: parseInt(c['COD UF']) }));
      await prisma.city.createMany({ data: citiesToCreate, skipDuplicates: true });
      console.log(`${citiesData.length} cidades processadas para store-service.`);
    }
  } catch (e) { console.error('ERRO ao processar cidades no store-service:', e); throw e; }

  console.log(`\nPovoamento (seeding) do store-service finalizado com sucesso.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => { await prisma.$disconnect(); });