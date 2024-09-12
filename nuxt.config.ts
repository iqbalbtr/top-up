// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: 'SyamShop',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  modules: ['@nuxt/image', '@pinia/nuxt'],
  runtimeConfig: {
    tripayApiKey: process.env.TRIPAY_API_KEY,
    tripayMerchantCode: process.env.TRIPAY_MERCHANT_CODE,
    tripayPrivateKey: process.env.TRIPAY_PRIVATE_KEY,
    databaseUrl: process.env.DATABASE_URL,
    public: {
      baseUrl: 'http://localhost:3000',
      appName: process.env.APP_NAME,
      appCity: process.env.SHOP_CITY,
      appProvince: process.env.SHOP_PROVINCE,
      appAddress: process.env.SHOP_ADDRESS,
    }
  }
})