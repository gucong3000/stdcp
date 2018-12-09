stdcp
====
[![NPM version](https://img.shields.io/npm/v/stdcp.svg?style=flat-square)](https://www.npmjs.com/package/stdcp)
[![AppVeyor](https://img.shields.io/appveyor/ci/gucong3000/stdcp.svg)](https://ci.appveyor.com/project/gucong3000/stdcp)
[![Codecov](https://img.shields.io/codecov/c/github/gucong3000/stdcp.svg)](https://codecov.io/gh/gucong3000/stdcp)
[![David](https://img.shields.io/david/gucong3000/stdcp.svg)](https://david-dm.org/gucong3000/stdcp)

An effort to encapsulate the output code page used by the console of current process.

This library provides native bindings for Windows APIs:
- [SetConsoleOutputCP](https://docs.microsoft.com/windows/console/setconsoleoutputcp)
- [GetConsoleOutputCP](https://docs.microsoft.com/windows/console/getconsoleoutputcp)

## Use Case

```javascript
const stdcp = require("stdcp");
stdcp.set(65001);
console.log(stdcp.get())  // 65001
```

## Related
- [Code Page Identifiers](https://docs.microsoft.com/windows/desktop/intl/code-page-identifiers)
- [chcp](https://docs.microsoft.com/windows-server/administration/windows-commands/chcp)
