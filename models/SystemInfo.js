const os = require("os");
const checkDiskSpace = require('check-disk-space').default

function systemInfo() {
    return new Promise((resolve) => {
        let sysInfo = {
            osType: os.type(),
            cpuArc: os.arch(),
            cpuName: os.cpus()[0].model,
            cpuCount: os.cpus().length,
            ram: os.totalmem() / 1000000000, // in GB
            homeDir: os.homedir(),
            tmpDir: os.tmpdir(),
            totalDiskSpace: null,
            freeDiskSpace: null,
            diskPath: null
        }

        checkDiskSpace(os.homedir()).then((diskSpace) => {
            sysInfo = {
                ...sysInfo,
                totalDiskSpace: diskSpace.size / 1000000000, // in GB,
                freeDiskSpace: diskSpace.free / 1000000000, // in GB,
                diskPath: diskSpace.diskPath
            }

            resolve(sysInfo);
        })

    })
}

module.exports = {
    systemInfo: systemInfo
};
