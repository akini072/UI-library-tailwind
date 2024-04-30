import VSpinner from "@/components/base/VSpinner"
import ExternalLink from "@/components/base/ExternalLink"
import Loading from "@/components/base/Loading"
import Tooltip from "@/components/base/Tooltip"
import Modal from "@/components/base/Modal"
import VIcon from "@/components/base/VIcon"
import InfoIcon from "@/components/base/InfoIcon"
import VField from "@/components/base/VField"
import VButton from "@/components/base/VButton"
import VSelect from "@/components/base/VSelect"
import VPopup from "@/components/base/VPopup"
import VRadio from "@/components/base/VRadio"
import ConfirmationPopup from "@/components/base/ConfirmationPopup"
import SelectButton from "@/components/base/SelectButton"

import '@/styles/global.scss'

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
  VPopup,
  VRadio,
  ConfirmationPopup,
  SelectButton,
  InfoIcon,
}

// plugin to register globally for app.use(optional depending on how we want to use the components)
export default {
  install: (app, options) => {
    // set the name of the component
    // app.component("VSpinner", VSpinner);
  }
}
