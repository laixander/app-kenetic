export const colors = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'error',
    'neutral',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose'
] as const

export type ColorType = typeof colors[number]

export interface PageProps {
    title?: string
    description?: string
    alignCenter?: boolean
    toolbarClass?: string
    inverted?: boolean
}

export interface BlockProps {
    title?: string
    description?: string
    showDivider?: boolean        // Optional: shows divider if true
    noBodyPadding?: boolean      // Optional: removes body padding if true
    icon?: string
    iconColor?: ColorType
    bgClass?: string
}

export interface StepperLayoutProps {
    step: number
    steps: string[]
    value: number
    stepComponents: any[] // You can replace `any` with a more specific type if needed
}

export interface StatCardProps {
    label: string
    count: string | number
    color: ColorType
    icon: string
    hasDetails?: boolean
    trendFrom?: string  
    trendValue?: string         // e.g. "2%" or "-4%"
    trendDescription?: string     // optional sublabel
    useGradient?: boolean         // grdiet option
    countSize?: string
}

export interface ListDescription {
  name: string
  received: string
}

export interface ListItemProps {
  title: string
  description?: string | ListDescription
}

export interface ListIconProps {
    icon?: string
    styledIcon?: boolean
    label: string
    description?: string
    withContainer?: boolean
    iconColor?: string
}

export interface ListProfileProps {
    profilePhoto?: string
    profileName?: string
    profileDescription?: string
}

export interface BoardProps {
    title: string
    badgeLabel?: string | number
    badgeColor?: ColorType
}

export type BoardCardSource = 'external' | 'internal'
export type BoardCardPriority = 'high' | 'medium' | 'low'
export type BoardCardReviewer = 'Internal' | 'Partner' | 'Legal' | 'Final';
export interface BoardCardProps {
    boardColor?: string
    title: string
    institution: string
    contact: string
    description?: string
    progress?: number
    reviewer?: BoardCardReviewer
    source?: BoardCardSource
    priority?: BoardCardPriority
    dueDate?: string
    alert?: string
    timeSubmitted: string
}

export type BoardCardType = {
    title: string
    institution: string
    contact: string
    description?: string
    progress?: number
    reviewer?: BoardCardReviewer
    source?: BoardCardSource
    priority?: BoardCardPriority
    dueDate?: string
    alert?: string
    timeSubmitted: string
}

export type ProposalBoardType = {
    title: string
    badgeLabel: number
    badgeColor: ColorType
    cards: BoardCardType[]
}

export type WorkflowBoardType = {
    title: string
    badgeLabel: number
    badgeColor: ColorType
    cards: BoardCardType[]
}

import type { DropdownMenuItem } from '@nuxt/ui'
export type CardLayoutSection = 'description' | 'custom' | 'tags'
export interface CardImageDetails {
  src: string
  height?: string | number // Tailwind class
}
export interface CardUi {
  wrapper?: string
  header?: string
  body?: string
  footer?: string
  image?: string
  icon?: string
}
export interface CardProps {
    img?: CardImageDetails
    title?: string
    subtitle?: string
    description?: string
    tags?: string[]
    icon?: string
    avatar?: string
    actions?: DropdownMenuItem[]
    /** Controls the order of body sections */
    layout?: CardLayoutSection[]
    ui?: CardUi
}



// FORM

export interface FormField {
  selectedType: 'Text' | 'Textarea' | 'Select' | 'Checkbox' | 'Switch' | 'Radio' | 'File Upload' | 'Slider';
  inputLabel: string;
  inputPlaceholder?: string;
  inputValue: any;
  isRequired?: boolean;
  textInputType?: 'text' | 'number' | 'file' | 'date';
  selectedUnit?: string;
  selectItems?: string[];
  checkboxItems?: string[];
  checkboxOrientation?: 'horizontal' | 'vertical';
  switchItems?: string[];
  switchLayout?: 'horizontal' | 'column' | 'vertical'
  radioItems?: string[];
  radioOrientation?: 'horizontal' | 'vertical';
  fileDescription?: string;
  sliderMin?: number;
  sliderMax?: number;
  sliderStep?: number;
}

export interface FormRow {
  fields: FormField[];
}

export interface FormSection {
  title: string;
  icon: string;
  rows: FormRow[];
}

import type { RadioGroupItem } from '@nuxt/ui'

export interface DynamicFieldProps {
  selectedType: string
  inputLabel?: string
  inputPlaceholder?: string
  inputValue: any
  isRequired?: boolean

  // Select
  selectItems?: string[]

  // Checkbox
  checkboxItems?: string[]
  checkboxOrientation?: 'horizontal' | 'vertical'

  // Switch
  switchItems?: string[]
  switchLayout?: 'horizontal' | 'column' | 'vertical'

  // Radio
  radioItems?: RadioGroupItem[]
  radioOrientation?: 'horizontal' | 'vertical'

  // File Upload
  fileDescription?: string

  // Slider
  sliderMin?: number
  sliderMax?: number
  sliderStep?: number

  // Text Input Special
  textInputType?: 'text' | 'number' | 'file' | 'date'
  selectedUnit?: string
}

export interface ModelType {
    id?: number
    createdById?: number;
    createdBy?: UserType;
    updatedById?: number;
    updatedBy?: UserType;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
}

export interface UserType extends ModelType {
    _id?:number
    username?:string
    avatar?: string;
    password?: string;
    email?: string;
    status?: string;
    lastLoggedIn?: Date;
    invalidAttempt?: number;
}

export interface UnitType extends ModelType {
    name?:string
    description?:string
    symbol?:string
    conversionFactor?:number
}

export enum InputTypeEnum {
    TEXT='TEXT', 
    NUMBER='NUMBER', 
    TEXTAREA='TEXTAREA', 
    SELECT='SELECT', 
    CHECKBOX='CHECKBOX', 
    SWITCH='SWITCH', 
    RADIO='RADIO', 
    FILE='FILE',
    RANGE='RANGE'
} 

export interface ParameterType extends ModelType {
    name?:string
    description?:string
    placeholder?:string
    inputType?:InputTypeEnum
    unitId?:number
    unit?:UnitType
    isRequired?:boolean
    formula?:string
    min?: number
    max?: number
    step?: number
    options?:Array<string>
    icon?:string
}
