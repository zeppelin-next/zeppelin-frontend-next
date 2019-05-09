import { BaseUrlService } from './base-url.service';

/**
 * @private
 */
export class BaseRest {
  constructor(public baseUrlService: BaseUrlService) {}

  /**
   * ```ts
   * this.restUrl`/user/${username}`
   * this.restUrl(['/user/'], username)
   * this.restUrl(`/user/${username}`)
   * ```
   * @param string
   * @param values
   */
  restUrl(string: TemplateStringsArray | string, ...values): string {
    let output = this.baseUrlService.getRestApiBase();

    if (typeof string === 'string') {
      return `${output}${string}`;
    }

    let index;
    for (index = 0; index < values.length; index++) {
      output += string[index] + values[index];
    }

    output += string[index];
    return output;
  }
}
