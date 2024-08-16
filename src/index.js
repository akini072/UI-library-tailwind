import { defineAsyncComponent } from 'vue'
import '@/assets/index.css'
import '@/assets/styles/global.scss'

// Importing components asynchronously using defineAsyncComponent
const VSpinner = defineAsyncComponent(() => import('@/components/base/VSpinner'))
const ExternalLink = defineAsyncComponent(() => import('@/components/base/ExternalLink'))
const Loading = defineAsyncComponent(() => import('@/components/base/Loading'))
const Modal = defineAsyncComponent(() => import('@/components/base/Modal'))
const VIcon = defineAsyncComponent(() => import('@/components/base/VIcon'))
const InfoIcon = defineAsyncComponent(() => import('@/components/base/InfoIcon'))
const VField = defineAsyncComponent(() => import('@/components/base/VField'))
const VButton = defineAsyncComponent(() => import('@/components/base/VButton'))
const VSelect = defineAsyncComponent(() => import('@/components/base/VSelect'))
const VPopup = defineAsyncComponent(() => import('@/components/base/VPopup'))
const VRadio = defineAsyncComponent(() => import('@/components/base/VRadio'))
const ConfirmationPopup = defineAsyncComponent(() => import('@/components/base/ConfirmationPopup'))
const SelectButton = defineAsyncComponent(() => import('@/components/base/SelectButton'))
const QuickActionsBtn = defineAsyncComponent(() => import('@/components/base/QuickActionsBtn'))

const ScrollArea = defineAsyncComponent(() => import('@/components/shadcn/scroll-area').then(m => m.ScrollArea))
const ScrollBar = defineAsyncComponent(() => import('@/components/shadcn/scroll-area').then(m => m.ScrollBar))

const Carousel = defineAsyncComponent(() => import('@/components/shadcn/carousel').then(m => m.Carousel))
const CarouselContent = defineAsyncComponent(() => import('@/components/shadcn/carousel').then(m => m.CarouselContent))
const CarouselItem = defineAsyncComponent(() => import('@/components/shadcn/carousel').then(m => m.CarouselItem))
const CarouselNext = defineAsyncComponent(() => import('@/components/shadcn/carousel').then(m => m.CarouselNext))
const CarouselPrevious = defineAsyncComponent(() => import('@/components/shadcn/carousel').then(m => m.CarouselPrevious))

const Lazy = defineAsyncComponent(() => import('@/components/base/Lazy'))
const VSwitch = defineAsyncComponent(() => import('@/components/base/VSwitch'))
const ShadInput = defineAsyncComponent(() => import('./components/shadcn/input').then(m => m.ShadInput))
const ShadSearchInput = defineAsyncComponent(() => import('@/components/shadcn/ShadSearchInput'))
const NavigationMenuLink = defineAsyncComponent(() => import('@/components/shadcn/navigation-menu').then(m => m.NavigationMenuLink))
const VTooltip = defineAsyncComponent(() => import('@/components/base/VTooltip.vue'))

const Select = defineAsyncComponent(() => import('@/components/shadcn/select').then(m => m.Select))
const SelectTrigger = defineAsyncComponent(() => import('@/components/shadcn/select').then(m => m.SelectTrigger))
const SelectContent = defineAsyncComponent(() => import('@/components/shadcn/select').then(m => m.SelectContent))
const SelectItem = defineAsyncComponent(() => import('@/components/shadcn/select').then(m => m.SelectItem))
const SelectValue = defineAsyncComponent(() => import('@/components/shadcn/select').then(m => m.SelectValue))
const SelectLabel = defineAsyncComponent(() => import('@/components/shadcn/select').then(m => m.SelectLabel))

const NavigationMenu = defineAsyncComponent(() => import('@/components/shadcn/navigation-menu').then(m => m.NavigationMenu))
const NavigationMenuItem = defineAsyncComponent(() => import('@/components/shadcn/navigation-menu').then(m => m.NavigationMenuItem))
const NavigationMenuList = defineAsyncComponent(() => import('@/components/shadcn/navigation-menu').then(m => m.NavigationMenuList))

const DropdownMenu = defineAsyncComponent(() => import('@/components/shadcn/dropdown-menu').then(m => m.DropdownMenu))
const DropdownMenuTrigger = defineAsyncComponent(() => import('@/components/shadcn/dropdown-menu').then(m => m.DropdownMenuTrigger))
const DropdownMenuContent = defineAsyncComponent(() => import('@/components/shadcn/dropdown-menu').then(m => m.DropdownMenuContent))
const DropdownMenuLabel = defineAsyncComponent(() => import('@/components/shadcn/dropdown-menu').then(m => m.DropdownMenuLabel))
const DropdownMenuItem = defineAsyncComponent(() => import('@/components/shadcn/dropdown-menu').then(m => m.DropdownMenuItem))
const DropdownMenuSeparator = defineAsyncComponent(() => import('@/components/shadcn/dropdown-menu').then(m => m.DropdownMenuSeparator))
const DropdownMenuSubTrigger = defineAsyncComponent(() => import('@/components/shadcn/dropdown-menu').then(m => m.DropdownMenuSubTrigger))
const DropdownMenuSubContent = defineAsyncComponent(() => import('@/components/shadcn/dropdown-menu').then(m => m.DropdownMenuSubContent))
const DropdownMenuSub = defineAsyncComponent(() => import('@/components/shadcn/dropdown-menu').then(m => m.DropdownMenuSub))

const RangeDatePicker = defineAsyncComponent(() => import('./components/base/RangeDatePicker.vue'))
const DatePicker = defineAsyncComponent(() => import('./components/base/DatePicker.vue'))

const PaginationEllipsis = defineAsyncComponent(() => import('@/components/shadcn/pagination').then(m => m.PaginationEllipsis))
const PaginationFirst = defineAsyncComponent(() => import('@/components/shadcn/pagination').then(m => m.PaginationFirst))
const PaginationLast = defineAsyncComponent(() => import('@/components/shadcn/pagination').then(m => m.PaginationLast))
const PaginationNext = defineAsyncComponent(() => import('@/components/shadcn/pagination').then(m => m.PaginationNext))
const PaginationPrev = defineAsyncComponent(() => import('@/components/shadcn/pagination').then(m => m.PaginationPrev))
const PaginationList = defineAsyncComponent(() => import('@/components/shadcn/pagination').then(m => m.PaginationList))
const PaginationListItem = defineAsyncComponent(() => import('@/components/shadcn/pagination').then(m => m.PaginationListItem))
const Pagination = defineAsyncComponent(() => import('@/components/shadcn/pagination').then(m => m.Pagination))

const Popover = defineAsyncComponent(() => import('@/components/shadcn/popover').then(m => m.Popover))
const PopoverContent = defineAsyncComponent(() => import('@/components/shadcn/popover').then(m => m.PopoverContent))
const PopoverTrigger = defineAsyncComponent(() => import('@/components/shadcn/popover').then(m => m.PopoverTrigger))

const Skeleton = defineAsyncComponent(() => import('@/components/shadcn/skeleton').then(m => m.Skeleton))
const Drawer = defineAsyncComponent(() => import('./components/base/Drawer.vue'))

const Table = defineAsyncComponent(() => import('@/components/shadcn/table').then(m => m.Table))
const TableBody = defineAsyncComponent(() => import('@/components/shadcn/table').then(m => m.TableBody))
const TableCaption = defineAsyncComponent(() => import('@/components/shadcn/table').then(m => m.TableCaption))
const TableCell = defineAsyncComponent(() => import('@/components/shadcn/table').then(m => m.TableCell))
const TableEmpty = defineAsyncComponent(() => import('@/components/shadcn/table').then(m => m.TableEmpty))
const TableFooter = defineAsyncComponent(() => import('@/components/shadcn/table').then(m => m.TableFooter))
const TableHead = defineAsyncComponent(() => import('@/components/shadcn/table').then(m => m.TableHead))
const TableHeader = defineAsyncComponent(() => import('@/components/shadcn/table').then(m => m.TableHeader))
const TableRow = defineAsyncComponent(() => import('@/components/shadcn/table').then(m => m.TableRow))

const Checkbox = defineAsyncComponent(() => import('@/components/shadcn/checkbox'))
const TemplatesPopup = defineAsyncComponent(() => import('./components/templates/TemplatesPopup.vue'))
const TemplateCard = defineAsyncComponent(() => import('./components/templates/TemplateCard.vue'))
const TemplateDetails = defineAsyncComponent(() => import('./components/templates/TemplateDetails.vue'))
const TemplatesMenu = defineAsyncComponent(() => import('./components/templates/TemplatesMenu.vue'))

const DomainsPopup = defineAsyncComponent(() => import('./components/domain/DomainsPopup.vue'))
const NewDomainPopup = defineAsyncComponent(() => import('./components/domain/NewDomainPopup.vue'))

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
  SelectLabel,
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
  Skeleton,
  Checkbox,
  TemplatesPopup,
  TemplateCard,
  TemplatesMenu,
  TemplateDetails,
  DomainsPopup,
  NewDomainPopup
}
