import { Command, Option } from 'commander'

function _camelize(str: string): string {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

interface Options {
  [key: string]: any
}
export function _getOptions<T extends Options>(cmd: Command): T {
  const options: Options = {}
  cmd.options.forEach((o: Option) => {
    const key = _camelize(o.long.replace(/^--/, ''))
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      options[key] = cmd[key]
    }
  })
  return options as T
}

export function _import(path: string) {
  return require(path).default
}
