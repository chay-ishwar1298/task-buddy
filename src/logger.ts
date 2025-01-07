import {envConfig} from './config'

/** Log levels */
export type LogLevel = 'log' | 'warn' | 'error' | null

/** Signature of a logging function */
export interface LogFn {
	(message?: unknown, ...optionalParams: unknown[]): void
}

/** Basic logger interface */
export interface Logger {
	log: LogFn
	warn: LogFn
	error: LogFn
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NO_OP: LogFn = () => {}

/** Logger which outputs to the browser console */
export class ConsoleLogger implements Logger {
	readonly log: LogFn
	readonly warn: LogFn
	readonly error: LogFn

	constructor(options?: { level?: LogLevel }) {
		const { level } = options || {}

		if (level === null) {
			this.warn = NO_OP
			this.log = NO_OP
			this.error = NO_OP
			return
		}
		// eslint-disable-next-line no-console
		this.error = console.error.bind(console)

		if (level === 'error') {
			this.warn = NO_OP
			this.log = NO_OP

			return
		}

		// eslint-disable-next-line no-console
		this.warn = console.warn.bind(console)

		if (level === 'warn') {
			this.log = NO_OP

			return
		}

		// eslint-disable-next-line no-console
		this.log = console.log.bind(console)
	}
}

const LOG_Level = envConfig.app.environment === 'development' ? 'log' : null
// Example usage
export const logger = new ConsoleLogger({ level: LOG_Level })
