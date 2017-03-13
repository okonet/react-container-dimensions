# HEAD

- fix: Upgrade Babel
- chore: Upgrade lint-staged
- chore: Upgrade test dependencies
- fix: Upgraded some libraries
- test: Remove inconsistent test
- fix: Uninstall the listener on componentWillUnmount to ensure the element-resize-detector is correctly set up on next mount. (#13)

# 1.3.0

- Pass all values of getBoundingClientRect, not just `width` and `height`. (#6)

# 1.2.0

- Added React 15 to a semver range for peerDependencies (#3)

# 1.1.0

- Render a placeholder element, get the container size, and only then render (#2). This should fix 
 an issue with SSR.

# 1.0.0
- Do not call the resize callback in `componentWillReceiveProps`
- Better examples in README
- Added tests!

# 0.0.2
- Added files and directories fields. Fixes npm publishing.

# 0.0.1
- Initial release
