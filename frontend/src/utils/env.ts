export const IS_DEV = import.meta.env.MODE === 'development'

export const HOST = IS_DEV ? 'http://127.0.0.1:17746' : '/cgi/ThirdParty/code-editor-hby/index.cgi'

export const APP_DIR_PATH = IS_DEV ? '/Users/flex/Downloads' : '/var/apps/code-editor-hby/shares/code-editor-hby'

export const USER_CONFIG_PATH = IS_DEV
  ? '/Users/flex/Downloads/config.json'
  : '/var/apps/code-editor-hby/shares/code-editor-hby/config.json'
