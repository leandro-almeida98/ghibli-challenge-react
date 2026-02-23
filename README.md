# 🎬 Ghibli Movies

Aplicação web que consome a [API pública do Studio Ghibli](https://ghibliapi.vercel.app) e exibe os filmes do estúdio com filtros avançados, favoritos, anotações pessoais e avaliações por estrelas.

## 🚀 Como rodar

```bash
# Instalar dependências
bun install

# Rodar em desenvolvimento
bun run dev

# Rodar testes
bun run test

# Build de produção
bun run build
```

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| React 18 + TypeScript | Framework principal |
| Vite | Build tool |
| Tailwind CSS v4 | Estilização |
| Zustand + persist | Estado global + localStorage |
| Axios + TanStack Query | Requisições HTTP e cache |
| Framer Motion | Animações |
| Lucide React | Ícones |
| Sonner | Toast notifications |
| Vitest + Testing Library | Testes unitários |


## 🧪 Rodando os testes

```bash
bun run test
```

Os testes cobrem as ações principais do store: `toggleFavorite`, `toggleWatched`, `setAnnotation`, `removeAnnotation` e `toggleTheme`.

## 📁 Estrutura de Pastas

```
src/
├── components/
│   ├── AnnotationModal/   # Modal de anotações e estrelas
│   ├── FilterPanel/       # Painel de filtros e ordenação
│   ├── MovieCard/         # Card do filme + grid
│   ├── SearchBar/         # Busca e toggle de sinopse
│   └── ui/               # Componentes genéricos
├── hooks/
│   ├── useMovies.ts       # Busca via TanStack Query
│   └── useFilteredMovies.ts # Filtragem e ordenação com useMemo
├── services/
│   └── ghibliService.ts   # Axios + API Ghibli
├── store/
│   └── useMovieStore.ts   # Zustand store com persist
├── types/
│   └── movie.ts           # Tipos e interfaces
└── lib/
    └── queryClient.ts     # Configuração do QueryClient
```
