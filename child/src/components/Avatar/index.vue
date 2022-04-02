<template>
    <div class="sidebar-logo-container">
        <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
            <div class="sidebar-title">
                <div class="sidebar-title-span">
                    <span></span>
                    {{ userInfo.empNm | getLastString}}
                </div>               
            </div>  
        </router-link>
        <router-link v-else key="expand" class="sidebar-logo-link" to="/">
            <div class="sidebar-title">
                <div class="sidebar-title-span">
                    <span></span>
                    {{ userInfo.empNm | getLastString}}
                </div>
               
            </div>

        </router-link>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"

    export default {
        name: 'SidebarLogo',
        props: {
            collapse: {
                type: Boolean,
                required: true
            }
        },
        
        computed: {
            ...mapGetters(["userInfo"])
        },

        mounted() {
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";

    .sidebarLogoFade-enter-active {
        transition: opacity 1.5s;
    }

    .sidebarLogoFade-enter,
    .sidebarLogoFade-leave-to {
        opacity: 0;
    }

    .sidebar-logo-container {
        position: relative;
        width: 100%;
        height: 120px;
        background: $sidebarBg;
        text-align: center;
        overflow: hidden;

        & .sidebar-logo-link {
            height: 100%;
            width: 100%;
            color: white;
            
            display: flex !important;
            justify-content: center;
            align-items: center;
            
            & .sidebar-title {
                width: 45px;
                height: 45px;
                text-align: center;
                line-height: 35px;
                font-size: 9px;
                letter-spacing: 2px;
                background: $sidebarBgActive;
                border-radius: 50%;
                padding: 5px;
                & .sidebar-title-span {
                    transform: scale(0.8);
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }

        }

        /* &.collapse {
            .sidebar-logo {
                margin-right: 0px;
            }
        } */
    }
</style>