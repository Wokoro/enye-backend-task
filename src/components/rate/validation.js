/**
 * @author - Wokoro Douye Samuel
 */

import { check } from 'express-validator';
import { generateErrorReport } from '../../utils';

export const getRateValidations = [
  check('base')
    .optional()

    .trim()
    .escape()

    .isAlpha()
    .withMessage('Base currency must contain alphabets only')


    .isLength({ min: 3, max: 3 })
    .withMessage('Base currency must contain three(3) alphabets only')

    .customSanitizer(value => value.toUpperCase()),


  check('currency')
    .trim()

    .custom(value => {
      if (!value) return true;
      let valueMatches = value.split(',');
      let reg = /\d+/g;
      let temp = '';
      let errors = [];

      for (let i = 0; i < valueMatches.length; i++) {
        temp = (valueMatches[i]).replace(/\s/g, '');

        if (valueMatches[i].length !== 3 || reg.test(valueMatches[i])) {
          errors.push(`Currency must contain three(3) alphabets only, got: '${temp}'`);
        }
      }

      if (errors.length !== 0) throw new Error(errors.join('\n'));

      return valueMatches.join(',');
    })


    .customSanitizer(value => value.toUpperCase()),

  generateErrorReport
];
