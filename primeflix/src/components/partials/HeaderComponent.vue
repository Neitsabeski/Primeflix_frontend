<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <span>
                P R I M E F L I X
            </span>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/browse/series">Series</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/browse/films">Films</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>