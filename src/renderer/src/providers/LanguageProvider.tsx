import { createContext, useMemo } from 'react'
import { memo, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { setUserConfig } from '../config/apollo'
import { Language } from '../config/i18n'

export const LanguageContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
}>({
  language: Language.FR,
  setLanguage: () => {
    throw new Error('Component must be wrapped in LanguageProvider')
  }
})

export function getPathname(pathname: string, language: Language): string {
  return language === Language.FR
    ? pathname
    : `/${language}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}

interface LanguageProviderProps {
  children: ReactNode
}

const LanguageProvider = ({ children }: LanguageProviderProps): JSX.Element => {
  const location = useLocation()
  const navigate = useNavigate()

  const { i18n } = useTranslation()

  const value = useMemo(() => {
    const pathname = location.pathname.startsWith('/')
      ? location.pathname.slice(1)
      : location.pathname

    const [langStr, ...pathnameParts] = pathname.split('/')

    const currentLanguage = Object.values(Language).find((language) => language === langStr)

    return {
      language: currentLanguage || Language.FR,
      setLanguage: (language: Language): void => {
        i18n.changeLanguage(language)
        setUserConfig({ language: language })

        const languagePrefix = language !== Language.FR ? `${language}/` : ''
        const nextPathname = currentLanguage
          ? `${languagePrefix}${pathnameParts.join('/')}`
          : `${languagePrefix}${pathname}`

        navigate({ ...location, pathname: nextPathname })
      }
    }
  }, [location.pathname])

  return (
    <LanguageContext.Provider value={value}>
      <Routes>
        {Object.values(Language).map((language) => {
          return (
            <Route
              key={language}
              path={language === Language.FR ? '*' : `${language}/*`}
              element={children}
            />
          )
        })}
      </Routes>
    </LanguageContext.Provider>
  )
}

export default memo(LanguageProvider)
