/**
 * @providesModule WithFreightSansBoldFont
 */
'use strict';

import WithCustomFont from '@exponent/with-custom-font';

import Constants from 'Constants';

export default WithCustomFont.createCustomFontComponent({
  uri: `${Constants.cdnHost}FreigSanLFProBol.otf`,
});
