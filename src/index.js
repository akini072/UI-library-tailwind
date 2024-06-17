import '@/assets/index.css'
import '@/assets/styles/global.scss'
import VSpinner from '@/components/base/VSpinner'
import ExternalLink from '@/components/base/ExternalLink'
import Loading from '@/components/base/Loading'
import Modal from '@/components/base/Modal'
import VIcon from '@/components/base/VIcon'
import InfoIcon from '@/components/base/InfoIcon'
import VField from '@/components/base/VField'
import VButton from '@/components/base/VButton'
import VSelect from '@/components/base/VSelect'
import VPopup from '@/components/base/VPopup'
import VRadio from '@/components/base/VRadio'
import ConfirmationPopup from '@/components/base/ConfirmationPopup'
import SelectButton from '@/components/base/SelectButton'
import QuickActionsBtn from '@/components/base/QuickActionsBtn'
import { ScrollArea, ScrollBar } from '@/components/shadcn/scroll-area'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shadcn/carousel'
import Lazy from '@/components/base/Lazy'
import VSwitch from '@/components/base/VSwitch'
import ShadSelect from '@/components/shadcn/ShadSelect'
import ShadPopOver from '@/components/shadcn/ShadPopOver'
import { ShadInput } from './components/shadcn/input'
import ShadSearchInput from '@/components/shadcn/ShadSearchInput'
import ShadNavigationLink from '@/components/shadcn/ShadNavigationLink'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from '@/components/shadcn/navigation-menu'

export {
  VSpinner,
  ExternalLink,
  Loading,
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
  QuickActionsBtn,
  ScrollArea,
  ScrollBar,
  Lazy,
  VSwitch,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  ShadSelect,
  ShadPopOver,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  ShadInput,
  ShadSearchInput,
  ShadNavigationLink
}

// plugin to register globally for app.use(optional depending on how we want to use the components)
export default {
  install: (app, options) => {
    // set the name of the component
    app.component("VSpinner", VSpinner);
  },
}
