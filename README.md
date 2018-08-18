# CRenamer

## Dev

```bash
# Go into the repository
cd CRenamer
# Install dependencies
npm install
# Run the app
npm start
```

# Pack

> On my Macbook Pro

```bash
# Install electron-packager globally
npm install electron-packager -g

# OSX 
electron-packager . 'CRenamer'  --out ../CRenamer-APP --icon='./icon/icon.icns' --ignore=node_modules 

# Windows 64bit
brew cask install xquartz
brew install wine
electron-packager . 'CRenamer'  --out ../CRenamer-APP --platform=win32 --arch=x64 --icon='./icon/icon.ico' --ignore=node_modules --overwrite
```

# Preview

![](https://images2018.cnblogs.com/blog/675542/201808/675542-20180818215350183-304478321.gif)

# License

MIT