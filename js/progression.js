const KEY='sv-progress-v2';
const DEFAULT={userId:'',accessLevel:0,discoveredFiles:[],solvedPuzzles:[],unlockedRoutes:[],visitedRooms:[],collectedCodes:[],operationProgress:{setentrional:1},flags:{}};
export function getProgress(){try{return{...DEFAULT,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return{...DEFAULT}}}
export function updateProgress(patch){const next={...getProgress(),...patch};localStorage.setItem(KEY,JSON.stringify(next));return next}
export function discover(path){const p=getProgress();if(!p.discoveredFiles.includes(path))p.discoveredFiles.push(path);localStorage.setItem(KEY,JSON.stringify(p));return p}
export function unlock(path){const p=getProgress();if(!p.unlockedRoutes.includes(path))p.unlockedRoutes.push(path);localStorage.setItem(KEY,JSON.stringify(p));return p}
