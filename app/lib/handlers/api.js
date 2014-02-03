'use strict';

/**
 * Logout.
 */
exports.logout = function(req, res) {
  req.session.destroy();
  res.send(200);
};

/**
 * Get user info.
 */
exports.user = function(req, res) {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    // User info not in session.
    res.send(500);
  }
};
