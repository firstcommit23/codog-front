module.exports = {
  apps: [
    {
      name: 'codog-front',
      script: './node_modules/next/dist/bin/next',
      // script: 'npm',
      args: 'start',
      exec_mode: 'cluster',
      autorestart: true,
      instances: 0,
      listen_timeout: 50000,
      kill_timeout: 5000,
    },
  ],
};
