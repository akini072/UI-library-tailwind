import VSpinner from "@/components/base/VSpinner"
import ExternalLink from "@/components/base/ExternalLink";
import Loading from "@/components/base/Loading";
import Tooltip from "@/components/base/Tooltip";
import Modal from "@/components/base/Modal"

export { VSpinner, ExternalLink, Loading, Tooltip, Modal }

// plugin to register globally for app.use(optional depending on how we want to use the components)
export default {
    install: (app, options) => {
        // set the name of the component
        // app.component("VSpinner", VSpinner);
    }
}