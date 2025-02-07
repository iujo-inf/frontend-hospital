<template>
    <div class="auth-layout">
        <main>
            <slot></slot> <!-- Aquí se insertarán los componentes hijos -->
        </main>
    </div>
</template>

<script>
    export default {
    name: 'AuthLogin',
    }
</script>

<style scoped>
    .auth-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
    }

    header {
    margin-bottom: 20px;
    }

    footer {
    margin-top: 20px;
    }
</style>