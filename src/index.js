import VSpinner from "@/components/base/VSpinner"
import ExternalLink from "@/components/base/ExternalLink"
import Loading from "@/components/base/Loading"
import Tooltip from "@/components/base/Tooltip"
import Modal from "@/components/base/Modal"
import VIcon from "@/components/base/VIcon"
import VField from "@/components/base/VField"
import VButton from "@/components/base/VButton"
import VSelect from "@/components/base/VSelect"

export {
  VSpinner,
  ExternalLink,
  Loading,
  Tooltip,
  Modal,
  VIcon,
  VField,
  VButton,
  VSelect,
}

// plugin to register globally for app.use(optional depending on how we want to use the components)
export default {
  install: (app, options) => {
    // set the name of the component
    // app.component("VSpinner", VSpinner);
  }
}
