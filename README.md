## UI Component Library

Private npm package via github actions (pushing any changes will trigger a new build)

### Access token
- A personal access token is required to use the library:
    - Select your github profile/settings/developer settings/personal access token(classic)/generate new token
    - Create **.npmrc** file at the root of the consuming app: 
    ```
        @funnelish:registry=https://npm.pkg.github.com
        //npm.pkg.github.com/:_authToken=YOUR_GENERATED_GITHUB_TOKEN_HERE
    ```
### Installation
- Install the library or add the library to package.json
```
https://github.com/Funnelish/fnsh_base/pkgs/npm/ui-lib
- install via cli: npm install @funnelish/ui-lib@1.0.0
- or add the package to dependencies: "@funnelish/ui-lib": "1.0.0"
```
### Adding(index.js)
- Export each component to be used in a Vue file/component inside index.js
```
import VSpinner from "@/components/VSpinner"
export { VSpinner }
```
- or export globally to be used in a main.js
```
import { createApp } from "vue"
import VSpinner from "@funnelish/ui-lib"
const app = createApp(App)
app.use(VSpinner)
```
### Using components(.vue)
```
import { VSpinner } from "@funnelish/ui-lib"
```