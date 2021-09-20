import React, { useEffect, useState } from 'react'
import {
  MessageProvider,
  useLocales,
  useMessage,
  useMessageGetter
} from '@messageformat/react'

const DEFAULT_LOCALE = 'en'

const SelectLocale = ({ setLocale }) => {
  const locales = useLocales()
  const localeName = useMessageGetter('locales')
  return (
    <label>
      {useMessage('select-locale')}
      <select value={locales[0]} onChange={ev => setLocale(ev.target.value)}>
        <option value="en">{localeName('en')}</option>
        <option value="fi">{localeName('fi')}</option>
      </select>
    </label>
  )
}

const App = ({ setLocale }) => (
  <>
    <SelectLocale setLocale={setLocale} />
    <hr />
    <h3>{useMessage('app.title')}</h3>
    <p>{useMessage('app.body')}</p>
  </>
)

export default function Wrapper() {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [messages, setMessages] = useState({});

  // In a real app, you may want to indicate message loading somehow
  useEffect(() => {
    if (messages[locale]) return;
    const get = locale === 'en' ? () => import('./messages.en.yaml')
              : locale === 'fi' ? () => import('./messages.fi.yaml')
              : () => Promise.reject(`Unsupported locale ${locale}`)
    get()
      .then(module => {
        const next = Object.assign({}, messages)
        next[locale] = module.default
        setMessages(next)
      })
      .catch(error => {
        console.error(error)
        setLocale(DEFAULT_LOCALE)
      })
  }, [locale, messages])

  return (
    <MessageProvider
      locale={locale}
      messages={messages[locale]}
      onError="warn"
    >
      <App setLocale={setLocale} />
    </MessageProvider>
  )
}
