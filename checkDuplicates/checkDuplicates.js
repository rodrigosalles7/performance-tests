const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const readline = require('readline');

// Variável de configuração: TODOS ou VIACAP
const mode = 'VIACAP'; // Altere para 'TODOS' ou 'VIACAP'

// Função para processar linhas de arquivos TXT usando streams
async function* readTextRows(filePath) {
    const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let rowIndex = 0;
    for await (const line of rl) {
        yield { row: line.trim().split(';'), rowIndex: rowIndex++ }; // Dividindo pelo delimitador ';'
    }
}

// Função para processar linhas de arquivos XLSX
function* readXlsxRows(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        yield { row: rows[rowIndex], rowIndex };
    }
}

// Função principal para verificar duplicatas
async function checkDuplicateRows(filePath) {
    const fileExtension = path.extname(filePath).toLowerCase();
    const generator =
        fileExtension === '.txt'
            ? readTextRows(filePath)
            : fileExtension === '.xlsx'
                ? readXlsxRows(filePath)
                : null;

    if (!generator) {
        console.error('Formato de arquivo não suportado. Use .txt ou .xlsx.');
        return;
    }

    const rowMap = new Map();
    const duplicates = [];

    for await (let { row, rowIndex } of generator) {
        const key = mode === 'TODOS' ? JSON.stringify(row) : row[5]; // Sexta coluna é o índice 5 (base 0)
        if (key === undefined) continue; // Ignorar linhas que não têm a sexta coluna

        if (rowMap.has(key)) {
            duplicates.push({
                line: row,
                duplicateRowIndex: rowIndex,
                originalRowIndex: rowMap.get(key),
            });
        } else {
            rowMap.set(key, rowIndex);
        }
    }

    if (duplicates.length > 0) {
        console.log('Linhas duplicadas encontradas:');
        duplicates.forEach(({ line, duplicateRowIndex, originalRowIndex }) => {
            console.log(`Conteúdo: ${line.join(';')}`);
            console.log(`Duplicada na linha ${duplicateRowIndex + 1}, original na linha ${originalRowIndex + 1}\n`);
        });
        console.log(`Total de linhas duplicadas: ${duplicates.length}`);
    } else {
        console.log('Sem linhas duplicadas.');
    }
}

// Testando a função
const filePath = '2952b08b-9309-4bfc-abd2-444d4141b591.txt'; // Substitua pelo caminho do seu arquivo
if (fs.existsSync(filePath)) {
    checkDuplicateRows(filePath);
} else {
    console.error('Arquivo não encontrado:', filePath);
}
