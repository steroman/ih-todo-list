<template>
  <nav
    class="flex items-center justify-between flex-wrap bg-primary dark:bg-gray-700 fixed w-full px-6 pt-4 pb-2 shadow-md z-30"
  >
    <div class="flex items-center w-full pb-2 justify-between text-white h-12">
      <!-- <router-link to="/tasks" v-if="isSettings"
                  :class="['bg-transparent text-white hover:text-gray-100 hover:bg-hover dark:hover:bg-gray-800 rounded-full w-10 h-10 p-2 mr-2', isSettings? 'block sm:hidden md:hidden lg:hidden' : '']"><i
                      class="material-icons">arrow_back</i></router-link> -->
      <span :class="['font-semibold text-xl tracking-tight']">DoToo</span>
      <!-- <span class="w-full font-semibold text-xl text-white text-left block sm:hidden md:hidden lg:hidden">{{ isSettings ? "Settings" : ((userStore.displayName ? `${userStore.displayName}'s ` : "Your ") + `tasks ( ${taskSortered.length} )` ) }}</span> -->
      <button
        @click="onMenuClick"
        v-if="!isSettings"
        :class="[
          'bg-transparent text-white hover:text-gray-100 hover:bg-hover dark:hover:bg-gray-800 rounded-full w-10 h-10 p-2'
        ]"
      >
        <i class="material-icons"> more_vert </i>
      </button>
      <button
        @click="onLogoutClick"
        :class="[
          isSettings ? 'sm:block md:block lg:block' : '',
          'hidden w-20 h-10 bg-white text-primary dark:text-white hover:bg-gray-200 hover:text-hover dark:bg-gray-800 dark:hover:bg-gray-600 rounded-md'
        ]"
      >
        Log out
      </button>
    </div>

    <div
      :class="[
        'bg-white dark:bg-gray-800 dark:shadow-gray-600 w-28 block fixed right-6 top-16 shadow-md p-2 rounded-md z-50'
      ]"
      v-show="isOpen"
    >
      <div class="w-full">
        <button
          @click="onSorybyClick"
          class="w-full px-4 text-left h-10 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md block sm:hidden md:hidden lg:hidden"
        >
          Sort by
        </button>
        <button
          @click="onSettingsClick"
          class="w-full px-4 text-left h-10 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
        >
          Settings
        </button>
        <button
          @click="onLogoutClick"
          class="w-full px-4 text-left h-10 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
        >
          Log out
        </button>
      </div>
    </div>
  </nav>
  <div class="block sm:hidden">
    <div
      class="w-screen h-screen fixed bg-gray-500 bg-opacity-75 top-0 left-0 z-50"
      v-if="isSubOpen"
    >
      <div class="w-screen h-min p-6 fixed bottom-0 bg-white dark:bg-gray-700 rounded-t-md">
        <div v-for="option in options" :key="option.value">
          <label
            :class="[
              'cursor-pointer flex justify-between mx-auto p-2 rounded-md dark:hover:bg-gray-600 hover:bg-gray-100',
              selectedSort === option.value ? 'dark:bg-gray-800 bg-gray-200' : ''
            ]"
          >
            <span class="">{{ option.label }}</span>
            <input
              type="radio"
              name="sortingOption"
              class="radio"
              :value="option.value"
              v-model="selectedSort"
              @change="applySorting"
            />
          </label>
        </div>
        <button
          @click="closeMenu"
          class="w-full h-14 my-4 bg-primary dark:bg-gray-600 hover:bg-hover dark:hover:bg-gray-800 text-white hover:text-white rounded-lg text-center font-semibold text-xl p-3 hover:shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  <div v-if="isOpen" class="w-full h-dvh fixed left-0 z-20" @click="closeMenu" />
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { SORT_OPTIONS } from '@/stores/tasksStore'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const isOpen = ref(false)
const isSubOpen = ref(false)
const userStore = useUserStore()

const router = useRouter()
const options = SORT_OPTIONS

const selectedSort = ref(userStore.sortingPreference)
const isSettings = computed(() => router.currentRoute.value.path.includes('settings'))

const closeMenu = () => {
  isOpen.value = false
  isSubOpen.value = false
}

const applySorting = () => {
  userStore.updateUserSortingPreference(selectedSort.value)
  isOpen.value = false
}

const onSorybyClick = () => {
  isSubOpen.value = !isSubOpen.value
  isOpen.value = false
}

const onSettingsClick = () => {
  router.push('/settings')
  isOpen.value = false
}
const onLogoutClick = async () => {
  await userStore.signOut()
  isOpen.value = false
  router.push('/login')
}

const onMenuClick = () => {
  isOpen.value = !isOpen.value
}
</script>