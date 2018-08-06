安装 node 6.14.3
npm install gulp -g
npm install -g cross-env
npm install -g remotedev-server

android :
修改package.json
"scripts": {
    "dev": "npm run remote-dev-server && cross-env NODE_ENV=development gulp dev",
    "release": "cross-env NODE_ENV=production gulp build",
    "remote-dev-server": "remotedev --hostname=localhost --port=5678"
  }

ios :
修改package.json
"scripts": {
    "dev": "npm run remote-dev-server && NODE_ENV=development gulp dev",
    "release": "NODE_ENV=production gulp build",
    "remote-dev-server": "remotedev --hostname=localhost --port=5678"
  }