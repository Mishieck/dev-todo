import { writeFileSync } from "node:fs"
import type { Configuration } from "@/objects/file-system";

const config: Configuration = {
  todoListFile: new URL('./todos.json', import.meta.url),
  actionColors: {
    feat: {
      background: 'magenta',
      foreground: 'white'
    },
    fix: {
      background: 'red',
      foreground: 'white'
    }
  }
};

writeFileSync(
  new URL('./config.json', import.meta.url),
  JSON.stringify(config),
  'utf-8'
);
