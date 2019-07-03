import { language as ScalaLanguage, conf as ScalaConf } from './scala';

export const loadMonacoLanguage = () => {
  monaco.languages.register({ id: 'scala' });
  monaco.languages.setMonarchTokensProvider('scala', ScalaLanguage);
  monaco.languages.setLanguageConfiguration('scala', ScalaConf);
};
