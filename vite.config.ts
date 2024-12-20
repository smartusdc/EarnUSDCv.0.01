import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // GitHub Pagesを使用する場合はリポジトリ名に応じて設定
})
