src/
├── app/
│   ├── (web)/                                      # Layer - Next.js routing (route group)
│   │   ├── page.tsx                                # Root page
│   │   ├── layout.tsx                              # Root layout
│   │   ├── not-found.tsx                           # 404 page (Optional)
│   │   ├── error.tsx                               # Error boundary (Optional)
│   │   ├── loading.tsx                             # Loading UI (Optional)
│   │   ├── page-name/                              # Nested routes
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx                          # (Optional)
│   │   │   └── loading.tsx                         # (Optional)
│   │   └── api/                                    # API routes (Optional)
│   │       └── [...route]/                         # Catch-all API route
│   │           └── route.ts
│   ├── modules/                                    # Layer - Main business logic 
│   │   ├── module-name/                            # Slice
│   │   │   ├── elements/                           # Segment (Optional) - Custom elements
│   │   │   │   ├── element-name.component.tsx
│   │   │   │   ├── ...
│   │   │   │   └── index.ts
│   │   │   ├── module-name.module.tsx
│   │   │   ├── module-name.service.ts              # Segment (Optional)
│   │   │   ├── module-name.store.ts                # Segment (Optional) 
│   │   │   ├── module-name.constant.ts             # Segment (Optional)
│   │   │   ├── module-name.interface.ts            # Segment (Optional)
│   │   │   └── index.ts
│   │   └── ...
│   ├── widgets/                                    # Layer - Self-sufficient parts of functionality or interface
│   │   ├── widget-name/                            # Slice
│   │   │   ├── elements/                           # Segment (Optional) - Custom elements    
│   │   │   │   ├── element-name.component.tsx
│   │   │   │   ├── ... 
│   │   │   │   └── index.ts                            
│   │   │   ├── widget-name.component.tsx
│   │   │   ├── widget-name.service.ts              # Segment (Optional)
│   │   │   ├── widget-name.store.ts                # Segment (Optional) 
│   │   │   ├── widget-name.constant.ts             # Segment (Optional)
│   │   │   ├── widget-name.interface.ts            # Segment (Optional)
│   │   │   └── index.ts
│   │   └── ...
│   ├── features/                                   # Layer - Reusable implementations 
│   │   ├── feature-name/                           # Slice
│   │   │   ├── feature-name.component.tsx
│   │   │   ├── feature-name.service.ts             # Segment (Optional)
│   │   │   ├── feature-name.constant.ts            # Segment (Optional)
│   │   │   ├── feature-name.interface.ts           # Segment (Optional)
│   │   │   └── index.ts
│   │   └── ...
│   ├── entities/                                   # Layer - Business entities 
│   │   ├── api/                                    # Slice
│   │   │   ├── api-name/                           # Segment
│   │   │   │   ├── api-name.api.ts
│   │   │   │   ├── api-name.query.ts
│   │   │   │   ├── api-name.mutation.ts
│   │   │   │   └── index.ts
│   │   │   ├── ...
│   │   │   └── index.ts
│   │   └── models/                                 # Slice
│   │       ├── model-name.model.ts
│   │       ├── ...
│   │       └── index.ts
│   └── shared/                                     # Layer - Reusable code
│       ├── ui/                                     # Segment
│       │   ├── ui-name/                                
│       │   │   ├── ui-name.component.tsx
│       │   │   └── index.ts  
│       │   ├── ...
│       │   └── index.ts
│       ├── hooks/                                  # Segment
│       │   ├── hook-name.hook.tsx
│       │   ├── ...
│       │   └── index.ts
│       ├── store/                                  # Segment
│       │   ├── store-name.store.ts
│       │   ├── ...
│       │   └── index.ts
│       ├── interfaces/                             # Segment
│       │   ├── interface-name.interface.ts
│       │   ├── ...
│       │   └── index.ts
│       └── assets/                                 # Segment
│           ├── icon/
│           │   ├── logo.svg
│           │   ├── ...
│           │   └── index.ts
│           ├── ...
│           └── index.ts
├── config/                                         # Application configuration
│   ├── env/                                        # Segment - Environment variables
│   │   ├── env.client.ts                           # Client-side env variables
│   │   ├── env.server.ts                           # Server-side env variables
│   │   └── index.ts
│   ├── fonts/                                      # Segment - Font configuration
│   │   ├── font.ts
│   │   └── index.ts
│   └── styles/                                     # Segment - Global styles
│       └── global.css
└── pkg/                                            # External packages/utilities
    └── index.ts

    __tests__/
├── unit/
│   ├── components/
│   ├── services/
│   └── hooks/
├── integration/
│   ├── pages/
│   └── api/
└── e2e/
    └── flows/