const fs = require('fs')
const getSqlContentMap = require('./get-sql-content-map')
const db = require('../db')

// 打印脚本执行日志
const eventLog = function (err, sqlFile, index) {
  if (err) {
    console.log(
      `[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败 o(╯□╰)o ！`
    )
  } else {
    console.log(
      `[SUCCESS] sql脚本文件: ${sqlFile} 第${
        index + 1
      }条脚本 执行成功 O(∩_∩)O !`
    )
  }
}

// 获取所有sql脚本内容
let sqlContentMap = getSqlContentMap()

// 执行建表sql脚本
const createAllTables = async () => {
  for (let key in sqlContentMap) {
    let sqlShell = sqlContentMap[key]
    let sqlShellList = sqlShell.split(';')

    for (let [i, shell] of sqlShellList.entries()) {
      if (shell.trim()) {
        console.log('shell', shell)

        let result = await db.query(shell)
        if (result.serverStatus * 1 === 2) {
          eventLog(null, key, i)
        } else {
          eventLog(true, key, i)
        }
      }
    }
  }
  console.log('sql脚本执行结束！')
  console.log('请按 ctrl + c 键退出！')
}

// module.exports = createAllTables
