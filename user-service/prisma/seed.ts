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
  console.log(`Iniciando o povoamento (seeding) para user-service...`);
  const dataPath = path.join(process.cwd(), 'prisma', 'data');

  try {
    console.log('--- Processando Estados ---');
    const statesPath = path.join(dataPath, 'estados.csv');
    const statesData = await readCSV<{ COD: string; NOME: string; SIGLA: string }>(statesPath);
    if (statesData.length > 0) {
      const statesToCreate = statesData.map((state) => ({ id: parseInt(state.COD, 10), name: state.NOME, uf: state.SIGLA }));
      const result = await prisma.state.createMany({ data: statesToCreate, skipDuplicates: true });
      console.log(`${result.count} estados foram inseridos.`);
    }
  } catch (error) { console.error('ERRO ao processar os estados:', error); throw error; }

  try {
    console.log('\n--- Processando Cidades ---');
    const citiesPath = path.join(dataPath, 'cidades.csv');
    const citiesData = await readCSV<{ 'COD UF': string; COD: string; NOME: string }>(citiesPath);
    if (citiesData.length > 0) {
      const citiesToCreate = citiesData.map((city) => ({ id: parseInt(city.COD, 10), name: city.NOME, stateId: parseInt(city['COD UF'], 10) }));
      const result = await prisma.city.createMany({ data: citiesToCreate, skipDuplicates: true });
      console.log(`${result.count} cidades foram inseridas.`);
    }
  } catch (error) { console.error('ERRO ao processar as cidades:', error); throw error; }

  console.log(`\nPovoamento (seeding) do user-service finalizado com sucesso.`);
}

main().catch((e) => {
  console.error('\nO processo de seeding do user-service falhou:', e);
  process.exit(1);
}).finally(async () => { await prisma.$disconnect(); });