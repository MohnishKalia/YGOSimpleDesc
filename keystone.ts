import { config, list } from '@keystone-next/keystone/schema';
import { integer, text } from '@keystone-next/fields';

// id: integer({ isRequired: true, isUnique: true }),
const datas = list({
    fields: {
        ot: integer(),
        alias: integer(),
        setcode: integer(),
        type: integer(),
        atk: integer(),
        def: integer(),
        level: integer(),
        race: integer(),
        attribute: integer(),
        category: integer(),
    },
});

const texts = list({
    fields: {
        name: text(),
        desc: text(),
        str1: text(),
        str2: text(),
        str3: text(),
        str4: text(),
        str5: text(),
        str6: text(),
        str7: text(),
        str8: text(),
        str9: text(),
        str10: text(),
        str11: text(),
        str12: text(),
        str13: text(),
        str14: text(),
        str15: text(),
        str16: text(),
    },
});

const simple_descs = list({
    fields: {
        sdesc: text({ isRequired: true }),
    },
});

const snapshot = list({
    fields: {
        type: integer(),
        name: text(),
        desc: text(),
        sdesc: text(),
    },
});

export default config({
    db: { provider: 'sqlite', url: 'file:./db/cards.cdb', idField: { kind: 'autoincrement'} },
    experimental: {
        generateNextGraphqlAPI: true,
        generateNodeAPI: true,
    },
    lists: { datas, texts, simple_descs, snapshot },
});
