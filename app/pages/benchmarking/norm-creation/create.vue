<template>
    <Page title="Create Dataset"
        description="Create performance norms using historical datasets and statistical models">
        <template #toolbar>
            <UButton label="Back to Norm Creation" icon="i-lucide-arrow-left" variant="ghost" to="../norm-creation" />
        </template>
        <template #actions>
            <UButton label="Save Dataset" icon="i-lucide-save" size="lg" />
        </template>

        <!-- Step 1 -->
        <Block title="Norm Details" description="Define the basic details of the performance norm">
            <UFormField label="Norm Title" size="lg" class="flex-1">
                <UInput placeholder="Enter norm title" class="w-full" />
            </UFormField>

            <UFormField label="Description" size="lg" class="flex-1">
                <UTextarea placeholder="Describe the purpose and characteristics of these norms" class="w-full" />
            </UFormField>
        </Block>

        <!-- Step 2 -->
        <Block title="Define Norm Parameters" description="Set parameters for norm calculation">
            <div class="space-y-4">
                <UCard :ui="{ body: 'p-0 sm:p-0' }" v-for="(card, cardIndex) in cards" :key="card.id">
                    <div class="lg:flex divide-y divide-x-0 lg:divide-x lg:divide-y-0 divide-muted">
                        <!-- Table Area -->
                        <div class="flex-1 overflow-x-auto">
                            <div class="grid lg:flex gap-4 p-4">
                                <!-- each card now has its own selectedField -->
                                <USelect v-model="card.selectedField" placeholder="Select field" size="lg" :items="fields"
                                    class="w-full" />
                            </div>

                            <UTabs v-if="card.selectedField" color="primary" variant="link" :items="items"
                                :ui="{ list: 'px-4', content: '-mt-2', indicator: 'h-0.5' }" class="w-full">
                                <!-- OVERALL TAB -->
                                <template #overall="{ item }">
                                    <UCard :ui="{ body: 'p-0 sm:p-0' }" class="m-4">
                                        <div class="overflow-x-auto">
                                            <table class="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-800">
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
                                                            <UInput v-model.number="row.scores[i]" type="number" size="sm"
                                                                class="min-w-24 w-full" placeholder="0" />
                                                        </td>
                                                        <td class="px-4 py-2 text-center flex justify-center gap-2">
                                                            <UButton icon="i-lucide-plus" size="xs" variant="ghost"
                                                                color="success" @click="addRow(card)" />
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
                                            <table class="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-800">
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
                                                            <UInput v-model.number="row.scores[i]" type="number" size="sm"
                                                                class="min-w-24 w-full" placeholder="0" />
                                                        </td>

                                                        <td class="px-4 py-2 text-center flex justify-center gap-2">
                                                            <UButton icon="i-lucide-plus" size="xs" variant="ghost"
                                                                color="success" @click="addRow(card)" />
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
                                            <table class="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-800">
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
                                                                <UInput v-model.number="row.age.min" type="number" size="sm"
                                                                    class="w-16 text-center" placeholder="Min"
                                                                    :min="0" />
                                                                <span>-</span>
                                                                <UInput v-model.number="row.age.max" type="number" size="sm"
                                                                    class="w-16 text-center" placeholder="Max"
                                                                    :min="0" />
                                                            </div>
                                                        </td>

                                                        <td v-for="(score, i) in row.scores" :key="i" class="px-4 py-2">
                                                            <UInput v-model.number="row.scores[i]" type="number" size="sm"
                                                                class="min-w-24 w-full" placeholder="0" :min="0" />
                                                        </td>

                                                        <td class="px-4 py-2 text-center flex justify-center gap-2">
                                                            <UButton icon="i-lucide-plus" size="xs" variant="ghost"
                                                                color="success" @click="addRow(card)" />
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
                                            <table class="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-800">
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
                                                                <UInput v-model.number="row.age.min" type="number" size="sm"
                                                                    class="w-16 text-center" placeholder="Min"
                                                                    :min="0" />
                                                                <span>-</span>
                                                                <UInput v-model.number="row.age.max" type="number" size="sm"
                                                                    class="w-16 text-center" placeholder="Max"
                                                                    :min="0" />
                                                            </div>
                                                        </td>

                                                        <td v-for="(score, i) in row.scores" :key="i" class="px-4 py-2">
                                                            <UInput v-model.number="row.scores[i]" type="number" size="sm"
                                                                class="min-w-24 w-full" placeholder="0" :min="0" />
                                                        </td>

                                                        <td class="px-4 py-2 text-center flex justify-center gap-2">
                                                            <UButton icon="i-lucide-plus" size="xs" variant="ghost"
                                                                color="success" @click="addRow(card)" />
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
                            <UButton icon="i-lucide-copy" color="secondary" variant="ghost" size="sm"
                                v-if="card.selectedField" @click="duplicateCard(cardIndex)" />
                            <UButton icon="i-lucide-plus" color="success" variant="ghost" size="sm" @click="addCard" />
                        </div>
                    </div>
                </UCard>
            </div>
        </Block>

        <div class="flex justify-end">
            <UButton label="Save Dataset" icon="i-lucide-save" size="lg" />
        </div>
    </Page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabsItem } from '@nuxt/ui'

/* --------------------------
   FIELD OPTIONS
-------------------------- */
const fields = ref([
    { label: 'Speed', value: 'speed', unit: 'm/s' },
    { label: 'Strength', value: 'strength', unit: 'kg' },
    { label: 'Endurance', value: 'endurance', unit: 'mins' },
    { label: 'Agility', value: 'agility', unit: 'm/s' }
])

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

const genderOptions = ['All', 'Male', 'Female']

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