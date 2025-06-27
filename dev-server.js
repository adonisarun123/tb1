import { createServer } from 'vite';

async function startServer() {
  try {
    const server = await createServer({
      configFile: './vite.config.ts',
      server: {
        port: 4000,
        host: true,
        strictPort: true
      }
    });

    await server.listen();
    server.printUrls();
  } catch (e) {
    console.error('Error starting server:', e);
    process.exit(1);
  }
}

startServer(); 