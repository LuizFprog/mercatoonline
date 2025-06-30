// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import csv = require('csv-parser');

const prisma = new PrismaClient();

// Função genérica para ler um arquivo CSV e retornar os dados como um array
async function readCSV<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

async function main() {
  console.log(`Iniciando o povoamento (seeding)...`);

  // --- 1. Povoar Estados ---
  console.log('Populando a tabela de Estados...');
  const statesPath = path.join(__dirname, 'data', 'estados.csv');
  const statesData = await readCSV<{ COD: string; NOME: string; SIGLA: string }>(statesPath);

  const statesToCreate = statesData.map((state) => ({
    id: parseInt(state.COD, 10), // Usa o COD do CSV como ID
    name: state.NOME,
    uf: state.SIGLA,
  }));

  // Usa createMany para inserir todos de uma vez, ignorando duplicatas
  await prisma.state.createMany({
    data: statesToCreate,
    skipDuplicates: true,
  });
  console.log(`${statesToCreate.length} estados processados.`);


  // --- 2. Povoar Cidades ---
  console.log('Populando a tabela de Cidades...');
  const citiesPath = path.join(__dirname, 'data', 'municipios.csv');
  // Nota: o nome da coluna no CSV é "COD UF" com espaço
  const citiesData = await readCSV<{ 'COD UF': string; COD: string; NOME: string }>(citiesPath);

  const citiesToCreate = citiesData.map((city) => ({
    id: parseInt(city.COD, 10), // Usa o COD do CSV como ID 
    name: city.NOME,
    stateId: parseInt(city['COD UF'], 10), // Link para o ID do estado
  }));

  await prisma.city.createMany({
    data: citiesToCreate,
    skipDuplicates: true,
  });
  console.log(`${citiesToCreate.length} cidades processadas.`);


  console.log(`Povoamento (seeding) finalizado com sucesso.`);
}

main()
  .catch((e) => {
    console.error('Ocorreu um erro durante o processo de seeding:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
