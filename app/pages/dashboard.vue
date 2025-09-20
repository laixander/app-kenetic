<script setup lang="ts">
</script>
<template>
    <div class="relative min-h-screen">
        <div class="absolute h-45 inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 dark:from-indigo-900 dark:to-blue-900"></div>
        <Page title="Dashboard" description="Advanced analytics for sports performance, talent identification, and fitness assessment" inverted>
            <Grid :lg="4" :gap="4">
                <StatCard
                    label="Total Athletes"
                    count="24"
                    icon="i-lucide-users"
                    color="secondary"
                    hasDetails
                    trendValue="+12%"
                />
                <StatCard
                    label="Top Performers"
                    count="18"
                    icon="i-lucide-medal"
                    color="success"
                    hasDetails
                    trendDescription="Above 90% fitness"
                />
                <StatCard
                    label="Need Attention"
                    count="5"
                    icon="i-lucide-clipboard-signature"
                    color="warning"
                    hasDetails
                    trendValue="-2%"
                />
                <StatCard
                    label="Avg Fitness Level"
                    count="89%"
                    icon="i-lucide-target"
                    color="error"
                    hasDetails
                    trendValue="+3.1%"
                />
            </Grid>

            <Grid :lg="2" :gap="4">
                <Block
                    title="Performance Metrics Overview"
                    description="Concise insights into fitness metrics for tracking student athletic growth"
                >
                    <Grid :lg="3" :gap="0.5" class="rounded-lg overflow-hidden">
                        <div class="bg-muted p-4">Hello</div>
                        <div class="bg-muted p-4">Hello</div>
                        <div class="bg-muted p-4">Hello</div>
                        <div class="bg-muted p-4">Hello</div>
                        <div class="bg-muted p-4">Hello</div>
                        <div class="bg-muted p-4">Hello</div>
                    </Grid>
                </Block>
                <Block
                    title="Upcoming Events"
                    description="Stay informed about scheduled events and important dates."
                >
                </Block>
            </Grid>
        </Page>
    </div>
</template>