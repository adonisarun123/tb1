/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_N8N_WEBHOOK_URL: string
  readonly VITE_OPENAI_API_KEY: string
  readonly VITE_PINECONE_API_KEY: string
  readonly VITE_PINECONE_ENVIRONMENT: string
  readonly VITE_PINECONE_INDEX_NAME: string
  readonly PIPEDRIVE_API_TOKEN: string
  readonly PIPEDRIVE_COMPANY_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Image declarations
declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

// For CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
