import VSpinner from "@/components/VSpinner"
import ExternalLink from "./components/base/ExternalLink";
import Loading from "./components/base/Loading";

export { VSpinner, ExternalLink, Loading }

// plugin to register globally for app.use(optional depending on how we want to use the components)
export default {
    install: (app, options) => {
        // set the name of the component
        // app.component("VSpinner", VSpinner);
    }
}