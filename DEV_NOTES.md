# Nostalgia Demo Dev Notes

## Project Goal

Build a minimal React Native / Expo demo for a nostalgia memory app.

The demo should prove this core flow:

```text
write text memory
choose unlock time
seal / lock memory
wait until unlock time
open from archive
add reflection or comment
```

## Current Scope

Version 0 should stay small:

- React Native with Expo
- TypeScript
- text memories only
- local state first
- local storage later
- no backend
- no login
- no cloud sync
- no media upload
- no AI features

## Development Commands

Install dependencies after cloning or pulling new package changes:

```cmd
npm install
```

Start the Expo development server:

```cmd
npx expo start
```

Useful Expo options after the server starts:

```text
w = open web preview
a = open Android emulator
scan QR code = open on phone with Expo Go
```

On Windows, if PowerShell blocks `npm` or `npx`, use Command Prompt in VS Code,
or run:

```powershell
npx.cmd expo start
```

## Git Sync Workflow

Before moving from desktop to laptop:

```cmd
git status
git add .
git commit -m "Describe what changed"
git push
```

On the laptop:

```cmd
git clone <repo-url>
cd nostalgia-demo
npm install
npx expo start
```

After the laptop already has the repo:

```cmd
git pull
npm install
npx expo start
```

Run `npm install` after pulling when `package.json` or `package-lock.json`
changed.

## Learning Plan

Build the app one small concept at a time:

1. Create the first screen with a text input.
2. Store typed text in React state.
3. Seal one memory.
4. Add unlock time options.
5. Calculate whether a memory is locked or unlocked from timestamps.
6. Show memories in an archive list.
7. Open one memory in detail view.
8. Add and save a reflection.
9. Move from temporary state to local device storage.

## Data Model Draft

```ts
type Memory = {
  id: string;
  text: string;
  createdAt: number;
  unlockAt: number;
  reflection?: string;
  reflectedAt?: number;
};
```

The app does not need to store `isLocked`.

Instead, calculate it when rendering:

```ts
const isLocked = Date.now() < memory.unlockAt;
```

## Tutor Rule

Do not build the whole app in one shot.

For each step:

1. Explain the new concept.
2. Make a small code change.
3. Run or inspect the result.
4. Fix errors before moving on.
