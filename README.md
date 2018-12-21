stdcp
====
[![NPM version](https://img.shields.io/npm/v/stdcp.svg?style=flat-square)](https://www.npmjs.com/package/stdcp)
[![AppVeyor](https://img.shields.io/appveyor/ci/gucong3000/stdcp.svg)](https://ci.appveyor.com/project/gucong3000/stdcp)
[![Codecov](https://img.shields.io/codecov/c/github/gucong3000/stdcp.svg)](https://codecov.io/gh/gucong3000/stdcp)
[![David](https://img.shields.io/david/gucong3000/stdcp.svg)](https://david-dm.org/gucong3000/stdcp)

An effort to encapsulate the output code page used by the console of current process.

This library provides native bindings for Windows APIs:
- [GetACP](https://docs.microsoft.com/windows/desktop/api/winnls/nf-winnls-getacp)
- [GetConsoleOutputCP](https://docs.microsoft.com/windows/console/getconsoleoutputcp)
- [SetConsoleOutputCP](https://docs.microsoft.com/windows/console/setconsoleoutputcp)

## Use Case

```javascript
const stdcp = require("stdcp");

// Asynchronously APIs
(async () => {
  console.log(await stdcp.get(true))  // Get current Windows code page.
  console.log(await stdcp.get())      // Get code page for current console.
  await stdcp.set(65001);             // Set code page for current console.
})();

// Synchronously APIs
(() => {
  console.log(stdcp.getSync(true))  // Get current Windows code page.
  console.log(stdcp.getSync())      // Get code page for current console.
  stdcp.setSync(65001)              // Set code page for current console.
})();
```

## Related
- [Code Page Identifiers](https://docs.microsoft.com/windows/desktop/intl/code-page-identifiers)
- [chcp](https://docs.microsoft.com/windows-server/administration/windows-commands/chcp)
