export const IS_DEV = import.meta.env.MODE === 'development'

<<<<<<< HEAD
export const HOST = IS_DEV ? 'http://127.0.0.1:17746' : '/cgi/ThirdParty/code-editor-hby/index.cgi'
=======
export const HOST = IS_DEV ? 'http://127.0.0.1:17746' : '/cgi/ThirdParty/code.editor/index.cgi'

export const USER_CONFIG_PATH = IS_DEV
  ? '/Users/flex/Downloads/config.json'
  : '/var/apps/code.editor/shares/code.editor/config.json'
>>>>>>> 25d4c12cfda9c74fd4888035a98a65a84bc08ada
