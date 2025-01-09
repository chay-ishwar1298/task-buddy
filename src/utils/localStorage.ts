import CryptoJS from 'crypto-js'
import { envConfig } from '../config'

/**
 * Adds encrypted data to the local storage
 * @template T
 * @param {T} input - The data to be encrypted and stored.
 * @returns {void}
 */
export const addUserToLocalStorage = <T>(input: T): void => {
	const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(input), envConfig.keys.localStorageKey).toString()
	localStorage.setItem('adminUser', encryptedData)
}

/**
 * Removes data stored under the key 'adminUser' from the local storage.
 * @returns {void}
 */
export const removeUserFromLocalStorage = (): void => {
	localStorage.removeItem('adminUser')
}

/**
 * Retrieves and decrypts data stored under the key 'adminUser' from the local storage.
 * @template T
 * @returns {T | null} - The decrypted data if available, otherwise null.
 */
export const getUserFromLocalStorage = <T>(): T | null => {
	try {
		const storedData = localStorage.getItem('adminUser')

		if (storedData) {
			// Decrypt stored data
			const bytes = CryptoJS.AES.decrypt(storedData, envConfig.keys.localStorageKey)
			const decryptedData = bytes.toString(CryptoJS.enc.Utf8)

			if (!decryptedData) {
				return null
			}

			return JSON.parse(decryptedData) as T
		}

		return null
	} catch (error) {
		return null
	}
}
