<template>
    <div class="search">
        <section class="h-100 gradient-form">
            <div class="container py-5 h-100">
                <h1>{{ $t('search.title') }}</h1>
                <div class="row d-flex justify-content-center align-items-center h-100 pannel">
                    <div class="col-xl-10">
                        <div class="row g-0 d-flex justify-content-center">
                            <div class="col-lg-6 ">
                                <div class="text-center">
                                    <h2 class="card_title">
                                        <span v-if="0">{{ $t('search.subTitle')}}</span>
                                        <span v-else>{{ $t('search.noResult')}}</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
