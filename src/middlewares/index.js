/**
 * @author - Wokoro Douye Samuel
 */

import {
  bodyParserHandler, compressionHandler, corsHandler,
  morganHandler, toobusyHandler, hppHandler, helmetHandler
} from './common.handlers';


export default {
  morgan: morganHandler,
  bodyparser: bodyParserHandler,
  compression: compressionHandler,
  cors: corsHandler,
  hpp: hppHandler,
  helmet: helmetHandler,
  toobusy: toobusyHandler
};
