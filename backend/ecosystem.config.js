module.exports = {
  apps: [
    {
      name: 'dnd-backend',
      script: './dist/index.js',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      error_file: './logs/error.log',
      out_file: './logs/output.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      max_memory_restart: '500M',
      autorestart: true,
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',
      listen_timeout: 3000,
      kill_timeout: 5000,
    },
  ],
};
