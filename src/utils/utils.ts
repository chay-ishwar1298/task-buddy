import { logger } from '../logger'
import { jwtDecode } from 'jwt-decode'
import CryptoJS from 'crypto-js'

export type AnyData = any
export type CustomJSONObject<T = AnyData> = Record<string, T>

// Interface for JWT payload
export interface JwtPayload {
	exp: number // Expiration time in seconds (UNIX timestamp)
	iat?: number // Issued at time
	// Add other claims if needed (like sub, aud, etc.)
}
// Function to check if JWT is expired
export const isTokenExpired = (token: string): boolean => {
	try {
		const decoded: JwtPayload = jwtDecode<JwtPayload>(token)

		if (!decoded.exp) {
			// If there's no exp claim, consider the token as invalid
			return true
		}

		// Compare the current time (in seconds) with the expiration time
		const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds
		const tokenExpiryTime = decoded.exp - 60
		const timeUntilExpiry = tokenExpiryTime - currentTime

		logger.log('tokenExpired', currentTime, tokenExpiryTime, timeUntilExpiry)

		return currentTime > tokenExpiryTime // True if the token is expired
	} catch (error) {
		return true // Return true if there's an error decoding (invalid token)
	}
}

export const encryptDataWithIv = (dataToEncrypt: AnyData, secretKey: string, iv: string) => {
	try {
		const parsedIv = CryptoJS.enc.Utf8.parse(iv)
		const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(dataToEncrypt), secretKey, { iv: parsedIv }).toString()
		return encryptedData
	} catch (e) {
		logger.error('Error while trying to encrypting data', e)
		throw e
	}
}

export const decryptDataWithIv = (encryptedData: string, secretKey: string, iv: string) => {
	try {
		const parsedIv = CryptoJS.enc.Utf8.parse(iv)
		const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey, { iv: parsedIv })
		const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8))

		return decryptedData
	} catch (e) {
		logger.error('Error while trying to decrypt data', e)
		throw e
	}
}
