# ChatBot Feature

AI Assistant ChatBot component - Refactored for maintainability and scalability.

## 📁 Folder Structure

```
ChatBot/
├── index.tsx                        # Export wrapper
├── ChatBotContainer.tsx             # Main container component
├── components/                      # UI Components
│   ├── ChatBotHeader.tsx           # Header with close button & swipe indicator
│   ├── ChatBotMessages.tsx         # Messages list container
│   ├── ChatBotMessage.tsx          # Single message bubble component
│   ├── ChatBotInput.tsx            # Input area with send button
│   └── ChatBotBackdrop.tsx         # Backdrop overlay
├── hooks/                           # Custom hooks
│   ├── useChatBotState.ts          # State management (input, visibility)
│   ├── useChatBotGestures.ts       # Touch gestures (swipe to close)
│   └── useChatBotScroll.ts         # Auto-scroll to bottom logic
├── styles/                          # Styles
│   ├── chatbot.styles.tsx          # Base card & backdrop styles
│   ├── responsive.styles.tsx       # Responsive media queries
│   ├── animations.styles.tsx       # Animations & keyframes
│   └── markdown.styles.tsx         # Markdown rendering styles
└── utils/                           # Utilities
    └── constants.ts                 # Constants & configurations
```

## 🎯 Usage

```tsx
import ChatBot from '@/components/features/ChatBot';

<ChatBot onClose={() => setChatOpen(false)} />
```

## 🔧 Components

### ChatBotContainer
Main container that orchestrates all sub-components and hooks.

### ChatBotHeader
- AI Assistant title with avatar
- Close button
- Swipe indicator (mobile only)
- Touch gesture handlers

### ChatBotMessages
- Messages list container
- Maps through messages array
- Auto-scroll reference

### ChatBotMessage
- Single message bubble
- User/Bot avatar
- Markdown rendering for bot messages
- Thinking dots animation

### ChatBotInput
- Textarea with auto-resize
- Send button
- Enter key handler
- Loading state

### ChatBotBackdrop
- Overlay background
- Click to close

## 🪝 Hooks

### useChatBotState
- `inputValue` - Input field value
- `isVisible` - Animation visibility state
- Body scroll prevention

### useChatBotScroll
- Auto-scroll to bottom on new messages
- Debounced for performance
- `messagesEndRef` - Scroll target reference

### useChatBotGestures
- Touch start/move/end handlers
- Swipe down to close (mobile)
- Visual feedback during swipe

## 🎨 Styles

### chatbot.styles.tsx
- Base card positioning & sizing
- Backdrop overlay
- Swipe indicator
- Visibility animations

### responsive.styles.tsx
- Desktop: 450px × 550px
- Laptop: 400px × 500px
- Tablet: 380px × 480px
- Mobile: Full screen with safe areas
- Touch-friendly targets

### animations.styles.tsx
- Slide-in animation for messages
- Thinking dots animation
- GPU acceleration
- Reduced motion support

### markdown.styles.tsx
- Text formatting (bold, italic, code)
- Lists (bullets, numbers)
- Headers (h1, h2, h3)
- Tables with horizontal scroll
- Myanmar text support

## 📝 Constants

```ts
SWIPE_THRESHOLD = 100        // px to trigger close
SCROLL_DEBOUNCE = 100        // ms delay for scroll
CLOSE_ANIMATION_DELAY = 300  // ms before unmount
AVATAR_SIZES = { default: 40, small: 36, xsmall: 32 }
```

## ✨ Features

- ✅ Responsive design (Desktop → Mobile)
- ✅ Touch gestures (swipe to close)
- ✅ Markdown rendering
- ✅ Myanmar text support
- ✅ Auto-scroll to bottom
- ✅ Thinking dots animation
- ✅ Keyboard shortcuts (Enter to send)
- ✅ Loading states
- ✅ Accessibility (ARIA labels)
- ✅ Performance optimized

## 🔄 Migration from Old ChatBot.tsx

Old file (842 lines) → New structure (9 files, ~100 lines each)

Benefits:
- Easier to maintain
- Reusable components
- Testable hooks
- Clear separation of concerns
- Better code organization
