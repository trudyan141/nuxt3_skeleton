import { defineRule } from "vee-validate";
// import { required, email, min } from '@vee-validate/rules';
import {  configure } from 'vee-validate';
import * as rules from "@vee-validate/rules";
import { localize } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';
export default defineNuxtPlugin((nuxtApp) => {
  // defineRule('required', required);
  // defineRule('email', email);
  // defineRule('min', min);
  // Install all rules
  Object.keys(rules)
    .filter((k) => k !== "default")
    .forEach((rule) => {
      defineRule(rule, rules[rule]);
    //   console.log(rule);
    });
  localize({ en });
  // Activate the locale
  configure({
    generateMessage: localize(en)
  });
});