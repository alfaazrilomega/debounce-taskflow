module.exports = {
  apps: [
    {
      name: 'taskflow',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001',
      exec_mode: 'fork',
      env: {
        NODE_OPTIONS: '--dns-result-order=ipv4first'
      }
    }
  ]
}