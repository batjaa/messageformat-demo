import { number, plural } from "@messageformat/runtime";
import { en } from "@messageformat/runtime/lib/plurals";
export default {
  en: {
    locales: {
      en: () => "English",
      fi: () => "Finnish"
    },
    "select-locale": () => "Select language",
    app: {
      title: () => "App title",
      body: () => "'Some content here'\n",
      "hello-world": (d) => "Hi, " + d.name,
      time: (d) => d["0"] + " took " + d["1"] + " ms to complete.",
      ordinal: (d) => "The " + plural(d.pos, 0, en, { one: number("en", d.pos, 0) + "st", two: number("en", d.pos, 0) + "nd", few: number("en", d.pos, 0) + "rd", other: number("en", d.pos, 0) + "th" }, 1) + " message."
    }
  },
  fi: {
    locales: {
      en: () => "englanti",
      fi: () => "suomi"
    },
    "select-locale": () => "Valitse kieli",
    app: {
      title: () => "Sovellusotsikko",
      body: () => "'Jotain sisältöä tähän'\n"
    }
  }
}