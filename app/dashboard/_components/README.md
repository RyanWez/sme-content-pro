# Dashboard Components

Dashboard အတွက် private components များ။ ဒီ folder ထဲက components တွေက dashboard အတွင်းမှာပဲ သုံးပါတယ်။

## Folder Structure

```
_components/
├── layout/              # Layout-related components
│   ├── DashboardSidebar.tsx    # Desktop sidebar
│   ├── MobileSidebar.tsx       # Mobile sidebar with overlay
│   ├── DashboardHeader.tsx     # Header with toggle buttons
│   └── DashboardContent.tsx    # Content wrapper with loading
├── navigation/          # Navigation-related
│   ├── MenuItems.tsx           # Menu configuration
│   └── NavigationUtils.ts      # Route helpers & constants
└── chat/               # Chat feature
    └── ChatBotWrapper.tsx      # ChatBot with FloatButton
```

## Usage

Components တွေကို main `layout.tsx` ကနေ import လုပ်ပြီး သုံးပါတယ်။

```tsx
import { DashboardSidebar } from './_components/layout/DashboardSidebar';
import { MobileSidebar } from './_components/layout/MobileSidebar';
```

## Notes

- `_components` folder က Next.js private folder ဖြစ်တယ် (routing မဖြစ်ပါ)
- Global components တွေက root level `components/` မှာ ထားပါ
- Dashboard-specific components တွေကိုပဲ ဒီမှာ ထားပါ
