import { readFileSync } from 'fs';

// Input logic
const TEST_LINES = readFileSync('test.in', 'utf-8').split('\r\n');
const INPUT_LINES = readFileSync('input.in', 'utf-8').split('\r\n');


// Solution logic

const isCommand = (line) => line.startsWith('$');
const isCd = (line) => line.startsWith('$ cd');
const isLs = (line) => line.startsWith('$ ls');
const isDir = (line) => line.startsWith('dir ');

const createDir = (name, parent) => {
    return {
        name,
        files: [],
        dirs: [],
        parent: parent,
    };
};

const buildTree = (lines) => {
    const listedDirectoriesSet = new Set();
    const headNode = createDir('', undefined);
    let currentDir = headNode;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (isCd(line)) {
            const dirName = line.split('$ cd ')[1];

            if (dirName === '..') {
                currentDir = currentDir.parent;
            } else {
                const maybeAlreadyDir = currentDir.dirs.find(({ name }) => name === dirName);
                if (maybeAlreadyDir === undefined) {
                    let tempNode = createDir(dirName, currentDir);
                    currentDir.dirs.push(tempNode);
                    currentDir = tempNode;
                } else {
                    console.log(`Would add directory ${maybeAlreadyDir.name} but already part of ${currentDir.name} dirs`);
                    currentDir = maybeAlreadyDir;
                }
            }
        } else if (isLs(line)) {
            let j = i + 1;
            let outputLine = lines[j];
            while (outputLine !== undefined && !isCommand(outputLine)) {
                if (!isDir(outputLine)) {
                    const [fileSize, fileName] = outputLine.split(' ');
                    currentDir.files.push({ name: fileName, size: +fileSize });
                }

                j = j + 1;
                outputLine = lines[j];
            }
            listedDirectoriesSet.add(currentDir.name);
        }
    }

    return headNode;
};

let dirWithSizeMap = new Map();

const getDirSize = (dir) => {
    const { name, files, dirs } = dir;

    const filesSizesSum = files.reduce((previous, { size: fileSize }) => previous + fileSize, 0);
    const dirSizesSum = dirs.reduce((previous, innerDir) => previous + getDirSize(innerDir), 0);

    const totalSize = filesSizesSum + dirSizesSum;

    // there can be directories with the same name but different paths
    if (dirWithSizeMap.has(name)) {
        const existingValues = dirWithSizeMap.get(name);
        dirWithSizeMap.set(name, [...existingValues, totalSize]);
    } else {
        dirWithSizeMap.set(name, [totalSize]);
    }

    return totalSize;
};

const getDirsWithSize = (treeHead) => {
    getDirSize(treeHead);

    const directoriesWithSize = [];

    for (const [dirName, dirSizes] of dirWithSizeMap) {
        for (const dirSize of dirSizes) {
            directoriesWithSize.push({ name: dirName, size: dirSize });
        }
    }

    return directoriesWithSize;
};

const printDir = (directory, indentation) => {
    const { name, files, dirs } = directory;
    const tab = ' '.repeat(indentation);
    const innerTab = ' '.repeat(indentation + 4);

    console.log(`${tab} - ${name}`);

    files.forEach(file => {
        const { name, size } = file;
        console.log(`${innerTab} - ${name} (file, size=${size})`);
    });

    dirs.forEach(dir => {
        printDir(dir, indentation + 4);
    });
};

const FIRST_PART_TRESHOLD = 100_000;
const firstPart = (allReadings) => {
    const treeHead = buildTree(allReadings);

    //printDir(treeHead, 0);
    const dirsWithSize = getDirsWithSize(treeHead);
    //console.log({dirsWithSize});
    const filteredDirs = dirsWithSize
        .filter(({ size }) => size <= FIRST_PART_TRESHOLD);
    //console.log({filteredDirs});

    const totalSize = filteredDirs
        .reduce((previous, { size }) => previous + size, 0);

    console.log({totalSize});
};

const TOTAL_DISK_SIZE = 70_000_000;
const MIN_UNUSED = 30_000_000
const secondPart = (allReadings) => {
    dirWithSizeMap.clear();
    const treeHead = buildTree(allReadings);

    const dirsWithSize = getDirsWithSize(treeHead);

    const outermostDirSize = dirsWithSize.reduce((previous, { size }) => previous > size ? previous : size, 0);

    const freeSpace = TOTAL_DISK_SIZE - outermostDirSize;

    const deletableDirs = dirsWithSize
        .filter(({ size }) => freeSpace + size >= MIN_UNUSED)
        .filter(({ name }) => name !== '');

    const smallestDeletableSize = deletableDirs
        .reduce((previous, { size }) => previous < size ? previous : size, 30_000_000);
    console.log({smallestDeletableSize});
};


// Call solution
firstPart(INPUT_LINES);
secondPart(INPUT_LINES);