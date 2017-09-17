import {readFileSync} from 'fs' // readFile
import path from 'path'
import {sync as globSync} from 'glob'
// import {addLocaleData} from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import ruLocaleData from 'react-intl/locale-data/ru'

const translations = globSync('locals/*.json')
	.map(filename => [
		path.basename(filename, '.json'),
		readFileSync(filename, 'utf8')
	])
	.map(([locale, file]) => [locale, JSON.parse(file)])
	.reduce((acc, [locale, messages]) => {
		acc[locale] = messages
		return acc
	}, {})

const summaryLocaleData = {
	en: enLocaleData,
	ru: ruLocaleData
}

export const defaultLanguage = 'en'
export const supportedLanguages = ['en', 'ru']

export default lang => {
	console.log(lang)
	return {
		lang,
		localeData: summaryLocaleData[lang],
		locale: lang,
		messages: translations[lang]
	}
}
