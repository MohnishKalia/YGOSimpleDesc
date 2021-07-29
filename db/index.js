const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

async function main() {
    const sourceDB = await open({
        filename: `${process.cwd()}/db/sdesc.db`,
        driver: sqlite3.Database
    });

    const targetDB = await open({
        filename: `${process.cwd()}/db/cards.cdb`,
        driver: sqlite3.Database
    });

    await targetDB.run('CREATE TABLE IF NOT EXISTS simple_descs (id INTEGER NOT NULL, sdesc TEXT NOT NULL)');
    await targetDB.run('DELETE FROM simple_descs');
    await targetDB.run('CREATE UNIQUE INDEX IF NOT EXISTS UIX_simple_descs ON simple_descs (id, sdesc)');
    const sdescs = await sourceDB.all('SELECT id, sdesc FROM simple_descs');
    for (const { id, sdesc } of sdescs) {
        await targetDB.run('INSERT INTO simple_descs VALUES (?, ?)', id, sdesc);
    }
    await targetDB.run('CREATE UNIQUE INDEX IF NOT EXISTS UIX_datas ON datas (id, type)');
    await targetDB.run('CREATE UNIQUE INDEX IF NOT EXISTS UIX_texts ON texts (id, name, desc)');
    await targetDB.run(`
        CREATE VIEW IF NOT EXISTS snapshot AS
        SELECT d.id, d.type, t.name, t.desc, sd.sdesc FROM datas d
        INNER JOIN texts t
            ON d.id = t.id
        LEFT JOIN simple_descs sd
            ON d.id = sd.id
    `);
}

main();