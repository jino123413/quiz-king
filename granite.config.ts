import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'quiz-king',
  web: {
    host: '0.0.0.0',
    port: 3004,
    commands: {
      dev: 'rsbuild dev --host',
      build: 'rsbuild build',
    },
  },
  permissions: [],
  outdir: 'dist',
  brand: {
    displayName: '상식왕',
    icon: 'https://raw.githubusercontent.com/jino123413/app-logos/master/quiz-king.png',
    primaryColor: '#F59E0B',
    bridgeColorMode: 'basic',
  },
  webViewProps: {
    type: 'partner',
  },
});
