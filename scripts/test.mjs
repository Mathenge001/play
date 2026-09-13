import fs from 'node:fs';import vm from 'node:vm';import {execFileSync} from 'node:child_process';
const js=['js/content.js','js/core.js','js/setup.js','js/live-client.js','js/play.js','js/join.js','js/display.js','js/splash.js','server/live-server.mjs','scripts/build.mjs'];
for(const file of js){execFileSync(process.execPath,['--check',file],{stdio:'inherit'})}
const ctx={window:{},localStorage:{getItem:()=>null,setItem:()=>{}},console};vm.createContext(ctx);vm.runInContext(fs.readFileSync('js/content.js','utf8'),ctx);const c=ctx.window.PARTYPLAY_CONTENT;if(!c||!Array.isArray(c.rounds))throw new Error('Content pack did not load');
const engines=new Set(c.rounds.map(r=>r.engine)),packs=new Set(c.rounds.map(r=>r.pack));for(const e of ['quiz','puzzle','task','social','visual','music','learn'])if(!engines.has(e))throw new Error(`Missing engine ${e}`);for(const p of ['kenya','brainrot','history','geography','science','learn'])if(!packs.has(p))throw new Error(`Missing pack ${p}`);
const ids=c.rounds.map(r=>r.id);if(new Set(ids).size!==ids.length)throw new Error('Duplicate round ids');if(c.rounds.length<70)throw new Error(`Expected at least 70 structured rounds; found ${c.rounds.length}`);
for(const r of c.rounds){if(!r.prompt||!r.engine||!r.pack)throw new Error(`Invalid round ${r.id}`);if(r.requires?.camera&&r.engine!=='task')throw new Error(`Unexpected camera requirement ${r.id}`)}
console.log(`Content OK: ${c.rounds.length} rounds, ${engines.size} engines, ${packs.size} packs.`);
