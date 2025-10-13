<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-101 sm:h-103 lg:h-54" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Talent Identification" description="AI-powered sport suitability prediction and student potential assessment" inverted>
            <Tabs :items="talentTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in talentStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <UAlert 
                title="AI Sport Prediction Engine" 
                description="AI-powered analysis across 80+ sports for male and female students using advanced machine learning" 
                variant="subtle" 
                color="secondary" 
                icon="i-lucide-wand-2"
                :ui="{
                    icon: 'size-7 my-auto'
                }"
            />
            
            <Grid :lg="4" :gap="4">
                <Block title="Prediction Setup">
                    <UFormField label="Select Student" size="lg">
                        <USelect placeholder="Choose a student" :items="['Timmy the Turtle', 'Beavis Butthead', 'Homer Simpson', 'Philip J. Fry' ]" class="w-full" />
                    </UFormField>
                    <UFormField label="API Key" size="lg" class="mt-4">
                        <UInput placeholder="Enter API key for testing" class="w-full" />
                    </UFormField>
                    <UFormField label="Analysis Type" size="lg" class="mt-4">
                        <USelect defaultValue="Comprehensive" :items="['Normal', 'Comprehensive', 'Advance']" class="w-full" />
                    </UFormField>
                    <UFormField label="Gender-specific Analysis" size="lg" class="mt-4">
                        <USelect defaultValue="Auto-detect from profile" :items="['Auto-detect from profile', 'Male', 'Female']" class="w-full" />
                    </UFormField>
                    <UButton label="Run AI Prediction" icon="i-lucide-rocket" color="neutral" size="lg" block class="mt-4" />
                </Block>
                <GridSpan :lg="3">
                    <UFileUpload
                        :dropzone="false"
                        description="Upload and process a document to view extracted details"
                        class="w-full"
                        :ui="{
                            root: 'h-full'
                        }"
                    >
                        <template #label>
                            <div class="font-semibold text-base text-default">
                                AI Prediction Report
                            </div>
                        </template>
                        <template #leading>
                            <UAvatar icon="i-lucide-stars" size="3xl" class="rounded-none squircle" />
                        </template>
                    </UFileUpload>
                </GridSpan>
            </Grid>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { talentStatCards, talentTabs } from '~/data';
</script>