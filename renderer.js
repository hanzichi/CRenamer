// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const path = require('path')
const fs = require('fs')
const checkes = document.querySelectorAll("[type=checkbox")

checkes.forEach((checkbox, index) => {
  // 根据上次选择来默认当前选择
  let key = 'checkbox' + index 
  let val = localStorage.getItem(key)

  if (typeof val === 'undefined') {
    val = +checkbox.dataset.checked
  }
  
  checkbox.checked = !!+val
  
  checkbox.addEventListener('click', () => {
    localStorage.setItem(key, +checkbox.checked)
  }, false)
})

document.querySelector(".btn-choose-folder").addEventListener("click", () => {
  // 获取用户选项
  const prefix = document.querySelector("#inputPrefix").value.trim()
  const suffix = document.querySelector("#inputSuffix").value.trim()
  const ifDeleteOriginName = checkes[0].checked
  let idx = checkes[1].checked ? 1 : 0
  const isIdxInTheEnd = checkes[2].checked

  const {dialog} = require('electron').remote
  let chosenFolders = dialog.showOpenDialog({
    properties: [
      'openDirectory', 
    ]})

  // 没有成功打开
  if (!chosenFolders) return

  const chosenFolderDir = chosenFolders[0]
  
  // 打开所选择的文件夹目录
  fs.readdir(chosenFolderDir, (err, files) => {  
    // 过滤隐藏文件
    files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))

    // 遍历所选的文件夹内的文件
    files.forEach(filename => {
      // 文件原路径
      let oldPath = path.join(chosenFolderDir, filename)

      const stat = fs.statSync(oldPath)

      // 过滤文件夹
      if (stat.isDirectory()) return 

      let extname = path.extname(filename).toLowerCase()
      let basename = path.basename(filename, extname)

      // 新文件名
      let newname = (isIdxInTheEnd ? '' : idx++) + prefix + (ifDeleteOriginName ? '' : basename) + suffix + (isIdxInTheEnd ? idx++: '') + extname

      // 文件新路径
      let newPath = path.join(chosenFolderDir, newname)

      // 重命名
      fs.renameSync(oldPath, newPath)
    })

    alert('文件名批量修改成功!')
  })
}, false)