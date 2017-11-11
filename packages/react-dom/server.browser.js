/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

var ReactDOMServerBrowser = require('./src/server/ReactDOMServerBrowser');

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
module.exports = ReactDOMServerBrowser.default ? ReactDOMServerBrowser.default : ReactDOMServerBrowser;
