<template>
    <Page title="Create Dataset"
        description="Create performance norms using historical datasets and statistical models">
        <template #toolbar>
            <UButton label="Back to Norm Creation" icon="i-lucide-arrow-left" variant="ghost" to="../norm-creation" />
        </template>
        <!-- <template #actions>
            <UButton label="Save Dataset" icon="i-lucide-save" size="lg" />
        </template> -->

        <!-- Step 1 -->
        <Block title="Norm Details" description="Define the basic details of the performance norm">
            <UFormField label="Norm Title" size="lg" class="flex-1">
                <UInput v-model="title" placeholder="Enter norm title" class="w-full" />
            </UFormField>

            <UFormField label="Description" size="lg" class="flex-1">
                <UTextarea v-model="description" placeholder="Describe the purpose and characteristics of these norms" class="w-full" />
            </UFormField>
        </Block>

        <!-- Step 2 -->
        <Block title="Define Norm Parameters" description="Set parameters for norm calculation">
            <div class="space-y-4">
                <UCard :ui="{ body: 'p-0 sm:p-0' }" v-for="(card, cardIndex) in cards" :key="card.id">
                    <div class="lg:flex divide-y divide-x-0 lg:divide-x lg:divide-y-0 divide-muted">
                        <!-- Table Area -->
                        <div class="flex-1 overflow-x-auto">
                            <div class="grid lg:flex gap-2 p-4">
                                <div class="flex justify-center items-center bg-primary-100 w-10 h-10 rounded-xl">
                                    <UIcon name="i-lucide-activity" class="text-xl text-primary" />
                                </div>
                                <!-- each card now has its own selectedField -->
                                <USelect v-model="card.selectedField" placeholder="Select field" size="lg"
                                    :items="fields" :ui="{placeholder: '-ml-6', value: 'opacity-0'}" class="w-full">
                                    <template #item-trailing="{ item }">
                                        <UBadge v-if="item.badge" :label="item.badge" size="sm" variant="subtle"
                                            color="primary" />
                                    </template>
                                    <template #leading>
                                        <span class="flex items-center space-x-2">
                                            <span>{{ getFieldLabel(card.selectedField) }}</span>
                                            <UBadge v-if="getBadge(card.selectedField)"
                                                :label="getBadge(card.selectedField)" size="sm" variant="subtle"
                                                color="primary" />
                                        </span>
                                    </template>
                                </USelect>
                            </div>

                            <UTabs v-if="card.selectedField" color="primary" variant="link" :items="items"
                                :ui="{ list: 'px-4', content: '-mt-2', indicator: 'h-0.5' }" class="w-full pt-2"
                                size="md">
                                <!-- OVERALL TAB -->
                                <template #overall="{ item }">
                                    <UCard :ui="{ body: 'p-0 sm:p-0' }" class="m-4">
                                        <div class="overflow-x-auto">
                                            <table
                                                class="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-800">
                                                <thead class="bg-primary/10 text-left">
                                                    <tr class="*:px-4 *:py-2 *:font-semibold">
                                                        <th>Excellent</th>
                                                        <th>Good</th>
                                                        <th>Average</th>
                                                        <th>Below Average</th>
                                                        <th>Poor</th>
                                                        <th class="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                                                    <tr v-for="(row, index) in card.rows" :key="index"
                                                        class="hover:bg-muted/30 transition-colors">
                                                        <td v-for="(score, i) in row.scores" :key="i" class="px-4 py-2">
                                                            <UInputNumber v-model.number="row.scores[i]"
                                                                orientation="vertical" size="sm" class="min-w-24 w-full"
                                                                placeholder="0" />
                                                        </td>
                                                        <td class="px-4 py-2 text-center flex justify-center gap-2">
                                                            <UButton icon="i-lucide-plus" size="xs" variant="ghost"
                                                                color="secondary" @click="addRow(card)" />
                                                            <UButton icon="i-lucide-trash-2" size="xs" variant="ghost"
                                                                color="error" @click="deleteRow(card, index)" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </UCard>
                                </template>
                                <!-- GENDER TAB -->
                                <template #gender="{ item }">
                                    <UCard :ui="{ body: 'p-0 sm:p-0' }" class="m-4">
                                        <div class="overflow-x-auto">
                                            <table
                                                class="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-800">
                                                <thead class="bg-primary/10 text-left">
                                                    <tr class="*:px-4 *:py-2 *:font-semibold">
                                                        <th>Gender</th>
                                                        <th>Excellent</th>
                                                        <th>Good</th>
                                                        <th>Average</th>
                                                        <th>Below Average</th>
                                                        <th>Poor</th>
                                                        <th class="text-center">Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                                                    <tr v-for="(row, index) in card.rows" :key="index"
                                                        class="hover:bg-muted/30 transition-colors">
                                                        <td class="px-4 py-2">
                                                            <USelect v-model="row.gender" :items="genderOptions"
                                                                placeholder="Select Gender" size="sm"
                                                                class="min-w-24 w-full" />
                                                        </td>

                                                        <td v-for="(score, i) in row.scores" :key="i" class="px-4 py-2">
                                                            <UInputNumber v-model.number="row.scores[i]"
                                                                orientation="vertical" size="sm" class="min-w-24 w-full"
                                                                placeholder="0" />
                                                        </td>

                                                        <td class="px-4 py-2 text-center flex justify-center gap-2">
                                                            <UButton icon="i-lucide-plus" size="xs" variant="ghost"
                                                                color="secondary" @click="addRow(card)" />
                                                            <UButton icon="i-lucide-trash-2" size="xs" variant="ghost"
                                                                color="error" @click="deleteRow(card, index)" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </UCard>
                                </template>

                                <!-- AGE TAB -->
                                <template #age="{ item }">
                                    <UCard :ui="{ body: 'p-0 sm:p-0' }" class="m-4">
                                        <div class="overflow-x-auto">
                                            <table
                                                class="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-800">
                                                <thead class="bg-primary/10 text-left">
                                                    <tr class="*:px-4 *:py-2 *:font-semibold">
                                                        <th>Age (Min-Max)</th>
                                                        <th>Excellent</th>
                                                        <th>Good</th>
                                                        <th>Average</th>
                                                        <th>Below Average</th>
                                                        <th>Poor</th>
                                                        <th class="text-center">Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                                                    <tr v-for="(row, index) in card.rows" :key="index"
                                                        class="hover:bg-muted/30 transition-colors">
                                                        <td class="px-4 py-2">
                                                            <div class="flex items-center gap-2">
                                                                <UInputNumber v-model.number="row.age.min"
                                                                    orientation="vertical" size="sm"
                                                                    class="w-24 text-center" placeholder="Min"
                                                                    :min="0" />
                                                                <span class="text-dimmed">-</span>
                                                                <UInputNumber v-model.number="row.age.max"
                                                                    orientation="vertical" size="sm"
                                                                    class="w-24 text-center" placeholder="Max"
                                                                    :min="0" />
                                                            </div>
                                                        </td>

                                                        <td v-for="(score, i) in row.scores" :key="i" class="px-4 py-2">
                                                            <UInputNumber v-model.number="row.scores[i]"
                                                                orientation="vertical" size="sm" class="min-w-24 w-full"
                                                                placeholder="0" />
                                                        </td>

                                                        <td class="px-4 py-2 text-center flex justify-center gap-2">
                                                            <UButton icon="i-lucide-plus" size="xs" variant="ghost"
                                                                color="secondary" @click="addRow(card)" />
                                                            <UButton icon="i-lucide-trash-2" size="xs" variant="ghost"
                                                                color="error" @click="deleteRow(card, index)" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </UCard>
                                </template>

                                <!-- BOTH TAB -->
                                <template #both="{ item }">
                                    <UCard :ui="{ body: 'p-0 sm:p-0' }" class="m-4">
                                        <div class="overflow-x-auto">
                                            <table
                                                class="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-800">
                                                <thead class="bg-primary/10 text-left">
                                                    <tr class="*:px-4 *:py-2 *:font-semibold">
                                                        <th>Gender</th>
                                                        <th>Age (Min-Max)</th>
                                                        <th>Excellent</th>
                                                        <th>Good</th>
                                                        <th>Average</th>
                                                        <th>Below Average</th>
                                                        <th>Poor</th>
                                                        <th class="text-center">Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                                                    <tr v-for="(row, index) in card.rows" :key="index"
                                                        class="hover:bg-muted/30 transition-colors">
                                                        <td class="px-4 py-2">
                                                            <USelect v-model="row.gender" :items="genderOptions"
                                                                placeholder="Select Gender" size="sm"
                                                                class="min-w-24 w-full" />
                                                        </td>

                                                        <td class="px-4 py-2">
                                                            <div class="flex items-center gap-2">
                                                                <UInputNumber v-model.number="row.age.min"
                                                                    orientation="vertical" size="sm"
                                                                    class="w-24 text-center" placeholder="Min"
                                                                    :min="0" />
                                                                <span class="text-dimmed">-</span>
                                                                <UInputNumber v-model.number="row.age.max"
                                                                    orientation="vertical" size="sm"
                                                                    class="w-24 text-center" placeholder="Max"
                                                                    :min="0" />
                                                            </div>
                                                        </td>

                                                        <td v-for="(score, i) in row.scores" :key="i" class="px-4 py-2">
                                                            <UInputNumber v-model.number="row.scores[i]"
                                                                orientation="vertical" size="sm" class="min-w-24 w-full"
                                                                placeholder="0" />
                                                        </td>

                                                        <td class="px-4 py-2 text-center flex justify-center gap-2">
                                                            <UButton icon="i-lucide-plus" size="xs" variant="ghost"
                                                                color="secondary" @click="addRow(card)" />
                                                            <UButton icon="i-lucide-trash-2" size="xs" variant="ghost"
                                                                color="error" @click="deleteRow(card, index)" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </UCard>
                                </template>
                            </UTabs>
                        </div>

                        <!-- Card Action Buttons -->
                        <div class="flex lg:flex-col justify-around lg:justify-center gap-4 p-4">
                            <UButton icon="i-lucide-trash-2" color="error" variant="ghost" size="sm"
                                v-if="card.selectedField" @click="deleteCard(cardIndex)" />
                            <UButton icon="i-lucide-copy" color="purple" variant="ghost" size="sm"
                                v-if="card.selectedField" @click="duplicateCard(cardIndex)" />
                            <UButton icon="i-lucide-plus" color="secondary" variant="ghost" size="sm" @click="addCard"
                                :disabled="cards.length === 1 && !card.selectedField" />
                        </div>
                    </div>
                </UCard>
            </div>
        </Block>

        <Block title="Save Dataset" description="Confirm selections and save dataset">
            <div class="flex flex-col gap-4">
                <UAlert variant="subtle" color="info">
                    <template #description>
                        <div class="text-sm text-highlighted">
                            You have created this dataset with the following details and parameters:
                        </div>
                        <ul class="mt-2 space-y-1 text-sm text-highlighted">
                            <li>Title: <span v-if="title" class="font-semibold">{{ title }}</span><span v-else class="text-muted">No title yet</span></li>
                            <li>Description: <span v-if="description" class="font-semibold">{{ description }}</span><span v-else class="text-muted">No description yet</span></li>

                            <!-- add selected field here -->
                            <li class="flex flex-wrap items-center gap-1">
                                <span class="mr-2">Fields:</span>

                                <!-- if we have selected fields, show badges -->
                                <template v-if="selectedFields.length">
                                    <UBadge
                                        v-for="(val) in selectedFields"
                                        :key="val"
                                        :label="getFieldLabel(val)"
                                        variant="subtle"
                                        color="neutral"
                                        size="sm"
                                    />
                                    <!-- <UBadge
                                        v-for="(val, i) in selectedFields"
                                        :key="val + '-' + i"
                                        :label="getFieldLabel(val) + (getBadge(val) ? ` — ${getBadge(val)}` : '')"
                                        variant="subtle"
                                        color="neutral"
                                        size="sm"
                                    /> -->
                                </template>

                                <!-- none selected -->
                                <span v-else class="text-muted">None selected</span>
                            </li>
                        </ul>
                    </template>
                </UAlert>
                <div class="space-x-2 self-end">
                    <UButton label="Save as Draft" icon="i-lucide-drafting-compass" variant="outline" size="lg" class="self-end" />
                    <UButton label="Save Dataset" icon="i-lucide-save" size="lg" class="self-end" />
                </div>
            </div>
        </Block>
    </Page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TabsItem } from '@nuxt/ui'
import { UIcon } from '#components'

const title = ref('')
const description = ref('')
const selectedFields = computed(() =>
  cards.value
    .map(card => card.selectedField)
    .filter((v): v is string => Boolean(v))
)


/* --------------------------
   FIELD OPTIONS
-------------------------- */
const fields = ref([
    { label: 'Speed', value: 'speed', badge: 'm/s' },
    { label: 'Strength', value: 'strength', badge: 'kg' },
    { label: 'Endurance', value: 'endurance', badge: 'mins' },
    { label: 'Agility', value: 'agility', badge: 'm/s' }
])


/* helper functions to get label/badge from the fields list */
function getFieldLabel(value: string | undefined) {
  return fields.value.find((i: { value: any }) => i.value === value)?.label ?? ''
}
function getBadge(value: string | undefined) {
  return fields.value.find((i: { value: any }) => i.value === value)?.badge
}

/* --------------------------
   TAB CONFIGURATION
-------------------------- */
const items = [
    { label: 'Overall', icon:'i-lucide-clipboard-check', slot: 'overall' as const },
    { label: 'Gender', icon:'i-lucide-users', slot: 'gender' as const },
    { label: 'Age Group', icon:'i-lucide-calendar', slot: 'age' as const },
    { label: 'Gender and Age Group', icon:'i-lucide-user-plus', slot: 'both' as const }
] satisfies TabsItem[]

/* --------------------------
   ROW / CARD STRUCTURES
-------------------------- */
interface Row {
    gender: string | undefined
    age: { min: number; max: number }
    scores: number[]
}

interface Card {
    id: number
    selectedField: string | undefined
    rows: Row[]
}

const genderOptions = ['Male', 'Female']

const defaultRow = (): Row => ({
    gender: undefined,
    age: { min: 0, max: 0 },
    scores: [0, 0, 0, 0, 0]
})

const defaultCard = (): Card => ({
    id: Date.now() + Math.random(),
    selectedField: undefined,
    rows: [defaultRow()]
})

const cards = ref<Card[]>([defaultCard()])

/* --------------------------
   CARD MANAGEMENT
-------------------------- */
function addCard() {
    cards.value.push(defaultCard())
}

function deleteCard(index: number) {
    if (cards.value.length === 1) {
        cards.value[0] = defaultCard()
    } else {
        cards.value.splice(index, 1)
    }
}

function duplicateCard(index: number) {
    const card = cards.value[index]
    if (!card) return
    const clone: Card = {
        id: Date.now() + Math.random(),
        selectedField: card.selectedField,
        rows: JSON.parse(JSON.stringify(card.rows))
    }
    cards.value.splice(index + 1, 0, clone)
}

/* --------------------------
   ROW MANAGEMENT
-------------------------- */
function addRow(card: Card) {
    card.rows.push(defaultRow())
}

function deleteRow(card: Card, index: number) {
    if (card.rows.length === 1) {
        card.rows[0] = defaultRow()
    } else {
        card.rows.splice(index, 1)
    }
}
</script>