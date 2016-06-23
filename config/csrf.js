'use strict';
/**
 * Cross-Site Request Forgery Protection Settings
 *
 * CSRF tokens are like a tracking chip.  While a session tells the server that a user
 * "is who they say they are", a csrf token tells the server "you are where you say you are".
 *
 * When enabled, all non-GET requests to the Sails server must be accompanied by
 * a special token, identified as the '_csrf' parameter.
 *
 * This option protects your Sails app against cross-site request forgery (or CSRF) attacks.
 * A would-be attacker needs not only a user's session cookie, but also this timestamped,
 * secret CSRF token, which is refreshed/granted when the user visits a URL on your app's domain.
 *
 * This allows us to have certainty that our users' requests haven't been hijacked,
 * and that the requests they're making are intentional and legitimate.
 */
/**
* Enabled CSRF protection for your site? 
*/

module.exports.csrf = false;

