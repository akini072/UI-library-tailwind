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
import { ShadInput } from './components/shadcn/input'
import ShadSearchInput from '@/components/shadcn/ShadSearchInput'
import { NavigationMenuLink } from '@/components/shadcn/navigation-menu'
import VTooltip from '@/components/base/VTooltip.vue'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/shadcn/select'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/shadcn/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSub,
} from '@/components/shadcn/dropdown-menu'
import RangeDatePicker from './components/base/RangeDatePicker.vue'
import DatePicker from './components/base/DatePicker.vue'
import {
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationNext,
  PaginationPrev,
  PaginationList,
  PaginationListItem,
  Pagination,
} from '@/components/shadcn/pagination'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn/popover'
import { Skeleton } from '@ /components/shadcn/skelton';
import Drawer from './components/base/Drawer.vue'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/table'
import { Checkbox } from '@/components/shadcn/checkbox'

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
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  ShadInput,
  ShadSearchInput,
  NavigationMenuLink,
  VTooltip,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DatePicker,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationNext,
  PaginationPrev,
  PaginationList,
  PaginationListItem,
  Pagination,
  RangeDatePicker,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Drawer,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Checkbox,
  Skeleton,
  Checkbox,
}

// plugin to register globally for app.use(optional depending on how we want to use the components)
export default {
  install: (app, options) => {
    // set the name of the component
    // app.component('VSpinner', VSpinner)
  },
}
