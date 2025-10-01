import type { FormSection } from '~/types/models'

export const newForm: FormSection[] = [
  {
    title: 'Basic Information',
    icon: 'i-lucide-user',
    rows: [
      {
        fields: [
          {
            selectedType: 'Select',
            inputLabel: 'Athlete Name',
            inputPlaceholder: 'Select Athlete',
            inputValue: '',
            isRequired: true,
            selectItems: ['Manny Pacman', 'Benjie Paras', 'Efren Reyes'],
          },
          {
            selectedType: 'Text',
            inputLabel: 'Assessment Date',
            inputValue: '',
            isRequired: true,
            textInputType: 'date',
          },
        ],
      },
    ],
  },
  {
    title: 'Body Measurements',
    icon: 'i-lucide-ruler',
    rows: [
      {
        fields: [
          {
            selectedType: 'Text',
            inputLabel: 'Height',
            inputValue: '',
            isRequired: true,
            textInputType: 'number',
            selectedUnit: 'ft',
          },
          {
            selectedType: 'Text',
            inputLabel: 'Weight',
            inputValue: '',
            isRequired: true,
            textInputType: 'number',
            selectedUnit: 'kg',
          },
          {
            selectedType: 'Text',
            inputLabel: 'Body Fat',
            inputValue: '',
            isRequired: false,
            textInputType: 'number',
            selectedUnit: '%',
          },
        ],
      },
    ],
  },
  {
    title: 'Skill Assessment',
    icon: 'i-lucide-activity',
    rows: [
      {
        fields: [
          {
            selectedType: 'Slider',
            inputLabel: 'Technical Proficiency (1-10)',
            inputValue: 0,
            isRequired: false,
            sliderMin: 0,
            sliderMax: 10,
            sliderStep: 1,
          },
          {
            selectedType: 'Slider',
            inputLabel: 'Tactical Understanding (1-10)',
            inputValue: 0,
            isRequired: false,
            sliderMin: 0,
            sliderMax: 10,
            sliderStep: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Additional Details',
    icon: 'i-lucide-file-text',
    rows: [
      {
        fields: [
          {
            selectedType: 'Textarea',
            inputLabel: 'Coach Notes',
            inputPlaceholder: 'Enter detailed notes about the athlete...',
            inputValue: '',
            isRequired: false,
          },
        ],
      },
    ],
  },
  {
    title: 'Preferences',
    icon: 'i-lucide-check-square',
    rows: [
      {
        fields: [
          {
            selectedType: 'Checkbox',
            inputLabel: 'Training Focus',
            inputValue: [],
            isRequired: false,
            checkboxItems: ['Strength', 'Speed', 'Endurance'],
            checkboxOrientation: 'horizontal',
          },
          {
            selectedType: 'Switch',
            inputLabel: 'Availability',
            inputValue: [],
            isRequired: false,
            switchItems: ['Morning', 'Afternoon', 'Evening'],
            switchLayout: 'horizontal',
          },
        ],
      },
    ],
  },
  {
    title: 'Survey',
    icon: 'i-lucide-circle-dot',
    rows: [
      {
        fields: [
          {
            selectedType: 'Radio',
            inputLabel: 'Preferred Position',
            inputValue: '',
            isRequired: true,
            radioItems: [
              'Forward','Midfielder','Defender','Goalkeeper'
            ],
            radioOrientation: 'horizontal',
          },
        ],
      },
    ],
  },
  {
    title: 'Upload Documents',
    icon: 'i-lucide-upload',
    rows: [
      {
        fields: [
          {
            selectedType: 'File Upload',
            inputLabel: 'Upload Athlete Photo',
            inputValue: null,
            isRequired: false,
            fileDescription: 'JPG, PNG only (max. 2MB)',
          },
        ],
      },
    ],
  },
]
