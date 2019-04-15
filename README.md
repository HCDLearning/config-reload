config-reload
====================================
reload config when file changed for nodejs


1. require

```
var configReload = require('config-reload');
```

2. load config

load from object
```
var param = configReload({any object});
```

load from file
```
var param = configReload('config file path');
```

load from environment settings
```
process.env.CONFIG_FILE_PATH="{config file path}"
configReload.setEnvName('CONFIG_FILE_PATH');

var param = configReload();
```