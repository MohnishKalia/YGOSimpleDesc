const { prompt } = require('enquirer');
const wrap = require('word-wrap');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

async function main() {
    try {
        const db = await open({
            filename: '../prisma/cards.cdb',
            driver: sqlite3.Database
        });

        const cards = await db.all(`
        SELECT d.id, t.name from texts t
        inner join datas d
        on t.id = d.id
        `);

        let flag = true;
        while (flag) {
            console.log('-----------------------------------------------');
            console.log();

            const { cardname } = await prompt({
                type: 'autocomplete',
                name: 'cardname',
                message: 'Select the card to edit the description for',
                limit: 10,
                initial: 2,
                choices: cards.map(option => option.name),
            });
            console.log();

            const card = await db.get(`
            SELECT d.id, t.name, t.desc, t.sdesc from texts t
                inner join datas d
                    on t.id = d.id
                where t.name = ?
            `, cardname);

            console.log('Actual Description:');
            console.log(wrap(card.desc));
            console.log();

            console.log('Simplified Description:');
            console.log(wrap(card.sdesc));
            console.log();

            const { change } = await prompt({
                type: 'confirm',
                name: 'change',
                message: 'Change description?',
            });
            console.log();
            if (!change) return;

            const { newDesc } = await prompt({
                type: 'input',
                name: 'newDesc',
                message: 'New description',
                format: (s) => '\n' + wrap(s),
                initial: card.sdesc ?? '',
            });
            console.log();

            db.run(`UPDATE texts SET sdesc = ? WHERE id = ?`, newDesc, card.id);

            const { cont } = await prompt({
                type: 'confirm',
                name: 'cont',
                message: 'Continue record insertion?',
            });
            console.log();
            flag = cont;
        }

    } catch (error) {
        console.log('Program Ended.');
    }
}

main();
